import { Rarity } from "./dictionary";

export type BikkurimanArchetype =
  | "paladin"
  | "demon_lord"
  | "archmage"
  | "reaper"
  | "dragoon"
  | "vampire"
  | "alchemist"
  | "observer"
  | "teiji_dash"
  | "futon_sage"
  | "cat_servant"
  | "hangaku_hunter"
  | "caffeine_addict"
  | "digital_cursed"
  | "ouch_sinner"
  | "broke_noble";

export interface ArchetypeMeta {
  id: BikkurimanArchetype;
  categoryLabel: string; // ヘッド / 天使 / 悪魔 / お守り / 珍聖
  archetypeName: string; // 系統名
  imageSrc: string; // ビックリマン風本格イラスト画像パス
  sealBadgeBg: string;
  sealBadgeText: string;
  titleColor: string;
  titleStroke: string;
}

/**
 * 後半の名詞（COOL_SUFFIXES 48種 + GAP_SUFFIXES 45種）から
 * ビックリマン風キャラ系統への決定論的マッピング
 */
export function getBikkurimanArchetype(
  suffix: string,
  isGap: boolean,
  seed: number
): BikkurimanArchetype {
  if (!isGap) {
    if (
      suffix.includes("聖騎士") ||
      suffix.includes("剣聖") ||
      suffix.includes("英雄") ||
      suffix.includes("騎士団長") ||
      suffix.includes("聖痕") ||
      suffix.includes("黄金律") ||
      suffix.includes("魔剣士")
    ) {
      return "paladin";
    }
    if (
      suffix.includes("魔王") ||
      suffix.includes("破壊神") ||
      suffix.includes("覇王") ||
      suffix.includes("皇子") ||
      suffix.includes("災厄") ||
      suffix.includes("煉獄")
    ) {
      return "demon_lord";
    }
    if (
      suffix.includes("魔導王") ||
      suffix.includes("大賢者") ||
      suffix.includes("星霊術師") ||
      suffix.includes("黒魔導師") ||
      suffix.includes("預言者") ||
      suffix.includes("契約主")
    ) {
      return "archmage";
    }
    if (
      suffix.includes("死神") ||
      suffix.includes("執行者") ||
      suffix.includes("影の君主") ||
      suffix.includes("死霊術師") ||
      suffix.includes("暗殺者") ||
      suffix.includes("契約者")
    ) {
      return "reaper";
    }
    if (
      suffix.includes("竜騎士") ||
      suffix.includes("神殺し") ||
      suffix.includes("狂戦士") ||
      suffix.includes("傭兵王") ||
      suffix.includes("銃士") ||
      suffix.includes("幻影騎士")
    ) {
      return "dragoon";
    }
    if (
      suffix.includes("堕天使") ||
      suffix.includes("吸血鬼") ||
      suffix.includes("奏者")
    ) {
      return "vampire";
    }
    if (
      suffix.includes("機関長") ||
      suffix.includes("機巧") ||
      suffix.includes("錬金術師") ||
      suffix.includes("操縦者")
    ) {
      return "alchemist";
    }
    return "observer";
  }

  // シュール・ギャップ系 (15%枠)
  if (
    suffix.includes("有給") ||
    suffix.includes("定時退社") ||
    suffix.includes("VLOOKUP") ||
    suffix.includes("エレベーター") ||
    suffix.includes("再配達") ||
    suffix.includes("ミュート")
  ) {
    return "teiji_dash";
  }
  if (
    suffix.includes("二度寝") ||
    suffix.includes("寝不足") ||
    suffix.includes("布団") ||
    suffix.includes("パジャマ") ||
    suffix.includes("アラーム") ||
    suffix.includes("月曜朝")
  ) {
    return "futon_sage";
  }
  if (suffix.includes("猫") || suffix.includes("推し")) {
    return "cat_servant";
  }
  if (
    suffix.includes("半額") ||
    suffix.includes("ラーメン") ||
    suffix.includes("ポテチ") ||
    suffix.includes("焼肉") ||
    suffix.includes("カップ麺") ||
    suffix.includes("ペヤング") ||
    suffix.includes("レジ袋")
  ) {
    return "hangaku_hunter";
  }
  if (
    suffix.includes("カフェイン") ||
    suffix.includes("ハイボール") ||
    suffix.includes("スイーツ") ||
    suffix.includes("サウナ")
  ) {
    return "caffeine_addict";
  }
  if (
    suffix.includes("充電") ||
    suffix.includes("Wi-Fi") ||
    suffix.includes("Password") ||
    suffix.includes("スマホを顔面") ||
    suffix.includes("USB") ||
    suffix.includes("リモコン") ||
    suffix.includes("イヤホン")
  ) {
    return "digital_cursed";
  }
  if (
    suffix.includes("ヘルニア") ||
    suffix.includes("改札") ||
    suffix.includes("シャンプー") ||
    suffix.includes("傘") ||
    suffix.includes("筋肉痛") ||
    suffix.includes("鍵") ||
    suffix.includes("低気圧") ||
    suffix.includes("洗濯物")
  ) {
    return "ouch_sinner";
  }
  if (
    suffix.includes("確定申告") ||
    suffix.includes("ポイントカード") ||
    suffix.includes("積読") ||
    suffix.includes("サブスク") ||
    suffix.includes("金欠")
  ) {
    return "broke_noble";
  }

  const gapFallbacks: BikkurimanArchetype[] = [
    "teiji_dash",
    "futon_sage",
    "caffeine_addict",
    "digital_cursed",
    "ouch_sinner",
  ];
  return gapFallbacks[seed % gapFallbacks.length];
}

