export type Rarity = "UR" | "SSR" | "SR" | "R" | "N";

export type DiagnosisMode = "standard" | "daily";

export interface DiagnosisResult {
  name: string;
  mode: DiagnosisMode;
  dateStr?: string;
  seed: number;
  prefix: string;
  suffix: string;
  fullTitle: string;
  isGap: boolean;
  rarity: Rarity;
  combatPower: number;
  combatPowerFormatted: string;
  skill: {
    name: string;
    description: string;
  };
  flavorText: string;
  stats: {
    mag: number; // 魔力
    chuuni: number; // 覇気・中二度
    luck: number; // 豪運
    agility: number; // 俊敏
    vitality: number; // 生存力（社畜耐性）
  };
  attribute: string;
}

/**
 * 前半の修飾語（王道中二病ワード 48パターン）
 */
export const PREFIXES: string[] = [
  "深淵を覗きし",
  "蒼き疾風の",
  "神に叛きし",
  "漆黒の翼を持つ",
  "終焉を告げる",
  "因果律を統べる",
  "永劫回帰の",
  "星屑を纏いし",
  "禁忌に触れし",
  "虚空を裂く",
  "紅蓮の焔を宿す",
  "忘却の彼方より来たりし",
  "黄昏に佇む",
  "千年帝国を滅ぼした",
  "神々の黄昏を呼ぶ",
  "白銀の閃光を放つ",
  "次元を超越せし",
  "混沌より生まれし",
  "月光を喰らう",
  "奈落の王座に座す",
  "第七封印を解きし",
  "天界を追放されし",
  "世界樹の記憶を継ぐ",
  "魔眼を開眼せし",
  "絶対零度の",
  "黙示録に記されし",
  "暁の空を焦がす",
  "亡国の遺志を背負う",
  "黒曜の魔剣を振るう",
  "星詠みの聖典を紡ぐ",
  "螺旋の宿命を断つ",
  "雷帝の血を引く",
  "幻影の迷宮を彷徨う",
  "創世の神話を書き換えし",
  "無窮の孤独を愛する",
  "不死者（ノスフェラトゥ）の",
  "アカシックレコードを閲覧せし",
  "狂乱の宴を指揮する",
  "極光を束ねし",
  "煉獄の業火を統べる",
  "虚無の玉座を簒奪せし",
  "万象の理を識る",
  "堕天の黒翼を広げし",
  "蒼穹を貫く",
  "時空の狭間に取り残されし",
  "古の盟約に縛られし",
  "緋色の月下に舞う",
  "最終戦争（ラグナロク）を生き抜きし",
];

/**
 * 後半の名詞：85%で選出される「王道のかっこいいワード」（48パターン）
 */
export const COOL_SUFFIXES: string[] = [
  "聖騎士（パラディン）",
  "契約者（コントラクター）",
  "魔導王",
  "破壊神",
  "竜騎士（ドラグーン）",
  "大賢者",
  "死神（リーパー）",
  "超越者",
  "覇王",
  "堕天使",
  "執行者（エクスキューショナー）",
  "調停者",
  "剣聖",
  "魔王",
  "審判者（ジャッジメント）",
  "星霊術師",
  "影の君主",
  "機関長",
  "煉獄の番人",
  "神殺し（ゴッドスレイヤー）",
  "黒魔導師",
  "次元旅人（ディメンションウォーカー）",
  "狂戦士（バーサーカー）",
  "幻影騎士",
  "天啓の預言者",
  "死霊術師（ネクロマンサー）",
  "蒼焔の銃士",
  "機巧魔術師",
  "終末の観測者",
  "封印の守護者",
  "天空の支配者",
  "不滅の英雄",
  "禁忌の錬金術師",
  "雷光の暗殺者",
  "深淵の皇子",
  "聖痕の継承者",
  "虚空の支配者",
  "魔王軍四天王筆頭",
  "神聖騎士団長",
  "幻獣の契約主",
  "魔導機神の操縦者",
  "紅き夜の吸血鬼",
  "世界線を渡る観測者",
  "災厄の化身",
  "黄金律の継承者",
  "孤高の魔剣士",
  "銀狼の傭兵王",
  "終焉の奏者",
];

/**
 * 後半の名詞：15%で選出される「生活感・哀愁・シュールなギャップワード」（45パターン）
 */
