"use client";

import React, { useState } from "react";
import { RotateCw, Sparkles } from "lucide-react";
import { DiagnosisResult } from "@/lib/dictionary";
import {
  ARCHETYPE_META,
  BikkurimanArchetype,
  getAttributePalette,
  getBikkurimanArchetype,
  getPrismTypeLabel,
} from "@/lib/bikkuriman";

interface BikkurimanStickerProps {
  result: DiagnosisResult;
}

/**
 * 16系統の2頭身ビックリマン風デフォルメキャラSVG描画コンポーネント
 * 極太黒フチ・デフォルメ2頭身・ハイライト入りの大きな目・系統別武器/小道具をレイヤー描画
 */
function ChibiCharacterSvg({
  archetype,
  primaryColor,
  secondaryColor,
}: {
  archetype: BikkurimanArchetype;
  primaryColor: string;
  secondaryColor: string;
}) {
  const isEvilOrCool =
    archetype === "demon_lord" ||
    archetype === "reaper" ||
    archetype === "vampire" ||
    archetype === "dragoon";

  const isFunnyTired =
    archetype === "caffeine_addict" ||
    archetype === "digital_cursed" ||
    archetype === "ouch_sinner" ||
    archetype === "broke_noble";

  return (
    <svg
      viewBox="0 0 260 260"
      className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="auraGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor={primaryColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={secondaryColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#bae6fd" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* 背面属性オーラ＆集中線バースト */}
      <circle cx="130" cy="138" r="98" fill="url(#auraGrad)" />
      <g stroke="#ffffff" strokeWidth="2.5" opacity="0.65">
        <polygon
          points="130,18 142,58 180,28 156,68 205,52 168,85 222,88 174,106 226,128 174,136 218,168 166,158 196,202 150,174 162,222 130,182 98,222 110,174 64,202 94,158 42,168 86,136 34,128 86,106 38,88 92,85 55,52 104,68 80,28 118,58"
          fill={primaryColor}
          fillOpacity="0.28"
          stroke="#111111"
          strokeWidth="3"
        />
      </g>

      {/* キラキラ十字スパークル（ビックリマンシール特有の白星） */}
      {[
        { x: 42, y: 58, s: 1 },
        { x: 218, y: 54, s: 0.9 },
        { x: 34, y: 175, s: 0.8 },
        { x: 224, y: 172, s: 1 },
      ].map((sp, idx) => (
        <g key={idx} transform={`translate(${sp.x}, ${sp.y}) scale(${sp.s})`}>
          <path
            d="M0,-14 L3.5,-3.5 L14,0 L3.5,3.5 L0,14 L-3.5,3.5 L-14,0 L-3.5,-3.5 Z"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* ====== 背面マント・翼レイヤー ====== */}
      {(archetype === "demon_lord" || archetype === "vampire" || archetype === "dragoon") && (
        <g stroke="#111111" strokeWidth="4.5" strokeLinejoin="round">
          {/* コウモリ・ドラゴンの翼 */}
          <path
            d="M85,140 C40,105 18,125 22,165 C38,155 52,165 58,180 C68,168 80,172 88,182 Z"
            fill={archetype === "dragoon" ? "#dc2626" : "#3b0764"}
          />
          <path
            d="M175,140 C220,105 242,125 238,165 C222,155 208,165 202,180 C192,168 180,172 172,182 Z"
            fill={archetype === "dragoon" ? "#dc2626" : "#3b0764"}
          />
        </g>
      )}

      {(archetype === "paladin" ||
        archetype === "archmage" ||
        archetype === "broke_noble" ||
        archetype === "observer") && (
        <path
          d="M72,142 L45,216 L130,206 L215,216 L188,142 Z"
          fill={archetype === "paladin" ? "#dc2626" : archetype === "archmage" ? "#1d4ed8" : primaryColor}
          stroke="#111111"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
      )}

      {archetype === "futon_sage" && (
        /* 巨大お布団マント */
        <path
          d="M54,125 C42,165 48,218 68,224 L192,224 C212,218 218,165 206,125 Z"
          fill="#fb7185"
          stroke="#111111"
          strokeWidth="4.5"
        />
      )}

      {/* ====== 2頭身ちびボディ＆足 ====== */}
      <g stroke="#111111" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
        {/* 両足 */}
        <ellipse cx="106" cy="218" rx="18" ry="12" fill="#f59e0b" />
        <ellipse cx="154" cy="218" rx="18" ry="12" fill="#f59e0b" />

        {/* 胴体アーマー / スーツ / 衣装 */}
        <path
          d="M86,148 C80,175 82,204 92,212 L168,212 C178,204 180,175 174,148 Z"
          fill={
            archetype === "teiji_dash"
              ? "#1e293b"
              : archetype === "futon_sage"
              ? "#fef08a"
              : archetype === "paladin"
              ? "url(#goldGrad)"
              : archetype === "demon_lord"
              ? "#311042"
              : primaryColor
          }
        />

        {/* 胴体ディテール（ネクタイ・布団柄・胸アーマー） */}
        {archetype === "teiji_dash" ? (
          <>
            <polygon points="118,150 142,150 130,172" fill="#ffffff" strokeWidth="3" />
            <polygon points="130,160 145,192 130,204 122,190" fill="#ef4444" strokeWidth="3" />
          </>
        ) : archetype === "futon_sage" ? (
          <path
            d="M72,162 Q130,148 188,162 L194,214 L66,214 Z"
            fill="#f43f5e"
            stroke="#111111"
            strokeWidth="4"
          />
        ) : (
          <>
            {/* 王道ベルト＆胸エンブレム */}
            <rect x="86" y="184" width="88" height="14" rx="4" fill="url(#goldGrad)" />
            <circle cx="130" cy="191" r="7" fill="#ef4444" />
            <polygon points="130,154 146,168 130,180 114,168" fill="url(#goldGrad)" />
          </>
        )}
      </g>

      {/* ====== 2頭身の大きな頭部（ビックリマン比率） ====== */}
      <g stroke="#111111" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
        {/* 顔の輪郭 */}
        <ellipse
          cx="130"
          cy="112"
          rx="52"
          ry="44"
          fill={archetype === "reaper" ? "#f1f5f9" : "#fed7aa"}
        />

        {/* 耳 */}
        <ellipse cx="76" cy="116" rx="9" ry="12" fill="#fdba74" />
        <ellipse cx="184" cy="116" rx="9" ry="12" fill="#fdba74" />

        {/* ====== 目の描画（ビックリマン風の大きく力強い瞳） ====== */}
        {/* 左目 */}
        <ellipse cx="108" cy="114" rx="13" ry="15" fill="#ffffff" strokeWidth="3.5" />
        <ellipse
          cx="110"
          cy="115"
          rx="8"
          ry="10"
          fill={isEvilOrCool ? "#dc2626" : "#111111"}
          stroke="none"
        />
        <circle cx="106" cy="110" r="3.8" fill="#ffffff" stroke="none" />
        <circle cx="113" cy="119" r="2" fill="#ffffff" stroke="none" />

        {/* 右目 */}
        <ellipse cx="152" cy="114" rx="13" ry="15" fill="#ffffff" strokeWidth="3.5" />
        <ellipse
          cx="150"
          cy="115"
          rx="8"
          ry="10"
          fill={isEvilOrCool ? "#dc2626" : "#111111"}
          stroke="none"
        />
        <circle cx="146" cy="110" r="3.8" fill="#ffffff" stroke="none" />
        <circle cx="153" cy="119" r="2" fill="#ffffff" stroke="none" />

        {/* 目の下のクマ（カフェイン・デジタル・腰痛・金欠系） */}
        {isFunnyTired && (
          <g stroke="#475569" strokeWidth="3" fill="none">
            <path d="M96,131 Q108,136 120,131" />
            <path d="M140,131 Q152,136 164,131" />
          </g>
        )}

        {/* 極太眉毛（ビックリマン特有の凛々しい太眉） */}
        {isEvilOrCool ? (
          <>
            <path d="M90,94 L122,104" stroke="#111111" strokeWidth="6" />
            <path d="M170,94 L138,104" stroke="#111111" strokeWidth="6" />
          </>
        ) : (
          <>
            <path d="M92,98 Q108,90 122,99" stroke="#111111" strokeWidth="5.5" fill="none" />
            <path d="M168,98 Q152,90 138,99" stroke="#111111" strokeWidth="5.5" fill="none" />
          </>
        )}

        {/* 口元 */}
        {isEvilOrCool ? (
          /* ニヤリ牙付きの口 */
          <g>
            <path d="M108,136 Q130,149 152,136 Z" fill="#991b1b" strokeWidth="3.5" />
            <polygon points="114,137 118,144 122,138" fill="#ffffff" strokeWidth="1.5" />
            <polygon points="138,138 142,144 146,137" fill="#ffffff" strokeWidth="1.5" />
          </g>
        ) : isFunnyTired ? (
          /* 焦り・哀愁の波線口＋汗 */
          <>
            <path
              d="M112,140 Q121,134 130,140 T148,140"
              fill="none"
              stroke="#111111"
              strokeWidth="4"
            />
            <path
              d="M174,96 C174,96 182,108 178,114 C174,118 168,114 174,96 Z"
              fill="#38bdf8"
              stroke="#111111"
              strokeWidth="2.5"
            />
          </>
        ) : (
          /* 元気・堂々としたビックリマン笑顔 */
          <path d="M112,135 Q130,152 148,135 Z" fill="#ef4444" strokeWidth="3.5" />
        )}

        {/* 大賢者・魔導王の白髭 */}
        {archetype === "archmage" && (
          <path
            d="M95,134 Q130,144 165,134 C162,165 148,184 130,190 C112,184 98,165 95,134 Z"
            fill="#f8fafc"
            stroke="#111111"
            strokeWidth="4"
          />
        )}
      </g>

      {/* ====== 頭装備・兜・帽子・シンボルレイヤー ====== */}
      <g stroke="#111111" strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round">
        {archetype === "paladin" && (
          /* 聖騎士の羽根つき黄金兜 */
          <>
            <path d="M78,96 C78,56 182,56 182,96 L158,86 L130,98 L102,86 Z" fill="url(#goldGrad)" />
            <path d="M76,84 C48,64 42,38 66,44 C56,56 64,68 78,74 Z" fill="#ffffff" />
            <path d="M184,84 C212,64 218,38 194,44 C204,56 196,68 182,74 Z" fill="#ffffff" />
            <polygon points="130,44 142,74 130,86 118,74" fill="#ef4444" />
          </>
        )}

        {(archetype === "demon_lord" || archetype === "dragoon") && (
          /* 魔王・竜騎士の二本角＆闇の冠 */
          <>
            <path d="M80,92 C85,62 175,62 180,92 L154,84 L130,95 L106,84 Z" fill="#1e1b4b" />
            <path d="M88,78 C54,58 46,26 72,22 C66,44 78,58 98,68 Z" fill="url(#goldGrad)" />
            <path d="M172,78 C206,58 214,26 188,22 C194,44 182,58 162,68 Z" fill="url(#goldGrad)" />
            <circle cx="130" cy="76" r="9" fill="#ef4444" />
          </>
        )}

        {archetype === "archmage" && (
          /* 巨大星詠み魔導ハット */
          <>
            <ellipse cx="130" cy="78" rx="72" ry="16" fill="#1e3a8a" />
            <path d="M82,76 L130,18 L172,38 L158,76 Z" fill="#1d4ed8" />
            <polygon points="130,42 135,52 146,54 138,61 140,72 130,66 120,72 122,61 114,54 125,52" fill="#fde047" strokeWidth="2.5" />
          </>
        )}

        {archetype === "reaper" && (
          /* 死神フード＆額のドクロ紋章 */
          <>
            <path d="M70,112 C66,52 194,52 190,112 C176,84 84,84 70,112 Z" fill="#18181b" />
            <circle cx="130" cy="72" r="11" fill="#f8fafc" strokeWidth="3" />
          </>
        )}

        {archetype === "vampire" && (
          /* 貴族ヘア＆紅の宝冠 */
          <>
            <path d="M78,94 C78,58 182,58 182,94 L164,78 L130,92 L96,78 Z" fill="#1e1b4b" />
            <polygon points="110,68 120,48 130,62 140,48 150,68" fill="url(#goldGrad)" />
          </>
        )}

        {archetype === "alchemist" && (
          /* スチームパンクゴーグル */
          <>
            <path d="M78,90 C84,60 176,60 182,90 Z" fill="#78350f" />
            <rect x="82" y="68" width="96" height="22" rx="8" fill="#b45309" />
            <circle cx="108" cy="79" r="13" fill="#38bdf8" stroke="#fef08a" strokeWidth="4" />
            <circle cx="152" cy="79" r="13" fill="#38bdf8" stroke="#fef08a" strokeWidth="4" />
          </>
        )}

        {archetype === "observer" && (
          /* 超越者の神聖ヘイロー（光輪）と第三の目 */
          <>
            <ellipse cx="130" cy="40" rx="48" ry="11" fill="none" stroke="#fde047" strokeWidth="6" />
            <path d="M80,92 C86,62 174,62 180,92 L130,78 Z" fill="#0284c7" />
            <ellipse cx="130" cy="84" rx="10" ry="6" fill="#fde047" strokeWidth="3" />
            <circle cx="130" cy="84" r="3.5" fill="#dc2626" stroke="none" />
          </>
        )}

        {archetype === "teiji_dash" && (
          /* サラリーマン七三ヘア＆「定時18:00」ハチマキ */
          <>
            <path d="M78,92 C82,58 178,58 182,92 Z" fill="#1e293b" />
            <rect x="78" y="76" width="104" height="16" rx="4" fill="#ffffff" />
            <circle cx="130" cy="84" r="6" fill="#ef4444" stroke="none" />
          </>
        )}

        {archetype === "futon_sage" && (
          /* ナイトキャップ＆安眠枕クラウン */
          <>
            <path d="M78,90 C86,52 176,54 195,88 L175,92 Z" fill="#6366f1" />
            <circle cx="198" cy="88" r="11" fill="#fef08a" />
          </>
        )}

        {archetype === "cat_servant" && (
          /* 頭上に鎮座する王冠をかぶったドヤ顔ボス猫様 */
          <g>
            <path d="M92,78 L86,46 L108,60 L130,56 L152,60 L174,46 L168,78 Z" fill="#f8fafc" strokeWidth="4" />
            <ellipse cx="130" cy="72" rx="34" ry="22" fill="#f8fafc" strokeWidth="4" />
            <circle cx="116" cy="70" r="4" fill="#111111" stroke="none" />
            <circle cx="144" cy="70" r="4" fill="#111111" stroke="none" />
            <path d="M124,76 Q130,81 136,76" fill="none" stroke="#111111" strokeWidth="3" />
            <polygon points="118,52 124,36 130,46 136,36 142,52" fill="#fde047" strokeWidth="3" />
          </g>
        )}

        {archetype === "hangaku_hunter" && (
          /* 額に輝く「半額 50%OFF」赤黄シールエンブレム */
          <>
            <path d="M78,92 C84,60 176,60 182,92 Z" fill="#1c1917" />
            <rect x="92" y="62" width="76" height="28" rx="6" fill="#ef4444" stroke="#fde047" strokeWidth="3.5" />
            <rect x="98" y="67" width="64" height="18" rx="3" fill="#fde047" stroke="none" />
            <text
              x="130"
              y="81"
              textAnchor="middle"
              fontSize="14"
              fontWeight="900"
              fill="#dc2626"
              stroke="none"
            >
              半額50%
            </text>
          </>
        )}

        {archetype === "caffeine_addict" && (
          /* 逆立つ覚醒超サイヤ風ヘア */
          <path
            d="M76,94 L62,64 L94,72 L106,42 L130,66 L154,42 L166,72 L198,64 L184,94 Z"
            fill="#facc15"
          />
        )}

        {archetype === "digital_cursed" && (
          /* 頭上に点滅する「2%」赤バッテリーアイコン */
          <>
            <path d="M80,92 C86,62 174,62 180,92 Z" fill="#0f172a" />
            <rect x="98" y="42" width="60" height="28" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="3.5" />
            <rect x="158" y="49" width="6" height="14" rx="2" fill="#ef4444" stroke="none" />
            <rect x="103" y="47" width="10" height="18" rx="2" fill="#ef4444" stroke="none" />
            <text x="134" y="61" textAnchor="middle" fontSize="14" fontWeight="900" fill="#ef4444" stroke="none">
              2%
            </text>
          </>
        )}

        {archetype === "ouch_sinner" && (
          /* 勇者バンダナ＆頭に冷えピタシート */
          <>
            <path d="M80,92 C86,62 174,62 180,92 Z" fill="#44403c" />
            <rect x="98" y="68" width="64" height="20" rx="4" fill="#bae6fd" strokeWidth="3.5" />
          </>
        )}

        {archetype === "broke_noble" && (
          /* 豪華な黄金王冠（ただし宝石が取れかけ） */
          <polygon
            points="84,88 76,50 106,70 130,42 154,70 184,50 176,88"
            fill="url(#goldGrad)"
          />
        )}
      </g>

      {/* ====== 両手＆系統別メインウェポン・小道具レイヤー ====== */}
      <g stroke="#111111" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* 左手・右手 */}
        <circle cx="64" cy="166" r="14" fill="#fed7aa" />
        <circle cx="196" cy="166" r="14" fill="#fed7aa" />

        {/* 系統別アイテム */}
        {(archetype === "paladin" || archetype === "dragoon") && (
          /* 聖剣エクスカリバー / 魔槍 */
          <g transform="translate(200, 145) rotate(18)">
            <polygon points="0,-95 14,-65 10,10 -10,10 -14,-65" fill="url(#bladeGrad)" />
            <rect x="-22" y="8" width="44" height="10" rx="4" fill="url(#goldGrad)" />
            <rect x="-6" y="18" width="12" height="22" rx="3" fill="#991b1b" />
          </g>
        )}

        {(archetype === "demon_lord" || archetype === "vampire") && (
          /* 暗黒重力球 */
          <g>
            <circle cx="54" cy="136" r="24" fill="#581c87" stroke="#f0abfc" strokeWidth="3.5" />
            <circle cx="54" cy="136" r="11" fill="#fde047" stroke="none" />
          </g>
        )}

        {(archetype === "archmage" || archetype === "observer") && (
          /* 星霊ロッド＆魔導書 */
          <g>
            <line x1="204" y1="85" x2="192" y2="215" stroke="#b45309" strokeWidth="7" />
            <circle cx="204" cy="82" r="18" fill="#38bdf8" stroke="#fde047" strokeWidth="4" />
            <rect x="34" y="135" width="38" height="46" rx="4" fill="#7c2d12" />
          </g>
        )}

        {archetype === "reaper" && (
          /* 巨大デスサイズ（大鎌） */
          <g>
            <line x1="205" y1="65" x2="185" y2="220" stroke="#475569" strokeWidth="7" />
            <path d="M205,70 C145,50 115,75 135,100 C155,82 180,82 202,90 Z" fill="#e2e8f0" />
          </g>
        )}

        {archetype === "alchemist" && (
          /* 輝く霊薬フラスコ＆黄金ギア */
          <g>
            <path d="M46,125 L62,125 L62,138 L76,162 L32,162 L46,138 Z" fill="#10b981" />
            <circle cx="206" cy="138" r="20" fill="url(#goldGrad)" strokeDasharray="8 4" />
          </g>
        )}

        {archetype === "teiji_dash" && (
          /* 「有給」黄金札＆18:00時計 */
          <g>
            <rect x="28" y="120" width="42" height="56" rx="5" fill="#fef08a" />
            <text x="49" y="154" textAnchor="middle" fontSize="16" fontWeight="900" fill="#111111" stroke="none">
              有給
            </text>
            <circle cx="206" cy="138" r="22" fill="#ffffff" />
            <polyline points="206,124 206,138 216,138" fill="none" stroke="#ef4444" strokeWidth="4" />
          </g>
        )}

        {archetype === "futon_sage" && (
          /* 粉砕される目覚まし時計 */
          <g>
            <circle cx="52" cy="138" r="20" fill="#fef08a" />
            <text x="52" y="144" textAnchor="middle" fontSize="13" fontWeight="900" fill="#111111" stroke="none">
              Zzz
            </text>
          </g>
        )}

        {archetype === "cat_servant" && (
          /* 尊い推しペンライト2刀流 */
          <g>
            <rect x="44" y="110" width="14" height="52" rx="6" fill="#f472b6" />
            <rect x="202" y="110" width="14" height="52" rx="6" fill="#38bdf8" />
          </g>
        )}

        {archetype === "hangaku_hunter" && (
          /* 黄金ラーメン丼＆割り箸 */
          <g>
            <path d="M26,144 L82,144 C78,172 30,172 26,144 Z" fill="#dc2626" />
            <line x1="186" y1="115" x2="222" y2="165" stroke="#fde047" strokeWidth="5" />
            <line x1="194" y1="110" x2="226" y2="160" stroke="#fde047" strokeWidth="5" />
          </g>
        )}

        {archetype === "caffeine_addict" && (
          /* 巨大MAXコーヒーマグ */
          <g>
            <rect x="34" y="132" width="36" height="42" rx="6" fill="#78350f" />
            <text x="52" y="158" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fef08a" stroke="none">
              MAX
            </text>
          </g>
        )}

        {archetype === "digital_cursed" && (
          /* Wi-Fiルーターアンテナ */
          <g>
            <rect x="34" y="148" width="40" height="18" rx="4" fill="#334155" />
            <line x1="44" y1="148" x2="40" y2="122" stroke="#38bdf8" strokeWidth="4" />
            <line x1="64" y1="148" x2="68" y2="122" stroke="#38bdf8" strokeWidth="4" />
          </g>
        )}

        {archetype === "ouch_sinner" && (
          /* 聖剣ビニール傘＆腰の稲妻マーク */
          <g>
            <path d="M204,90 L214,175 L194,175 Z" fill="#e0f2fe" />
            <polygon points="56,162 42,182 54,182 44,204 68,178 56,178" fill="#facc15" strokeWidth="2.5" />
          </g>
        )}

        {archetype === "broke_noble" && (
          /* 羽根が生えて飛んでいく小銭 */
          <g>
            <circle cx="52" cy="134" r="14" fill="#fde047" />
            <text x="52" y="139" textAnchor="middle" fontSize="14" fontWeight="900" fill="#92400e" stroke="none">
              ¥
            </text>
          </g>
        )}
      </g>
    </svg>
  );
}

