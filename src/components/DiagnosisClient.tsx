"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Sparkles,
  Swords,
  ShieldAlert,
  Share2,
  Download,
  Copy,
  Check,
  Calendar,
  Flame,
  Crown,
  BookOpen,
  RefreshCw,
  Wand2,
  Zap,
  HelpCircle,
} from "lucide-react";
import {
  generateDiagnosis,
  DiagnosisMode,
  DiagnosisResult,
  RARITY_META,
  buildXShareText,
  getTodayDateString,
  PREFIXES,
  COOL_SUFFIXES,
  GAP_SUFFIXES,
} from "@/lib/dictionary";
import BikkurimanSticker from "@/components/BikkurimanSticker";

interface DiagnosisClientProps {
  initialName: string;
  initialMode: DiagnosisMode;
  initialDate?: string;
  autoShowResult?: boolean;
}

export default function DiagnosisClient({
  initialName,
  initialMode,
  initialDate,
  autoShowResult = false,
}: DiagnosisClientProps) {
  const [inputName, setInputName] = useState(initialName);
  const [mode, setMode] = useState<DiagnosisMode>(initialMode);
  const [result, setResult] = useState<DiagnosisResult | null>(() =>
    autoShowResult && initialName.trim()
      ? generateDiagnosis(initialName, initialMode, initialDate)
      : null
  );
  const [isSummoning, setIsSummoning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showOgPreview, setShowOgPreview] = useState(false);
  const [showDictModal, setShowDictModal] = useState(false);
  const topAnchorRef = useRef<HTMLDivElement>(null);

  // スマホのソフトキーボード収納やDOM高さ変動時にも確実に最上部へ移動させる関数
  const scrollToTop = useCallback(() => {
    if (typeof window === "undefined") return;
    const executeScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      topAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    executeScroll();
    requestAnimationFrame(() => {
      executeScroll();
    });
    setTimeout(executeScroll, 100);
  }, []);

  // URLクエリパラメータを同期する関数
  const syncUrlParams = useCallback((targetName: string, targetMode: DiagnosisMode) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (targetName.trim()) {
      url.searchParams.set("name", targetName.trim());
      if (targetMode === "daily") {
        url.searchParams.set("mode", "daily");
        url.searchParams.set("date", getTodayDateString());
      } else {
        url.searchParams.delete("mode");
        url.searchParams.delete("date");
      }
    } else {
      url.searchParams.delete("name");
      url.searchParams.delete("mode");
      url.searchParams.delete("date");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  // 診断実行（ガチャ演出つき）
  const handleDiagnose = (
    customName?: string,
    customMode?: DiagnosisMode,
    skipAnimation = false
  ) => {
    const targetName = (customName !== undefined ? customName : inputName).trim();
    const targetMode = customMode !== undefined ? customMode : mode;

    if (!targetName) return;

    // スマホで入力欄にフォーカスが残っているとスクロールが入力欄に引き戻されるのを防ぐ
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (skipAnimation) {
      const diag = generateDiagnosis(targetName, targetMode);
      setResult(diag);
      syncUrlParams(targetName, targetMode);
      scrollToTop();
      return;
    }

    setIsSummoning(true);
    scrollToTop();

    setTimeout(() => {
      const diag = generateDiagnosis(targetName, targetMode);
      setResult(diag);
      setIsSummoning(false);
      syncUrlParams(targetName, targetMode);
      scrollToTop();
    }, 650);
  };

  // モード切り替え時
  const handleModeToggle = (newMode: DiagnosisMode) => {
    setMode(newMode);
    if (result && inputName.trim()) {
      handleDiagnose(inputName, newMode, false);
    }
  };

  // 共有用URLの生成
  const getShareUrl = () => {
    if (typeof window === "undefined" || !result) return "";
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const params = new URLSearchParams();
    params.set("name", result.name);
    if (result.mode === "daily") {
      params.set("mode", "daily");
      if (result.dateStr) params.set("date", result.dateStr);
    }
    return `${baseUrl}?${params.toString()}`;
  };

  // OGP画像エンドポイントURLの取得
  const getOgImageUrl = () => {
    if (!result) return "/api/og";
    const params = new URLSearchParams();
    params.set("name", result.name);
    if (result.mode === "daily") {
      params.set("mode", "daily");
      if (result.dateStr) params.set("date", result.dateStr);
    }
    return `/api/og?${params.toString()}`;
  };

  // ワンタップXシェア
  const handleShareX = () => {
    if (!result) return;
    const shareUrl = getShareUrl();
    const text = buildXShareText(result);
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${text}\n${shareUrl}`
    )}`;
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  // テキスト＋URLをクリップボードにコピー
  const handleCopyShareText = async () => {
    if (!result) return;
    const shareUrl = getShareUrl();
    const fullText = `${buildXShareText(result)}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  // OGP結果カード画像のワンタップダウンロード
  const handleDownloadImage = async () => {
    if (!result || isDownloading) return;
    setIsDownloading(true);
    try {
      const response = await fetch(getOgImageUrl());
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `futatsuna-${result.name}-${result.rarity}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // エラー時はプレビュー表示を開いて長押し保存を案内
      setShowOgPreview(true);
    } finally {
      setIsDownloading(false);
    }
  };

  // 決定論的ハッシュからURやギャップを即座に体験できるサンプル名を算出
  const [samplePresets, setSamplePresets] = useState<
    { label: string; name: string; badge: string }[]
  >([]);

  useEffect(() => {
    // クライアントマウント時に各レアリティ（N・R・ギャップ・SSR・UR）が出るサンプル名を探索してボタン化
    let nName = "山田太郎";
    let rName = "鈴木一郎";
    let urName = "佐藤健太";
    let ssrName = "高橋美咲";
    let gapName = "田中太郎";

    for (let i = 1; i <= 1500; i++) {
      const candidate = `冒険者#${i}`;
      const d = generateDiagnosis(candidate, "standard");
      if (d.rarity === "N" && !d.isGap && nName === "山田太郎") {
        nName = candidate;
      }
      if (d.rarity === "R" && !d.isGap && rName === "鈴木一郎") {
        rName = candidate;
      }
      if (d.rarity === "UR" && urName === "佐藤健太") {
        urName = candidate;
      }
      if (d.rarity === "SSR" && !d.isGap && ssrName === "高橋美咲") {
        ssrName = candidate;
      }
      if (d.isGap && (d.rarity === "SR" || d.rarity === "SSR") && gapName === "田中太郎") {
        gapName = candidate;
      }
      if (
        nName !== "山田太郎" &&
        rName !== "鈴木一郎" &&
        urName !== "佐藤健太" &&
        ssrName !== "高橋美咲" &&
        gapName !== "田中太郎"
      ) {
        break;
      }
    }

    setSamplePresets([
      { label: "Nサンプル", name: nName, badge: "N (紙シール)" },
      { label: "Rサンプル", name: rName, badge: "R (扇キラ)" },
      { label: "シュール15%枠", name: gapName, badge: "ギャップ" },
      { label: "SSRサンプル", name: ssrName, badge: "SSR (金キラ)" },
      { label: "UR神話級", name: urName, badge: "UR (虹キラ)" },
    ]);
  }, []);

  const rarityInfo = result ? RARITY_META[result.rarity] : null;

  return (
    <div
      ref={topAnchorRef}
      className="relative min-h-screen flex flex-col items-center justify-between px-4 py-8 md:py-12 selection:bg-amber-500/30 selection:text-amber-200 [overflow-anchor:none]"
    >
      {/* 背景の魔導オーラ＆幾何学装飾 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[380px] rounded-full bg-purple-900/10 blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[360px] h-[360px] rounded-full bg-red-900/10 blur-[120px]" />
      </div>

      {/* メインコンテナ */}
      <main className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center [overflow-anchor:none]">
        {/* ガチャ召喚ローディング演出（一番上に表示） */}
        {isSummoning && (
          <div className="w-full py-20 flex flex-col items-center justify-center bg-stone-950/80 border border-amber-500/30 rounded-3xl mb-10">
            <div className="relative w-24 h-24 flex items-center justify-center mb-5">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400 animate-spin" />
              <div className="absolute inset-2 rounded-full border border-purple-400/60 animate-ping" />
              <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
            </div>
            <p className="text-amber-200 font-bold text-lg tracking-widest animate-pulse">
              アカシックレコードから二つ名を召喚中...
            </p>
            <p className="text-stone-500 text-xs mt-1">
              HASH SEED: 0x{generateDiagnosis(inputName || "勇者", mode).seed.toString(16).toUpperCase()}
            </p>
          </div>
        )}

        {/* 診断結果カード（生成されたら一番上に表示） */}
        {!isSummoning && result && rarityInfo && (
          <div className="w-full space-y-6 mb-10 animate-in fade-in duration-500">
            {/* UR / SSR 出現時の特別バナー */}
            {rarityInfo.isUltraRare && (
              <div
                className={`w-full py-2.5 px-4 rounded-xl text-center font-black tracking-widest text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg ${
                  result.rarity === "UR"
                    ? "bg-gradient-to-r from-fuchsia-600 via-amber-500 to-cyan-500 text-white animate-pulse"
                    : "bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 text-stone-950"
                }`}
              >
                <Flame className="w-5 h-5 shrink-0" />
                <span>
                  ★ 激レア出現！ 排出率 {rarityInfo.probability} の【{rarityInfo.nameJa}】を引き当てました！ ★
                </span>
                <Flame className="w-5 h-5 shrink-0" />
              </div>
            )}

            {/* 外枠（UR虹色 / SSR金色 / SR紫銀 / R蒼金 / N地味な石枠） */}
            <div
              className={`p-[3px] rounded-3xl transition-all ${
                result.rarity === "UR"
                  ? "ur-rainbow-card"
                  : result.rarity === "SSR"
                  ? "ssr-gold-card"
                  : result.rarity === "SR"
                  ? "bg-gradient-to-b from-purple-400/85 via-indigo-500/55 to-amber-500/75 shadow-[0_0_45px_rgba(168,85,247,0.3)]"
                  : result.rarity === "R"
                  ? "bg-gradient-to-b from-sky-400/75 via-amber-500/50 to-sky-700/75 shadow-[0_0_35px_rgba(56,189,248,0.22)]"
                  : "bg-stone-700/70 shadow-none"
              }`}
            >
              {/* カード本体（スクショ映え特化エリア） */}
              <article
                id="diagnosis-card"
                className="relative overflow-hidden rounded-[21px] bg-[#0a0806] px-5 py-7 sm:px-9 sm:py-9 text-stone-100"
              >
                {/* 背景の魔法陣ウォーターマーク */}
                <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 opacity-[0.06] magic-circle-spin">
                  <svg viewBox="0 0 200 200" className="w-full h-full stroke-amber-400 fill-none">
                    <circle cx="100" cy="100" r="90" strokeWidth="2" />
                    <circle cx="100" cy="100" r="75" strokeWidth="1" strokeDasharray="4 4" />
                    <polygon points="100,15 173,145 27,145" strokeWidth="1.5" />
                    <polygon points="100,185 173,55 27,55" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="40" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* 四隅の魔導書オーナメント */}
                <div className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400/70" />
                <div className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400/70" />
                <div className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400/70" />
                <div className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400/70" />

                {/* カード上部：対象者名 ＆ レアリティ勲章 */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-500/25">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-400/80 tracking-widest uppercase">
                      <span>GRIMOIRE STATUS ARCHIVE</span>
                      <span>•</span>
                      <span>SEED #{result.seed.toString(16).toUpperCase().slice(0, 6)}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-stone-200 mt-1 flex flex-wrap items-center gap-2">
                      <span>{result.name} さんの異名</span>
                      {result.mode === "daily" && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950/90 border border-purple-400/50 text-purple-200">
                          今日の運勢 ({result.dateStr})
                        </span>
                      )}
                      {result.isGap ? (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-950/90 border border-rose-400/50 text-rose-200">
                          ⚡ シュール・ギャップ枠 (15%)
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300">
                          ✦ 王道覚醒枠 (85%)
                        </span>
                      )}
                    </h2>
                  </div>

                  {/* レアリティバッジ */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`relative overflow-hidden ${
                        result.rarity === "N" ? "border-stone-500/50" : "shimmer-effect border-amber-200/60"
                      } px-4 py-1.5 rounded-xl bg-gradient-to-r ${rarityInfo.badgeBg} text-white font-black tracking-wider shadow-lg border`}
                    >
                      <span className="text-xs opacity-90 mr-1.5">RARITY</span>
                      <span className="text-xl sm:text-2xl">{result.rarity}</span>
                    </div>
                  </div>
                </div>

                {/* カード中央：ビックリマン風キラシール ＆ 生成された二つ名（メインビジュアル） */}
                <div className="my-6 py-6 px-4 sm:px-6 rounded-2xl bg-gradient-to-b from-stone-900/90 via-[#120e0a] to-stone-950/90 border border-amber-500/35 text-center relative shadow-inner space-y-5">
                  <div className="flex justify-center">
                    <BikkurimanSticker result={result} />
                  </div>

                  <div className="pt-4 border-t border-amber-500/20 overflow-hidden">
                    <p className="text-xs sm:text-sm text-amber-400/80 tracking-[0.25em] mb-2">
                      ― 覚醒せし魂の二つ名 ―
                    </p>

                    <div className="max-w-xl mx-auto p-3.5 sm:p-5 rounded-xl border border-amber-500/40 bg-stone-950/80 shadow-lg font-black tracking-tight leading-snug break-words">
                      {/* 1段目：冠修飾語 */}
                      <div className="pb-1.5 mb-2 border-b border-amber-500/20">
                        <span
                          className={`block font-bold break-words ${
                            result.prefix.length >= 15
                              ? "text-sm sm:text-xl md:text-2xl"
                              : "text-base sm:text-2xl md:text-3xl"
                          } ${
                            result.rarity === "N" ? "text-stone-400" : "text-amber-200/90"
                          }`}
                        >
                          {result.prefix}
                        </span>
                      </div>

                      {/* 2段目：メイン二つ名 */}
                      <div>
                        <span
                          className={`inline-block max-w-full break-words bg-clip-text text-transparent bg-gradient-to-r ${
                            result.suffix.length >= 18
                              ? "text-base sm:text-2xl md:text-3xl"
                              : result.suffix.length >= 14
                              ? "text-lg sm:text-3xl md:text-4xl"
                              : result.suffix.length >= 10
                              ? "text-xl sm:text-3xl md:text-4xl"
                              : "text-2xl sm:text-4xl md:text-5xl"
                          } ${
                            result.rarity === "UR"
                              ? "from-fuchsia-300 via-amber-200 to-cyan-300 drop-shadow-[0_2px_18px_rgba(251,191,36,0.35)]"
                              : result.rarity === "N"
                              ? "from-stone-200 via-stone-300 to-stone-400"
                              : result.isGap
                              ? "from-amber-200 via-yellow-300 to-rose-300 drop-shadow-[0_2px_18px_rgba(251,191,36,0.35)]"
                              : "from-amber-100 via-yellow-300 to-amber-500 drop-shadow-[0_2px_18px_rgba(251,191,36,0.35)]"
                          }`}
                        >
                          『{result.suffix}』
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* サブパラメーター2カラム：推定戦闘力 ＆ 固有スキル */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                  {/* 推定戦闘力ボックス */}
                  <div className="md:col-span-5 bg-stone-950/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="flex items-center gap-1.5 font-bold text-amber-400/90">
                        <Swords className="w-4 h-4" />
                        推定戦闘力
                      </span>
                      <span className="font-mono text-[11px] text-stone-500">COMBAT POWER</span>
                    </div>

                    <div className="my-2 text-3xl sm:text-4xl font-black text-amber-300 tracking-tight font-mono">
                      {result.combatPowerFormatted}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-800 text-stone-300">
                      <span>属性：{result.attribute}</span>
                      {result.combatPower < 100 && (
                        <span className="text-rose-400 font-bold">※一般市民レベル</span>
                      )}
                      {result.combatPower >= 530000 && (
                        <span className="text-amber-400 font-bold">※星を破壊可能</span>
                      )}
                    </div>
                  </div>

                  {/* 固有スキルボックス */}
                  <div className="md:col-span-7 bg-stone-950/90 border border-amber-500/30 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="flex items-center gap-1.5 font-bold text-amber-400/90">
                        <Zap className="w-4 h-4" />
                        固有スキル (UNIQUE SKILL)
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        常時発動
                      </span>
                    </div>

                    <div className="my-1.5 text-lg sm:text-xl font-black text-amber-100">
                      【{result.skill.name}】
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {result.skill.description}
                    </p>
                  </div>
                </div>

                {/* RPG風 5段階ステータスバー */}
                <div className="bg-stone-950/75 border border-amber-500/20 rounded-xl p-4 mb-5">
                  <div className="text-xs text-amber-400/80 font-bold mb-3 flex items-center justify-between">
                    <span>◆ 魔導ステータス詳細 (RPG PARAMETERS)</span>
                    <span className="text-stone-400 font-normal">{rarityInfo.nameJa}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { label: "魔力 (MAG)", val: result.stats.mag, color: "from-purple-500 to-indigo-400" },
                      { label: "覇気 (CHUUNI)", val: result.stats.chuuni, color: "from-amber-500 to-yellow-300" },
                      { label: "豪運 (LUCK)", val: result.stats.luck, color: "from-emerald-500 to-teal-300" },
                      { label: "俊敏 (SPD)", val: result.stats.agility, color: "from-sky-500 to-cyan-300" },
                      { label: "生存力 (VIT)", val: result.stats.vitality, color: "from-rose-500 to-orange-400" },
                    ].map((st) => (
                      <div key={st.label} className="bg-stone-900/90 p-2.5 rounded-lg border border-stone-800">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-stone-400">{st.label}</span>
                          <span className="font-mono font-bold text-amber-200">{st.val}</span>
                        </div>
                        <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${st.color} rounded-full transition-all duration-700`}
                            style={{ width: `${st.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 二つ名の由来（1行フレーバーテキスト） */}
                <div className="bg-gradient-to-r from-amber-950/35 via-stone-900/70 to-amber-950/35 border-l-4 border-amber-500 rounded-r-xl p-3.5 sm:p-4 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-amber-400/80 font-bold tracking-wider">
                      二つ名の由来・古文書記録
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 mt-0.5 leading-relaxed">
                      {result.flavorText}
                    </p>
                  </div>
                </div>

                {/* カードフッター（スクショ時にも映えるクレジット） */}
                <div className="mt-5 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-stone-500">
                  <span>✦ 二つ名メーカー | RPG STATUS GENERATOR</span>
                  <span className="text-amber-400/80 font-bold">#二つ名メーカー #異名診断</span>
                </div>
              </article>
            </div>

            {/* シェア＆画像保存アクションエリア */}
            <section className="bg-stone-900/90 border border-amber-500/35 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-amber-300 font-bold">
                  ＼ X（旧Twitter）でシェアすると結果入りの動的OGPカードが自動展開されます ／
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* ワンタップXシェアボタン */}
                <button
                  type="button"
                  onClick={handleShareX}
                  className="w-full py-4 px-5 rounded-xl bg-white hover:bg-stone-200 text-stone-950 font-black text-base flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Share2 className="w-5 h-5" />
                  <span>X（Twitter）で結果をシェア</span>
                </button>

                {/* ワンタップ結果画像ダウンロードボタン */}
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-base flex items-center justify-center gap-2.5 shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>
                    {isDownloading ? "画像を生成中..." : "結果カード画像を保存 (PNG)"}
                  </span>
                </button>
              </div>

              {/* サブアクション：テキストコピー ＆ OGP画像プレビュー長押し保存トグル */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCopyShareText}
                  className="px-4 py-2 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">
                        投稿文とURLをコピーしました！
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>投稿文＆結果URLをコピー</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowOgPreview((prev) => !prev)}
                  className="px-4 py-2 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>
                    {showOgPreview
                      ? "動的OGPカード画像を隠す"
                      : "スマホ長押し保存用OGPカードを表示"}
                  </span>
                </button>
              </div>

              {/* 動的OGP (`/api/og`) の実画像プレビュー（スマホ長押し保存対応） */}
              {showOgPreview && (
                <div className="pt-3 border-t border-stone-800 text-center space-y-2">
                  <p className="text-xs text-stone-400">
                    ▼ スマホの方は下の画像を長押しして「写真に保存」もできます（Xシェア時に表示される動的OGP画像）
                  </p>
                  <div className="overflow-hidden rounded-xl border border-amber-500/40 bg-stone-950 max-w-xl mx-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getOgImageUrl()}
                      alt={`${result.name}さんの二つ名診断結果カード`}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ヘッダー・タイトルセクション */}
        <header className="text-center mb-8 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs md:text-sm tracking-widest mb-4 shadow-lg shadow-amber-950/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>古の魔導書が暴く、あなたの真の称号と戦闘力</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-wider bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(245,158,11,0.35)]">
            二つ名メーカー
          </h1>
          <p className="mt-3 text-stone-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            名前から決定論的ハッシュで唯一無二の異名を召喚。
            <span className="text-amber-300/90 font-semibold">王道中二病85% × 哀愁シュール15%</span>
            の禁断ガチャ診断！
          </p>
        </header>

        {/* 入力＆モード切替パネル（魔導書コンソール風） */}
        <section className="w-full bg-gradient-to-b from-stone-900/95 to-stone-950/95 border border-amber-600/40 rounded-2xl p-5 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.85)] backdrop-blur-md mb-8">
          {/* モード切り替えトグル */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 mb-5 border-b border-amber-500/20">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-300">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <span>鑑定アルゴリズム選択：</span>
            </div>

            <div className="grid grid-cols-2 bg-stone-950 p-1 rounded-xl border border-amber-500/30 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleModeToggle("standard")}
                className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === "standard"
                    ? "bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span>通常モード（名前固定）</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle("daily")}
                className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === "daily"
                    ? "bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md shadow-purple-500/25"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>今日の運勢モード（日替わり）</span>
              </button>
            </div>
          </div>

          {/* 名前入力フォーム */}
          <div className="mb-1.5 pl-1 flex items-center justify-between">
            <label
              htmlFor="name-input"
              className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ここに名前を入れてください</span>
            </label>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDiagnose();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                id="name-input"
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="名前やハンドルネームを入力（例：山田太郎 / @user）"
                maxLength={32}
                aria-label="診断する名前"
                className="w-full px-4 py-3.5 sm:py-4 rounded-xl bg-stone-950/90 border border-amber-500/40 text-stone-100 placeholder-stone-500 text-base sm:text-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 transition-all"
              />
              {inputName && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500">
                  {inputName.length}/32
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputName.trim() || isSummoning}
              className="px-7 py-3.5 sm:py-4 rounded-xl font-black text-base sm:text-lg bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-950 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Wand2 className={`w-5 h-5 ${isSummoning ? "animate-spin" : ""}`} />
              <span>{isSummoning ? "魔導書詠唱中..." : "異名を覚醒させる"}</span>
            </button>
          </form>

          {/* クイック体験サンプル＆確率表ボタン */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-stone-400 mr-1">一発体験：</span>
              {samplePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setInputName(preset.name);
                    setMode("standard");
                    handleDiagnose(preset.name, "standard", false);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-amber-950/60 border border-stone-700 hover:border-amber-500/50 text-stone-300 hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>{preset.label}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {preset.badge}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowDictModal(true)}
              className="text-xs text-amber-400/80 hover:text-amber-300 underline underline-offset-4 flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>排出確率・辞書データ({PREFIXES.length + COOL_SUFFIXES.length + GAP_SUFFIXES.length}種)を見る</span>
            </button>
          </div>
        </section>
      </main>

      {/* 辞書データ・レアリティ確率モーダル */}
      {showDictModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDictModal(false)}
        >
          <div
            className="bg-stone-950 border border-amber-500/50 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 text-stone-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span>魔導書ガチャ仕様・収録辞書データ</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowDictModal(false)}
                className="text-sm px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
              >
                閉じる
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-200">◆ レアリティ排出確率</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(["UR", "SSR", "SR", "R", "N"] as const).map((r) => (
                  <div
                    key={r}
                    className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-center"
                  >
                    <div className="font-black text-base text-amber-300">{r}</div>
                    <div className="text-xs text-stone-400">{RARITY_META[r].probability}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-200">
                ◆ 王道85% × シュール・ギャップ15% の黄金比
              </h4>
              <p className="text-stone-400 leading-relaxed">
                前半の修飾語（{PREFIXES.length}語）× 後半の属性名詞（王道{COOL_SUFFIXES.length}語 ＋ シュールギャップ{GAP_SUFFIXES.length}語）により、合計{" "}
                <strong className="text-amber-300">
                  {(PREFIXES.length * (COOL_SUFFIXES.length + GAP_SUFFIXES.length)).toLocaleString()}
                </strong>{" "}
                通りの二つ名が生成されます。
              </p>
              <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-800 space-y-2">
                <div className="text-amber-300 font-bold text-xs">
                  【15%で出現するシュール・ギャップワード例】
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {GAP_SUFFIXES.slice(0, 18).map((w) => (
                    <span
                      key={w}
                      className="text-[11px] px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-stone-300"
                    >
                      {w}
                    </span>
                  ))}
                  <span className="text-[11px] px-2 py-0.5 text-stone-500">
                    ...他 {GAP_SUFFIXES.length - 18} 語
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="relative z-10 mt-12 text-center text-xs text-stone-500">
        <p>二つ名メーカー — Deterministic Hash RPG Title & Dynamic OGP Generator</p>
      </footer>
    </div>
  );
}