export const GAP_SUFFIXES: string[] = [
  "有給消化率100%",
  "猫の下僕",
  "腰椎椎間板ヘルニア",
  "定時退社のプロ",
  "半額シールハンター",
  "二度寝の覇者",
  "慢性的な寝不足",
  "カフェイン中毒者",
  "スマホ充電残り2%",
  "Wi-Fiルーター再起動係",
  "布団から出られない者",
  "ラーメン大盛り無料券所持者",
  "確定申告ギリギリ勢",
  "改札で引っかかる者",
  "シャンプー詰め替え失敗者",
  "傘を電車に忘れし者",
  "金曜夜のハイボール魔神",
  "月曜朝の絶望体現者",
  "ポイントカード期限切れ王",
  "コンビニ新作スイーツ鑑定士",
  "ExcelのVLOOKUP職人",
  "エレベーターの閉ボタン連打師",
  "宅配便の再配達依頼者",
  "筋肉痛が2日後に来る者",
  "Passwordを毎回リセットする者",
  "リモート会議のミュート忘れし者",
  "家の鍵を閉めたか不安になる者",
  "レジ袋有料化に未だ抗う者",
  "休日の昼過ぎまでパジャマの者",
  "推しのATM",
  "ポテチを箸で食べる賢者",
  "サウナの水風呂で整いし者",
  "目覚ましアラーム5分刻み設定者",
  "積読タワー建設責任者",
  "スマホを顔面に落とす者",
  "焼肉の網交換タイミング奉行",
  "USBを3回目でやっと挿せる者",
  "エアコンのリモコン捜索隊長",
  "低気圧に完全敗北せし者",
  "カップ麺3分待てない執行者",
  "深夜のペヤング召喚士",
  "洗濯物を干し忘れた大罪人",
  "イヤホン片方紛失の呪われし者",
  "サブスク解約忘れの貴族",
  "年中金欠の錬金術師",
];

/**
 * 固有スキル一覧（45パターン）
 */