export const ARCHETYPE_META: Record<BikkurimanArchetype, ArchetypeMeta> = {
  paladin: {
    id: "paladin",
    categoryLabel: "聖騎士ヘッド",
    archetypeName: "天界聖剣系",
    imageSrc: "/stickers/paladin.jpg",
    sealBadgeBg: "#dc2626",
    sealBadgeText: "#fef08a",
    titleColor: "#fde047",
    titleStroke: "#b91c1c",
  },
  demon_lord: {
    id: "demon_lord",
    categoryLabel: "魔界ヘッド",
    archetypeName: "暗黒覇王系",
    imageSrc: "/stickers/demon_lord.jpg",
    sealBadgeBg: "#581c87",
    sealBadgeText: "#f0abfc",
    titleColor: "#fde047",
    titleStroke: "#581c87",
  },
  archmage: {
    id: "archmage",
    categoryLabel: "魔導ヘッド",
    archetypeName: "大賢者・星詠み系",
    imageSrc: "/stickers/archmage.jpg",
    sealBadgeBg: "#1e3a8a",
    sealBadgeText: "#93c5fd",
    titleColor: "#fef08a",
    titleStroke: "#1d4ed8",
  },
  reaper: {
    id: "reaper",
    categoryLabel: "冥界悪魔",
    archetypeName: "死神・執行者系",
    imageSrc: "/stickers/reaper.jpg",
    sealBadgeBg: "#18181b",
    sealBadgeText: "#e879f9",
    titleColor: "#f0abfc",
    titleStroke: "#3b0764",
  },
  dragoon: {
    id: "dragoon",
    categoryLabel: "武神ヘッド",
    archetypeName: "竜騎士・狂戦士系",
    imageSrc: "/stickers/dragoon.jpg",
    sealBadgeBg: "#991b1b",
    sealBadgeText: "#fca5a5",
    titleColor: "#fde047",
    titleStroke: "#7f1d1d",
  },
  vampire: {
    id: "vampire",
    categoryLabel: "夜魔ヘッド",
    archetypeName: "堕天使・吸血鬼系",
    imageSrc: "/stickers/vampire.jpg",
    sealBadgeBg: "#881337",
    sealBadgeText: "#fda4af",
    titleColor: "#fecdd3",
    titleStroke: "#881337",
  },
  alchemist: {
    id: "alchemist",
    categoryLabel: "機巧お守り",
    archetypeName: "錬金術・機神系",
    imageSrc: "/stickers/alchemist.jpg",
    sealBadgeBg: "#065f46",
    sealBadgeText: "#6ee7b7",
    titleColor: "#fde047",
    titleStroke: "#065f46",
  },
  observer: {
    id: "observer",
    categoryLabel: "超聖神",
    archetypeName: "時空超越・観測者系",
    imageSrc: "/stickers/archmage.jpg",
    sealBadgeBg: "#0c4a6e",
    sealBadgeText: "#7dd3fc",
    titleColor: "#fef08a",
    titleStroke: "#0369a1",
  },
  teiji_dash: {
    id: "teiji_dash",
    categoryLabel: "社畜珍聖",
    archetypeName: "定時退社・有給神系",
    imageSrc: "/stickers/teiji_dash.jpg",
    sealBadgeBg: "#0284c7",
    sealBadgeText: "#fef08a",
    titleColor: "#fef08a",
    titleStroke: "#0369a1",
  },
  futon_sage: {
    id: "futon_sage",
    categoryLabel: "安眠お守り",
    archetypeName: "二度寝・お布団結界系",
    imageSrc: "/stickers/futon_sage.jpg",
    sealBadgeBg: "#4f46e5",
    sealBadgeText: "#e0e7ff",
    titleColor: "#fde047",
    titleStroke: "#3730a3",
  },
  cat_servant: {
    id: "cat_servant",
    categoryLabel: "尊いお守り",
    archetypeName: "猫の下僕・推し活系",
    imageSrc: "/stickers/futon_sage.jpg",
    sealBadgeBg: "#db2777",
    sealBadgeText: "#fce7f3",
    titleColor: "#fef08a",
    titleStroke: "#be185d",
  },
  hangaku_hunter: {
    id: "hangaku_hunter",
    categoryLabel: "爆食悪魔",
    archetypeName: "半額ハンター・深夜麺系",
    imageSrc: "/stickers/caffeine_addict.jpg",
    sealBadgeBg: "#dc2626",
    sealBadgeText: "#fef08a",
    titleColor: "#fde047",
    titleStroke: "#b91c1c",
  },
  caffeine_addict: {
    id: "caffeine_addict",
    categoryLabel: "覚醒お守り",
    archetypeName: "カフェイン・整い系",
    imageSrc: "/stickers/caffeine_addict.jpg",
    sealBadgeBg: "#d97706",
    sealBadgeText: "#fffbeb",
    titleColor: "#fef08a",
    titleStroke: "#92400e",
  },
  digital_cursed: {
    id: "digital_cursed",
    categoryLabel: "電波悪魔",
    archetypeName: "充電2%・通信受難系",
    imageSrc: "/stickers/digital_cursed.jpg",
    sealBadgeBg: "#0f766e",
    sealBadgeText: "#99f6e4",
    titleColor: "#5eead4",
    titleStroke: "#134e4a",
  },
  ouch_sinner: {
    id: "ouch_sinner",
    categoryLabel: "哀愁お守り",
    archetypeName: "腰痛・うっかり受難系",
    imageSrc: "/stickers/ouch_sinner.jpg",
    sealBadgeBg: "#7c2d12",
    sealBadgeText: "#fed7aa",
    titleColor: "#fde047",
    titleStroke: "#7c2d12",
  },
  broke_noble: {
    id: "broke_noble",
    categoryLabel: "金欠悪魔",
    archetypeName: "サブスク貴族・ギリギリ系",
    imageSrc: "/stickers/ouch_sinner.jpg",
    sealBadgeBg: "#713f12",
    sealBadgeText: "#fef08a",
    titleColor: "#fde047",
    titleStroke: "#713f12",
  },
};

