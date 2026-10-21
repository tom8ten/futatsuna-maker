import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { generateDiagnosis, DiagnosisMode, Rarity, Gender } from "@/lib/dictionary";
import { ARCHETYPE_META, getArchetypeMeta, getBikkurimanArchetype } from "@/lib/bikkuriman";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@700;900&text=${encodeURIComponent(
      text.slice(0, 300)
    )}`;
    const css = await (
      await fetch(url, {
        headers: {
          // TrueType / OpenType (woff/ttf) を取得するためのUser-Agent指定
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
        signal: AbortSignal.timeout(4000),
      })
    ).text();

    const resource = css.match(/src: url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\) format\('(opentype|truetype)'\)/);
    if (resource && resource[1]) {
      const response = await fetch(resource[1], {
        signal: AbortSignal.timeout(4000),
      });
      if (response.status === 200) {
        return await response.arrayBuffer();
      }
    }
  } catch {
    // フォント取得失敗時はフォールバック
  }
  return null;
}

function getRarityStyles(rarity: Rarity) {
  switch (rarity) {
    case "UR":
      return {
        borderColor: "#f59e0b",
        outerGlow: "rgba(236, 72, 153, 0.45)",
        badgeBg: "linear-gradient(135deg, #ec4899 0%, #f59e0b 50%, #06b6d4 100%)",
        badgeText: "#ffffff",
        accentColor: "#fde68a",
        subText: "神話級 UR (0.5%)",
      };
    case "SSR":
      return {
        borderColor: "#fbbf24",
        outerGlow: "rgba(251, 191, 36, 0.4)",
        badgeBg: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)",
        badgeText: "#1c1917",
        accentColor: "#fcd34d",
        subText: "伝説級 SSR (4.5%)",
      };
    case "SR":
      return {
        borderColor: "#c084fc",
        outerGlow: "rgba(192, 132, 252, 0.3)",
        badgeBg: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
        badgeText: "#ffffff",
        accentColor: "#e9d5ff",
        subText: "英雄級 SR",
      };
    case "R":
      return {
        borderColor: "#38bdf8",
        outerGlow: "rgba(56, 189, 248, 0.25)",
        badgeBg: "linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)",
        badgeText: "#ffffff",
        accentColor: "#bae6fd",
        subText: "熟練級 R",
      };
    case "N":
    default:
      return {
        borderColor: "#d97706",
        outerGlow: "rgba(217, 119, 6, 0.2)",
        badgeBg: "linear-gradient(135deg, #78716c 0%, #44403c 100%)",
        badgeText: "#f5f5f4",
        accentColor: "#fde68a",
        subText: "一般級 N",
      };
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawName = searchParams.get("name") || "";
  const modeParam = searchParams.get("mode");
  const dateParam = searchParams.get("date") || undefined;
  const genderParam = searchParams.get("gender");
  const gender: Gender = genderParam === "female" ? "female" : "male";
  const mode: DiagnosisMode = modeParam === "daily" ? "daily" : "standard";

  const isDefault = !rawName.trim();
  const defaultName = gender === "female" ? "伝説の戦乙女" : "伝説の勇者";
  const result = generateDiagnosis(isDefault ? defaultName : rawName, mode, dateParam, gender);
  const rarityStyle = getRarityStyles(result.rarity);
  const archetype = getBikkurimanArchetype(result.suffix, result.isGap, result.seed);
  const archetypeMeta = getArchetypeMeta(archetype, result.gender);
  const stickerImgUrl = new URL(archetypeMeta.imageSrc, req.url).toString();

  // 描画する全文字列を集めてGoogle Fontsからサブセットを取得
  const textToLoad = Array.from(
    new Set(
      (
        `◆★二つ名メーカー異名診断魔導書ステータス画面鑑定結果称号属性由来：${result.name}さんの異名は『${result.fullTitle}』` +
        `推定戦闘力${result.combatPowerFormatted}固有スキル${result.skill.name}${result.skill.description}` +
        `${result.flavorText}${result.attribute}${rarityStyle.subText}激レア出現！今日の運勢モード通常モード#二つ名メーカー`
      ).split("")
    )
  ).join("");

  const fontData = await loadGoogleFont("Noto+Serif+JP", textToLoad);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090807",
          backgroundImage:
            "radial-gradient(circle at 50% 25%, #271d0e 0%, #0c0a08 65%, #050404 100%)",
          padding: "34px",
          fontFamily: fontData ? '"Noto Serif JP", serif' : "sans-serif",
          color: "#fef3c7",
          position: "relative",
        }}
      >
        {/* 外枠の重厚な魔導書フレーム */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: `3px solid ${rarityStyle.borderColor}`,
            borderRadius: "18px",
            padding: "26px 38px",
            backgroundColor: "rgba(12, 10, 9, 0.85)",
            boxShadow: `0 0 50px ${rarityStyle.outerGlow}`,
            position: "relative",
          }}
        >
          {/* ヘッダー行：アプリ名 ＆ レアリティバッジ */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderBottom: "1px solid rgba(217, 119, 6, 0.4)",
              paddingBottom: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  display: "flex",
                  padding: "6px 16px",
                  backgroundColor: "rgba(217, 119, 6, 0.2)",
                  border: "1px solid #d97706",
                  borderRadius: "999px",
                  fontSize: "20px",
                  color: "#fbbf24",
                  fontWeight: 700,
                }}
              >
                ◆ 二つ名メーカー ◆
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: "#e7e5e4",
                  fontWeight: 700,
                }}
              >
                {isDefault
                  ? "名前を入力して秘められし異名を覚醒せよ"
                  : `${result.name} さんの鑑定結果`}
              </div>
              {mode === "daily" && (
                <div
                  style={{
                    display: "flex",
                    padding: "4px 12px",
                    backgroundColor: "rgba(168, 85, 247, 0.25)",
                    border: "1px solid #c084fc",
                    borderRadius: "8px",
                    fontSize: "18px",
                    color: "#e9d5ff",
                  }}
                >
                  今日の運勢モード
                </div>
              )}
            </div>

            {/* レアリティ＆激レアバッジ */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {(result.rarity === "UR" || result.rarity === "SSR") && (
                <div
                  style={{
                    display: "flex",
                    padding: "6px 16px",
                    background: "linear-gradient(90deg, #dc2626, #d97706)",
                    borderRadius: "999px",
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#ffffff",
                    border: "1px solid #fde047",
                  }}
                >
                  ★ 激レア出現！
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 24px",
                  background: rarityStyle.badgeBg,
                  color: rarityStyle.badgeText,
                  borderRadius: "10px",
                  fontSize: "28px",
                  fontWeight: 900,
                  border: "2px solid #fef08a",
                }}
              >
                RARITY : {result.rarity}
              </div>
            </div>
          </div>

          {/* メイン：ビックリマン風キラシール ＋ 生成された二つ名 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "28px",
              padding: "14px 28px",
              margin: "6px 0",
              backgroundColor: "rgba(28, 25, 23, 0.78)",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              borderRadius: "14px",
            }}
          >
            {/* 左：ビックリマン風キラシール画像 */}
            <div
              style={{
                display: "flex",
                width: "162px",
                height: "162px",
                padding: "5px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.8)",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stickerImgUrl}
                alt={result.suffix}
                width={152}
                height={152}
                style={{
                  width: "152px",
                  height: "152px",
                  borderRadius: "10px",
                  border: "2px solid #090807",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* 右：前半修飾語＋後半二つ名の2段構成 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#a8a29e",
                  marginBottom: "4px",
                  letterSpacing: "0.12em",
                }}
              >
                ― 覚醒せし魂の称号 ―
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "#fde68a",
                  marginBottom: "2px",
                }}
              >
                {result.prefix}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: result.suffix.length > 12 ? "44px" : "52px",
                  fontWeight: 900,
                  color: rarityStyle.accentColor,
                  textAlign: "center",
                  lineHeight: 1.18,
                  textShadow: "0 4px 24px rgba(245, 158, 11, 0.45)",
                }}
              >
                『{result.suffix}』
              </div>
            </div>
          </div>

          {/* ステータス＆固有スキル2カラム */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              width: "100%",
            }}
          >
            {/* 左：推定戦闘力＆属性 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "38%",
                backgroundColor: "rgba(24, 20, 16, 0.9)",
                border: "1px solid rgba(217, 119, 6, 0.45)",
                borderRadius: "12px",
                padding: "16px 24px",
              }}
            >
              <div style={{ display: "flex", fontSize: "18px", color: "#a8a29e" }}>
                推定戦闘力 (COMBAT POWER)
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "44px",
                  fontWeight: 900,
                  color: "#fbbf24",
                  marginTop: "2px",
                }}
              >
                {result.combatPowerFormatted}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#d6d3d1",
                  marginTop: "6px",
                }}
              >
                属性：{result.attribute}
              </div>
            </div>

            {/* 右：固有スキル */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "62%",
                backgroundColor: "rgba(24, 20, 16, 0.9)",
                border: "1px solid rgba(217, 119, 6, 0.45)",
                borderRadius: "12px",
                padding: "16px 24px",
              }}
            >
              <div style={{ display: "flex", fontSize: "18px", color: "#a8a29e" }}>
                固有スキル (UNIQUE SKILL)
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  fontWeight: 900,
                  color: "#fde68a",
                  marginTop: "4px",
                }}
              >
                【{result.skill.name}】
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "19px",
                  color: "#e7e5e4",
                  marginTop: "6px",
                }}
              >
                {result.skill.description}
              </div>
            </div>
          </div>

          {/* フッター：由来フレーバーテキスト */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(217, 119, 6, 0.35)",
              paddingTop: "14px",
              fontSize: "18px",
              color: "#d6d3d1",
            }}
          >
            <div style={{ display: "flex" }}>◆ 由来：{result.flavorText}</div>
            <div
              style={{
                display: "flex",
                color: "#fbbf24",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              #二つ名メーカー
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
      fonts: fontData
        ? [
            {
              name: "Noto Serif JP",
              data: fontData,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    }
  );
}