export const SKILLS: { name: string; description: string }[] = [
  { name: "確定遅刻回避", description: "ギリギリ1分前に到着するよう空間を歪曲させる" },
  { name: "無限カフェイン吸収", description: "珈琲を摂取するほど魔力と集中力が限界突破する" },
  { name: "絶対領域展開・布団", description: "半径2m以内の人間を強制的に二度寝へと誘う結界" },
  { name: "深淵の眼差し", description: "目があった相手の営業トークを即座に沈黙させる" },
  { name: "定時退社テレポーテーション", description: "18:00ジャストに残像を残してオフィスから消滅する" },
  { name: "終焉の黒炎（ダークフレイム）", description: "黒歴史を思い出すことで攻撃力が999%上昇する" },
  { name: "因果応報カウンター", description: "理不尽な仕様変更をそのまま依頼主へ跳ね返す" },
  { name: "神速の既読スルー", description: "通知を見た瞬間に記憶から抹消し精神の平穏を保つ" },
  { name: "半額惣菜千里眼", description: "スーパーで店員がシールを貼る軌道を3手先まで予測する" },
  { name: "魔導書（Google）高速詠唱", description: "分からない専門用語を0.3秒で検索し知ったかぶりをする" },
  { name: "猫吸いによる全回復", description: "猫の腹部に顔を埋めることでHP・MP・正気度を全快する" },
  { name: "覇王色の相槌", description: "話を全く聞いていなくても「なるほどですね」で場を支配する" },
  { name: "次元断絶イヤホン", description: "装着した瞬間、外界の雑音と現実から完全にログアウトする" },
  { name: "虚空からの推し供給", description: "推しの尊い供給を受けた際、周囲に光の粒子を撒き散らす" },
  { name: "不死鳥の仮病", description: "月曜日の朝のみ発動可能な高難度状態異常付与スキル" },
  { name: "アカシック・スクリーンショット", description: "タイムラインの決定的瞬間を0.05秒で保存する神業" },
  { name: "絶対零度の愛想笑い", description: "心の温度をマイナス273度に保ったまま完璧な笑顔を作る" },
  { name: "暴食の深夜ラーメン", description: "24時以降に摂取したカロリーを別次元へ転送（※願望）" },
  { name: "雷神のタイピング音", description: "Enterキーをッターン！と叩くことで仕事している感を演出" },
  { name: "聖なる有給申請", description: "いかなる上司の阻止も貫通する不可侵の休暇取得奥義" },
  { name: "狂戦士の衝動買い", description: "セール終盤の「残り1点」を見ると理性が蒸発しポチる" },
  { name: "幻影のマルチタスク", description: "5つの作業を同時に進めているようで実は全部止まっている" },
  { name: "時空超越の締め切り前夜", description: "追い詰められた最後の3時間で通常の10倍の速度を発揮する" },
  { name: "重力魔法・月曜日の身体", description: "週明けのみ自身の体重感覚が5倍になるパッシブスキル" },
  { name: "禁忌の二度寝スヌーズ", description: "アラームを無意識に解除し、夢の続きを再構築する高等魔術" },
  { name: "黄金のポイ活錬金術", description: "1円単位のポイントを塵も積もれば山となる精神で回収する" },
  { name: "星屑の夜更かし", description: "午前3時を過ぎると急に人生の壮大な計画を立て始める" },
  { name: "冥府のサウナトランス", description: "高温サウナと水風呂の往復により宇宙の真理に到達する" },
  { name: "漆黒のコミュ力前借り", description: "飲み会で翌月分の社交性を一気に使い果たし3日間寝込む" },
  { name: "天啓のガチャ単発引き", description: "物欲センサーを完全に無にした時だけ最高レアを引き当てる" },
  { name: "竜脈のWi-Fi探知", description: "カフェに入った瞬間に最も電波とコンセントが良い席を特定する" },
  { name: "神域のノールック冷蔵庫", description: "何もないと分かっていながら15分おきに冷蔵庫を開閉する" },
  { name: "魔眼・誤字脱字発見", description: "送信ボタンを押した0.1秒後に自分の誤字を100%発見する" },
  { name: "創世の部屋の模様替え", description: "テスト前や大事な作業前に限り掃除スキルが極限まで高まる" },
  { name: "不屈の充電1%粘り", description: "バッテリー残り1%から充電器に挿すまで驚異の生命力を発揮する" },
  { name: "閃光のフリック入力", description: "SNSでバズりそうなネタを思いついた瞬間、音速で下書きする" },
  { name: "虚無の休日ワープ", description: "土曜の朝に目を閉じて開けると日曜の夕方になっている禁術" },
  { name: "聖剣エクスカリバー（傘）", description: "雨上がりの帰り道、誰もいない時だけ傘を剣として構える" },
  { name: "魔王の二度見", description: "予想外の請求額を見た際、首が折れるほどの速度で二度見する" },
  { name: "銀河級の方向音痴", description: "Googleマップを見ながら正反対の方向へ堂々と行進する" },
  { name: "森羅万象の『まあいっか』", description: "あらゆるトラブルを魔法の言葉ひとつで精神的解決に導く" },
  { name: "福音のお布団乾燥機", description: "ほかほかの寝床を生成し、侵入者を即座に睡眠状態にする" },
  { name: "紅蓮の激辛耐性", description: "辛さレベルMAXを涼しい顔で食すが翌朝しっかり後悔する" },
  { name: "永劫のパスワード迷宮", description: "『以前のパスワードと同じです』と表示され精神が崩壊する" },
  { name: "神罰のタンス小指強打", description: "足の小指に全ダメージが集中する呪われしクリティカル判定" },
];

/**
 * 二つ名の由来（1行フレーバーテキスト 45パターン）
 */