/**
 * 属性に応じたビックリマン風オーラカラーパレット
 */
export function getAttributePalette(attribute: string): {
  primary: string;
  secondary: string;
  glow: string;
} {
  if (attribute.includes("紅蓮")) {
    return { primary: "#ef4444", secondary: "#f97316", glow: "rgba(239,68,68,0.6)" };
  }
  if (attribute.includes("蒼焔") || attribute.includes("絶対零度")) {
    return { primary: "#06b6d4", secondary: "#3b82f6", glow: "rgba(6,182,212,0.6)" };
  }
  if (attribute.includes("雷帝") || attribute.includes("黄金律")) {
    return { primary: "#facc15", secondary: "#f59e0b", glow: "rgba(250,204,21,0.65)" };
  }
  if (attribute.includes("聖痕") || attribute.includes("星光")) {
    return { primary: "#fde047", secondary: "#38bdf8", glow: "rgba(253,224,71,0.6)" };
  }
  if (attribute.includes("時空") || attribute.includes("幻影")) {
    return { primary: "#a855f7", secondary: "#ec4899", glow: "rgba(168,85,247,0.6)" };
  }
  return { primary: "#9333ea", secondary: "#ef4444", glow: "rgba(147,51,234,0.6)" };
}

/**
 * レアリティに応じたプリズム種別ラベル
 */
export function getPrismTypeLabel(rarity: Rarity): string {
  switch (rarity) {
    case "UR":
      return "虹色角プリズム（神話ヘッド仕様）";
    case "SSR":
      return "黄金角プリズム（金エンボスヘッド仕様）";
    case "SR":
      return "銀アルミ角プリズム（キラ仕様）";
    case "R":
      return "サンバースト扇プリズム（キラ仕様）";
    case "N":
    default:
      return "ノーマル紙シール仕様（非キラ）";
  }
}