export default function BikkurimanSticker({ result }: BikkurimanStickerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const archetype = getBikkurimanArchetype(result.suffix, result.isGap, result.seed);
  const meta = ARCHETYPE_META[archetype];
  const palette = getAttributePalette(result.attribute);
  const prismLabel = getPrismTypeLabel(result.rarity);
  const stickerNo = String((result.seed % 999) + 1).padStart(3, "0");

  const prismClass =
    result.rarity === "UR"
      ? "bikkuriman-prism-ur"
      : result.rarity === "SSR"
      ? "bikkuriman-prism-ssr"
      : result.rarity === "SR"
      ? "bikkuriman-prism-sr"
      : result.rarity === "R"
      ? "bikkuriman-prism-r"
      : "bikkuriman-prism-n";

  return (
    <div className="flex flex-col items-center">
      {/* 正方形のビックリマンシール本体（タップで表面⇔裏面フリップ） */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        aria-label="ビックリマン風シールを裏返す"
        className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl p-2 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(251,191,36,0.35)] cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        {!isFlipped ? (
          /* ================= 表面：キラキラ角プリズム＆2頭身キャラ＆袋文字タイトル ================= */
          <div
            className={`relative w-full h-full rounded-lg border-[3px] border-stone-950 overflow-hidden flex flex-col justify-between ${prismClass}`}
            style={{
              backgroundColor:
                result.rarity === "R" || result.rarity === "N" ? palette.primary : undefined,
            }}
          >
            {/* 斜めホログラム反射グレア */}
            <div className="pointer-events-none absolute inset-0 shimmer-effect opacity-80" />

            {/* 上部：種族バッジ・シールNo・二つ名袋文字ロゴ */}
            <div className="relative z-20 px-2 pt-1.5">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded border-2 border-stone-950 shadow-sm tracking-tight"
                  style={{
                    backgroundColor: meta.sealBadgeBg,
                    color: meta.sealBadgeText,
                  }}
                >
                  {meta.categoryLabel}
                </span>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-stone-950 text-amber-300 border border-amber-400/80 font-mono">
                    No.{stickerNo}
                  </span>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded bg-red-600 text-yellow-200 border-2 border-stone-950 shadow">
                    {result.rarity}
                  </span>
                </div>
              </div>

              {/* 前半の修飾語リボン */}
              <div className="bg-stone-950/90 border border-amber-300/80 rounded px-2 py-0.5 text-center shadow">
                <p className="text-[10px] sm:text-[11px] font-black text-amber-200 truncate">
                  {result.prefix}
                </p>
              </div>

              {/* 後半のメインキャラ名（ビックリマン風 極太袋文字） */}
              <div className="mt-0.5 text-center">
                <div
                  className="font-black text-lg sm:text-xl leading-tight tracking-tighter break-keep drop-shadow-[0_3px_0_#000000]"
                  style={{
                    color: meta.titleColor,
                    WebkitTextStroke: `1.5px #111111`,
                    textShadow: `2px 2px 0 ${meta.titleStroke}, -2px -2px 0 #111111, 2px -2px 0 #111111, -2px 2px 0 #111111`,
                  }}
                >
                  {result.suffix}
                </div>
              </div>
            </div>

            {/* 中央：2頭身デフォルメキャラクター */}
            <div className="relative z-10 flex-1 flex items-center justify-center -my-3 px-4">
              <div className="w-44 h-44 sm:w-48 sm:h-48">
                <ChibiCharacterSvg
                  archetype={archetype}
                  primaryColor={palette.primary}
                  secondaryColor={palette.secondary}
                />
              </div>
            </div>

            {/* 下部：対象者ネームプレート＆戦闘力フッター */}
            <div className="relative z-20 bg-stone-950/95 border-t-2 border-stone-950 px-2.5 py-1 flex items-center justify-between text-[11px]">
              <span className="font-black text-amber-300 truncate max-w-[52%]">
                {result.name}
              </span>
              <span className="font-mono font-black text-white bg-red-700 px-1.5 py-0.2 rounded border border-amber-300 text-[10px]">
                戦闘力 {result.combatPowerFormatted}
              </span>
            </div>
          </div>
        ) : (
          /* ================= 裏面：当時のビックリマン「悪魔VS天使シール 裏書き」風デザイン ================= */
          <div className="relative w-full h-full rounded-lg border-[3px] border-blue-950 bg-[#fef9c3] text-blue-950 p-3 flex flex-col justify-between overflow-hidden">
            {/* レトロ印刷の内枠 */}
            <div className="border-2 border-red-600 rounded h-full p-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-blue-900 pb-1">
                  <span className="text-[10px] font-black bg-red-600 text-yellow-100 px-1.5 py-0.5 rounded">
                    悪魔VS天使 二つ名シール
                  </span>
                  <span className="text-xs font-mono font-black text-blue-900">
                    No.{stickerNo} [{result.rarity}]
                  </span>
                </div>

                <div className="mt-1.5 text-center bg-blue-950 text-yellow-200 rounded py-1 px-1.5">
                  <div className="text-[10px] text-amber-300 font-bold">{result.prefix}</div>
                  <div className="text-sm font-black leading-tight">{result.suffix}</div>
                </div>

                {/* 必殺スキル解説 */}
                <div className="mt-2 bg-yellow-100 border border-blue-900/40 rounded p-1.5 text-[11px] leading-snug">
                  <div className="font-black text-red-700">
                    ★ 必殺技：【{result.skill.name}】
                  </div>
                  <p className="text-blue-950 mt-0.5 text-[10px] font-medium">
                    {result.skill.description}
                  </p>
                </div>
              </div>

              {/* 魔導ウワサ欄（ビックリマン裏面の「ウワサ」パロディ） */}
              <div className="bg-red-50 border-2 border-dashed border-red-600 rounded p-1.5 text-[10px] leading-snug">
                <span className="font-black text-red-700 mr-1">【魔界のウワサ】</span>
                <span className="text-stone-900 font-semibold">{result.flavorText}</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold text-blue-900 pt-1 border-t border-blue-900/30">
                <span>系統：{meta.archetypeName}</span>
                <span>属性：{result.attribute}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* シール仕様バッジ＆裏面フリップ案内ボタン */}
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{prismLabel}</span>
        </span>
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="text-xs px-3 py-1 rounded-full bg-stone-900 hover:bg-stone-800 border border-amber-400/50 text-amber-200 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 text-amber-400" />
          <span>{isFlipped ? "シールの表面（キラ絵）に戻す" : "シールを裏返す（裏書きを見る）"}</span>
        </button>
      </div>
    </div>
  );
}