export const FLAVOR_TEXTS: string[] = [
  "古の魔導書『第7章』にその名が刻まれし伝説の存在。ただし朝には滅法弱い。",
  "かつて神々と渡り合ったとされるが、現在の主な戦場は満員電車である。",
  "その真の力を解放すると周囲の電子機器がフリーズすると恐れられている。",
  "三千世界の因果を書き換えた張本人。好物は揚げたてのフライドポテト。",
  "王立魔導研究院が『測定不能』と匙を投げた規格外のポテンシャルを秘める。",
  "封印されし右腕の疼きを抑えるため、定期的に甘いスイーツを摂取している。",
  "裏世界の誰もがその異名を聞いて震え上がるが、本人は至って平和主義。",
  "幾多の修羅場をくぐり抜けた歴戦の猛者。休日は一歩も家から出ない。",
  "星空を見上げては宇宙の真理に思いを馳せる、ロマンと哀愁の体現者。",
  "悪魔すら契約をためらうほどの強運とマイペースさを兼ね備えた特異点。",
  "絶体絶命のピンチほど不敵に笑うが、内心では帰りたくて仕方がない。",
  "異世界からの転生者と噂されるほど、独自のセンスと世界観を持っている。",
  "百年に一度の逸材と称えられるも、本人は定時上がりと安眠を最優先する。",
  "静かなるオーラの奥に、世界を焼き尽くすほどの情熱（と睡眠欲）を秘める。",
  "神託により選ばれし運命の鍵。なお取扱説明書は紛失した模様。",
  "暗黒時代の終焉をもたらした英雄の末裔。現在はお財布の終焉と戦っている。",
  "その瞳は全てを見通すというが、メガネを外すと何も見えないらしい。",
  "歴史の影で数々の奇跡を起こしてきたが、記録に残るのはだいたい珍事件。",
  "圧倒的なカリスマ性を放つ一方、動物や赤ちゃんには一瞬でデレる。",
  "選ばれし者のみが到達できる境地に達しているが、本人に自覚はまったくない。",
  "かつて魔王軍を単騎で退けた伝説を持つが、低気圧の日だけは戦闘不能になる。",
  "次元を超える知性の持ち主。ただし昨日の晩ごはんは思い出せない。",
  "禁忌の秘術を編み出した天才。そのエネルギー源は9割がカフェインで構成される。",
  "世界の均衡を保つバランサー。飲み会では皿を片付ける係になりがち。",
  "その名を口にするだけで幸運が訪れるという、歩くパワースポット的存在。",
  "冷徹な仮面の下に、推しのことになると語彙力を失う熱い魂を宿している。",
  "終末時計の針を止めた救世主。しかし目覚まし時計の針には毎朝敗北している。",
  "八百万の神々から愛されし宿命の子。くじ引きだけはなぜかティッシュ賞。",
  "天地創造の時代から語り継がれる魂の器。実はめちゃくちゃ涙脆い。",
  "孤高を貫く狼のような佇まいだが、褒められると尻尾を振って喜ぶタイプ。",
  "魔界の最高評議会が常に動向を監視している要注意人物（主に夜食テロで）。",
  "運命の糸を自在に操る支配者。イヤホンコードだけはいつも絡まっている。",
  "光と闇の両属性を完全に制御せし稀有な存在。休日の予定は白紙が多い。",
  "千の言葉より一つの行動で示す背中で語る系主人公。実は方向音痴。",
  "神域の集中力を発揮した時は誰にも止められない。スイッチが入るまでが長い。",
  "あらゆる結界を無効化する特殊な体質。自動ドアがたまに反応しない。",
  "古代遺跡の壁画に予言されていた救世主と完全に一致するシルエットを持つ。",
  "数多の平行世界で同時に覚醒した、可能性の獣とも呼ばれる存在。",
  "王者の風格を漂わせながらコンビニのレジ横ホットスナックを必ず買ってしまう。",
  "その微笑みは天使か悪魔か。締切直前の追い込み力はまさに神業の領域。",
  "伝説の武具に選ばれし正統後継者。ただし肩こりと腰痛が最大の敵。",
  "深淵の知識を統べる賢者にして、深夜のネットサーフィンを極めし探求者。",
  "どんな絶望的な状況でも『なんとかなる』の一言で突破してきた強運の持ち主。",
  "神話級の戦闘力を誇りながら、争いを好まずこたつで丸くなることを選ぶ覇者。",
  "記録上、過去に一度だけ本気を出した際に地図から山が一つ消えたという。",
];

/**
 * 属性一覧
 */
export const ATTRIBUTES: string[] = [
  "深淵（アビス）",
  "蒼焔（ブルーフレイム）",
  "虚空（ヴォイド）",
  "星光（アストラル）",
  "雷帝（トール）",
  "混沌（カオス）",
  "聖痕（スティグマ）",
  "幻影（ファントム）",
  "紅蓮（クリムゾン）",
  "絶対零度（コキュートス）",
  "時空（クロノス）",
  "黄金律（エルドラド）",
];

/**
 * FNV-1a (32-bit) ハッシュ関数
 * 同じ入力文字列に対して常に同一の符号なし32ビット整数を返す
 */
export function fnv1aHash(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * サブシード生成ヘルパー（xorshift32ベース）
 */
function nextRand(seed: number, step: number): number {
  let x = (seed + Math.imul(step, 0x9e3779b9)) >>> 0;
  if (x === 0) x = 0x6d2b79f5;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return x >>> 0;
}

/**
 * 日本時間 (JST) ベースの YYYYMMDD 文字列を取得
 */
export function getTodayDateString(customDate?: Date): string {
  const now = customDate ?? new Date();
  // JST (UTC+9)
  const jstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const year = jstTime.getUTCFullYear();
  const month = String(jstTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jstTime.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * レアリティ判定
 * UR (0.5%) / SSR (4.5%) / SR (20%) / R (35%) / N (40%)
 * 0〜999 の1000段階判定：
 * - 0〜4 (5/1000 = 0.5%): UR
 * - 5〜49 (45/1000 = 4.5%): SSR
 * - 50〜249 (200/1000 = 20.0%): SR
 * - 250〜599 (350/1000 = 35.0%): R
 * - 600〜999 (400/1000 = 40.0%): N
 */
export function determineRarity(randVal: number): Rarity {
  const roll = randVal % 1000;
  if (roll < 5) return "UR";
  if (roll < 50) return "SSR";
  if (roll < 250) return "SR";
  if (roll < 600) return "R";
  return "N";
}

/**
 * 推定戦闘力の算出（極端な数値やネタ数値も含むドラマチックな算出）
 */
function calculateCombatPower(rarity: Rarity, randVal: number, isGap: boolean): number {
  const sub = (randVal >>> 4) % 100;

  // シュール・ギャップ系の場合は1/3の確率で「28」や「5」など極端に低い哀愁戦闘力、または53万などのネタ数値に
  if (isGap && sub < 25) {
    const funnyLowPowers = [3, 5, 12, 28, 42, 88, 108, 365];
    return funnyLowPowers[randVal % funnyLowPowers.length];
  }

  // 特定レアパターンで「530,000」などの象徴的数値
  if (sub === 53) {
    return 530000;
  }

  switch (rarity) {
    case "UR":
      return 5300000 + (randVal % 94699999); // 530万〜9,999万9,999
    case "SSR":
      return 530000 + (randVal % 4470000); // 53万〜500万
    case "SR":
      return 85000 + (randVal % 445000); // 8.5万〜53万
    case "R":
      return 8000 + (randVal % 77000); // 8,000〜85,000
    case "N":
    default:
      if (sub < 15) {
        // Nでもたまに極端に低い数値が出るギャップ
        return 15 + (randVal % 85);
      }
      return 1200 + (randVal % 6800); // 1,200〜8,000
  }
}

/**
 * 名前とモードから決定論的に二つ名診断結果を生成するメイン関数
 */
export function generateDiagnosis(
  rawName: string,
  mode: DiagnosisMode = "standard",
  dateOverride?: string
): DiagnosisResult {
  // 制御文字を除去し、最大32文字に制限（長大文字列によるDoS対策）
  const sanitizedName = rawName.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim().slice(0, 32);
  const cleanName = sanitizedName || "名無しの冒険者";

  // 日付パラメータは YYYYMMDD の8桁数字のみ許可
  const validDateOverride =
    dateOverride && /^\d{8}$/.test(dateOverride) ? dateOverride : undefined;
  const dateStr = mode === "daily" ? (validDateOverride || getTodayDateString()) : undefined;
  const seedInput = mode === "daily" ? `${cleanName}::${dateStr}` : cleanName;

  const seed = fnv1aHash(seedInput);

  const r1 = nextRand(seed, 1);
  const r2 = nextRand(seed, 2);
  const r3 = nextRand(seed, 3);
  const r4 = nextRand(seed, 4);
  const r5 = nextRand(seed, 5);
  const r6 = nextRand(seed, 6);
  const r7 = nextRand(seed, 7);
  const r8 = nextRand(seed, 8);

  // 1. 前半の修飾語
  const prefix = PREFIXES[r1 % PREFIXES.length];

  // 2. 後半の名詞（85% 王道 / 15% シュール・ギャップ）
  const isGap = (r2 % 100) < 15;
  const suffixList = isGap ? GAP_SUFFIXES : COOL_SUFFIXES;
  const suffix = suffixList[r3 % suffixList.length];

  const fullTitle = `${prefix}${suffix}`;

  // 3. レアリティ判定
  const rarity = determineRarity(r4);

  // 4. 推定戦闘力
  const combatPower = calculateCombatPower(rarity, r5, isGap);
  const combatPowerFormatted = combatPower.toLocaleString("ja-JP");

  // 5. 固有スキル & 由来テキスト & 属性
  const skill = SKILLS[r6 % SKILLS.length];
  const flavorText = FLAVOR_TEXTS[r7 % FLAVOR_TEXTS.length];
  const attribute = ATTRIBUTES[r8 % ATTRIBUTES.length];

  // 6. RPGステータス（レアリティ補正つき 15〜100）
  const rarityBonus =
    rarity === "UR" ? 35 : rarity === "SSR" ? 25 : rarity === "SR" ? 15 : rarity === "R" ? 8 : 0;

  const calcStat = (step: number) =>
    Math.min(100, Math.max(18, ((nextRand(seed, step) % 68) + 15 + rarityBonus)));

  return {
    name: cleanName,
    mode,
    dateStr,
    seed,
    prefix,
    suffix,
    fullTitle,
    isGap,
    rarity,
    combatPower,
    combatPowerFormatted,
    skill,
    flavorText,
    stats: {
      mag: calcStat(11),
      chuuni: calcStat(12),
      luck: calcStat(13),
      agility: calcStat(14),
      vitality: calcStat(15),
    },
    attribute,
  };
}

/**
 * レアリティ別のスタイルメタデータ
 */
export const RARITY_META: Record<
  Rarity,
  {
    label: string;
    nameJa: string;
    probability: string;
    badgeBg: string;
    textColor: string;
    borderColor: string;
    glowClass: string;
    isUltraRare: boolean;
  }
> = {
  UR: {
    label: "UR",
    nameJa: "神話級（アルティメットレア）",
    probability: "0.5%",
    badgeBg: "from-fuchsia-500 via-amber-400 to-cyan-400",
    textColor: "text-amber-200",
    borderColor: "border-amber-300",
    glowClass: "ur-rainbow-glow",
    isUltraRare: true,
  },
  SSR: {
    label: "SSR",
    nameJa: "伝説級（ダブルスーパーレア）",
    probability: "4.5%",
    badgeBg: "from-amber-300 via-yellow-500 to-amber-600",
    textColor: "text-amber-300",
    borderColor: "border-amber-400",
    glowClass: "ssr-gold-glow",
    isUltraRare: true,
  },
  SR: {
    label: "SR",
    nameJa: "英雄級（スーパーレア）",
    probability: "20%",
    badgeBg: "from-purple-500 via-indigo-500 to-purple-700",
    textColor: "text-purple-300",
    borderColor: "border-purple-400/70",
    glowClass: "sr-purple-glow",
    isUltraRare: false,
  },
  R: {
    label: "R",
    nameJa: "熟練級（レア）",
    probability: "35%",
    badgeBg: "from-sky-500 via-blue-600 to-sky-700",
    textColor: "text-sky-300",
    borderColor: "border-sky-500/50",
    glowClass: "",
    isUltraRare: false,
  },
  N: {
    label: "N",
    nameJa: "一般級（ノーマル）",
    probability: "40%",
    badgeBg: "from-stone-500 via-stone-600 to-stone-700",
    textColor: "text-stone-300",
    borderColor: "border-amber-700/40",
    glowClass: "",
    isUltraRare: false,
  },
};

/**
 * X（旧Twitter）シェア用テキスト生成
 * 必須フォーマット:
 * 【二つ名診断】〇〇さんの異名は…
 *
 * 『[生成された二つ名]』（レア度：[レアリティ] / 戦闘力：[戦闘力]）
 * 固有スキル：[スキル名]
 *
 * #二つ名メーカー #異名診断
 * [結果用URL]
 */
export function buildXShareText(result: DiagnosisResult): string {
  const modePrefix = result.mode === "daily" ? "【今日の二つ名診断】" : "【二つ名診断】";
  return `${modePrefix}${result.name}さんの異名は…\n\n『${result.fullTitle}』（レア度：${result.rarity} / 戦闘力：${result.combatPowerFormatted}）\n固有スキル：${result.skill.name}\n\n#二つ名メーカー #異名診断`;
}
