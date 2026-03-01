document.addEventListener("DOMContentLoaded", function() {

// ===== 観察情報入力欄 =====
const obsDate = document.getElementById("obsDate");
const obsStartTime = document.getElementById("obsStartTime");
const obsEndTime = document.getElementById("obsEndTime");
const obsPlace = document.getElementById("obsPlace");
const obsWeather = document.getElementById("obsWeather");
const obsObserver = document.getElementById("obsObserver");

// ===== 鳥データ（ここから増やしていく） =====
const birds = [
  {
    family: "カモ科",
    species: [
      { id: 1, name: "リュウキュウガモ" },
      { id: 2, name: "コクガン" },
      { id: 3, name: "アオガン" },
      { id: 4, name: "カナダガン" },
      { id: 5, name: "シジュウカラガン" },
      { id: 6, name: "インドガン" },
      { id: 7, name: "ミカドガン" },
      { id: 8, name: "ハクガン" },
      { id: 9, name: "ハイイロガン" },
      { id: 10, name: "サカツラガン" },
      { id: 11, name: "ヒシクイ" },
      { id: 12, name: "マガン" },
      { id: 13, name: "カリガネ" },
      { id: 14, name: "コブハクチョウ" },
      { id: 15, name: "ナキハクチョウ" },
      { id: 16, name: "コハクチョウ" },
      { id: 17, name: "オオハクチョウ" },
      { id: 18, name: "ツクシガモ" },
      { id: 19, name: "アカツクシガモ" },
      { id: 20, name: "カンムリツクシガモ" },
      { id: 21, name: "オシドリ" },
      { id: 22, name: "ナンキンオシ" },
      { id: 23, name: "トモエガモ" },
      { id: 24, name: "シマアジ" },
      { id: 25, name: "ミカヅキシマアジ" },
      { id: 26, name: "ハシビロガモ" },
      { id: 27, name: "オカヨシガモ" },
      { id: 28, name: "ヨシガモ" },
      { id: 29, name: "ヒドリガモ" },
      { id: 30, name: "アメリカヒドリ" },
      { id: 31, name: "アカノドカルガモ" },
      { id: 32, name: "カルガモ" },
      { id: 33, name: "マガモ" },
      { id: 34, name: "オナガガモ" },
      { id: 35, name: "コガモ" },
      { id: 36, name: "アカハシハジロ" },
      { id: 37, name: "オオホシハジロ" },
      { id: 38, name: "アメリカホシハジロ" },
      { id: 39, name: "ホシハジロ" },
      { id: 40, name: "アカハジロ" },
      { id: 41, name: "メジロガモ" },
      { id: 42, name: "クビワキンクロ" },
      { id: 43, name: "キンクロハジロ" },
      { id: 44, name: "スズガモ" },
      { id: 45, name: "コスズガモ" },
      { id: 46, name: "コケワタガモ" },
      { id: 47, name: "ケワタガモ" },
      { id: 48, name: "シノリガモ" },
      { id: 49, name: "アラナミキンクロ" },
      { id: 50, name: "アメリカビロードキンクロ" },
      { id: 51, name: "ビロードキンクロ" },
      { id: 52, name: "クロガモ" },
      { id: 53, name: "コオリガモ" },
      { id: 54, name: "ヒメハジロ" },
      { id: 55, name: "ホオジロガモ" },
      { id: 56, name: "ミコアイサ" },
      { id: 57, name: "オウギアイサ" },
      { id: 58, name: "カワアイサ" },
      { id: 59, name: "ウミアイサ" },
      { id: 60, name: "コウライアイサ" },
      { id: 61, name: "カモ科sp." }
    ]
  },

  /* ← ★ このカンマが重要！ */

  {
    family: "キジ科",
    species: [
      { id: 62, name: "エゾライチョウ" },
      { id: 63, name: "ライチョウ" },
      { id: 64, name: "ヤマドリ" },
      { id: 65, name: "キジ" },
      { id: 66, name: "ウズラ" },
      { id: 67, name: "キジ科sp." }
    ]
  },
{
  family: "ヨタカ科",
  species: [
    { id: 68, name: "ヨタカ" },
    { id: 1068, name: "ヨタカ科sp." }    
  ]
},
{
  family: "アマツバメ科",
  species: [
    { id: 70, name: "ハリオアマツバメ" },
    { id: 71, name: "クロビタイハリオアマツバメ" },
    { id: 72, name: "アマツバメ" },
    { id: 73, name: "ヒメアマツバメ" },
    { id: 74, name: "アマツバメ科sp." }
  ]
},
{
  family: "ノガン科",
  species: [
    { id: 75, name: "ノガン" },
    { id: 76, name: "ヒメノガン" },
    { id: 77, name: "ノガン科sp." }
  ]
},
{
  family: "カッコウ科",
  species: [
    { id: 78, name: "バンケン" },
    { id: 79, name: "カンムリカッコウ" },
    { id: 80, name: "オニカッコウ" },
    { id: 81, name: "キジカッコウ" },
    { id: 82, name: "ヒメカッコウ" },
    { id: 83, name: "オウチュウカッコウ" },
    { id: 84, name: "オオジュウイチ" },
    { id: 85, name: "ジュウイチ" },
    { id: 86, name: "ホトトギス" },
    { id: 87, name: "セグロカッコウ" },
    { id: 88, name: "ツツドリ" },
    { id: 89, name: "カッコウ" },
    { id: 90, name: "カッコウ科sp." }
  ]
},
{
  family: "サケイ科",
  species: [
    { id: 91, name: "サケイ" },
    { id: 92, name: "サケイ科sp." }
  ]
},
,
{
  family: "ハト科",
  species: [
    { id: 93, name: "ヒメモリバト" },
    { id: 94, name: "カラスバト" },
    { id: 95, name: "オガサワラカラスバト" },
    { id: 96, name: "リュウキュウカラスバト" },
    { id: 97, name: "キジバト" },
    { id: 98, name: "シラコバト" },
    { id: 99, name: "ベニバト" },
    { id: 100, name: "キンバト" },
    { id: 101, name: "アオバト" },
    { id: 102, name: "ズアカアオバト" },
    { id: 103, name: "クロアゴヒメアオバト" },
    { id: 104, name: "ハト科sp." }
  ]
},
{
  family: "クイナ科",
  species: [
    { id: 105, name: "クイナ" },
    { id: 106, name: "ウズラクイナ" },
    { id: 107, name: "ミナミクイナ" },
    { id: 108, name: "ヤンバルクイナ" },
    { id: 109, name: "バン" },
    { id: 110, name: "オオバン" },
    { id: 111, name: "シマクイナ" },
    { id: 112, name: "ヒクイナ" },
    { id: 113, name: "コウライクイナ" },
    { id: 114, name: "ヒメクイナ" },
    { id: 115, name: "オオクイナ" },
    { id: 116, name: "マミジロクイナ" },
    { id: 117, name: "ツルクイナ" },
    { id: 118, name: "シロハラクイナ" },
    { id: 119, name: "クイナ科sp." }
  ]
},
{
  family: "ツル科",
  species: [
    { id: 120, name: "ソデグロヅル" },
    { id: 121, name: "カナダヅル" },
    { id: 122, name: "マナヅル" },
    { id: 123, name: "アネハヅル" },
    { id: 124, name: "タンチョウ" },
    { id: 125, name: "クロヅル" },
    { id: 126, name: "ナベヅル" },
    { id: 127, name: "ツル科sp." }
  ]
},
{
  family: "カイツブリ科",
  species: [
    { id: 128, name: "カイツブリ" },
    { id: 129, name: "アカエリカイツブリ" },
    { id: 130, name: "カンムリカイツブリ" },
    { id: 131, name: "ミミカイツブリ" },
    { id: 132, name: "ハジロカイツブリ" },
    { id: 133, name: "カイツブリ科sp." }
  ]
}
,
{
  family: "ミフウズラ科",
  species: [
    { id: 138, name: "ミフウズラ" },
    { id: 139, name: "ミフウズラ科sp." }
  ]
},
{
  family: "ミヤコドリ科",
  species: [
    { id: 140, name: "ミヤコドリ" },
    { id: 141, name: "ミヤコドリ科sp." }
  ]
},
{
  family: "セイタカシギ科",
  species: [
    { id: 142, name: "セイタカシギ" },
    { id: 143, name: "オーストラリアセイタカシギ" },
    { id: 144, name: "ソリハシセイタカシギ" },
    { id: 145, name: "セイタカシギ科sp." }
  ]
},
{
  family: "チドリ科",
  species: [
    { id: 146, name: "タゲリ" },
    { id: 147, name: "ケリ" },
    { id: 148, name: "ヨーロッパムナグロ" },
    { id: 149, name: "ムナグロ" },
    { id: 150, name: "ダイゼン" },
    { id: 151, name: "ハジロコチドリ" },
    { id: 152, name: "ミズカキチドリ" },
    { id: 153, name: "イカルチドリ" },
    { id: 154, name: "コチドリ" },
    { id: 155, name: "シロチドリ" },
    { id: 156, name: "オオメダイチドリ" },
    { id: 157, name: "メダイチドリ" },
    { id: 158, name: "オオチドリ" },
    { id: 159, name: "コバシチドリ" },
    { id: 160, name: "チドリ科sp." }
  ]
},
{
  family: "タマシギ科",
  species: [
    { id: 161, name: "タマシギ" },
    { id: 162, name: "タマシギ科sp." }
  ]
},
{
  family: "レンカク科",
  species: [
    { id: 163, name: "レンカク" },
    { id: 164, name: "レンカク科sp." }
  ]
},
{
  family: "シギ科",
  species: [
    { id: 165, name: "ハリモモチュウシャク" },
    { id: 166, name: "チュウシャクシギ" },
    { id: 167, name: "コシャクシギ" },
    { id: 168, name: "ホウロクシギ" },
    { id: 169, name: "シロハラチュウシャクシギ" },
    { id: 170, name: "ダイシャクシギ" },
    { id: 171, name: "オオソリハシシギ" },
    { id: 172, name: "オグロシギ" },
    { id: 173, name: "アメリカオグロシギ" },
    { id: 174, name: "キョウジョシギ" },
    { id: 175, name: "オバシギ" },
    { id: 176, name: "コオバシギ" },
    { id: 177, name: "エリマキシギ" },
    { id: 178, name: "キリアイ" },
    { id: 179, name: "ウズラシギ" },
    { id: 180, name: "アシナガシギ" },
    { id: 181, name: "サルハマシギ" },
    { id: 182, name: "オジロトウネン" },
    { id: 183, name: "ヒバリシギ" },
    { id: 184, name: "ヘラシギ" },
    { id: 185, name: "トウネン" },
    { id: 186, name: "ミユビシギ" },
    { id: 187, name: "ハマシギ" },
    { id: 188, name: "チシマシギ" },
    { id: 189, name: "ヒメウズラシギ" },
    { id: 190, name: "ヨーロッパトウネン" },
    { id: 191, name: "コシジロウズラシギ" },
    { id: 192, name: "コモンシギ" },
    { id: 193, name: "アメリカウズラシギ" },
    { id: 194, name: "ヒメハマシギ" },
    { id: 195, name: "シベリアオオハシシギ" },
    { id: 196, name: "オオハシシギ" },
    { id: 197, name: "アメリカオオハシシギ" },
    { id: 198, name: "ヤマシギ" },
    { id: 199, name: "アマミヤマシギ" },
    { id: 200, name: "コシギ" },
    { id: 201, name: "アオシギ" },
    { id: 202, name: "オオジシギ" },
    { id: 203, name: "ハリオシギ" },
    { id: 204, name: "チュウジシギ" },
    { id: 205, name: "タシギ" },
    { id: 206, name: "ソリハシシギ" },
    { id: 207, name: "アメリカヒレアシシギ" },
    { id: 208, name: "アカエリヒレアシシギ" },
    { id: 209, name: "ハイイロヒレアシシギ" },
    { id: 210, name: "イソシギ" },
    { id: 211, name: "アメリカイソシギ" },
    { id: 212, name: "クサシギ" },
    { id: 213, name: "メリケンキアシシギ" },
    { id: 214, name: "キアシシギ" },
    { id: 215, name: "コキアシシギ" },
    { id: 216, name: "アカアシシギ" },
    { id: 217, name: "コアオアシシギ" },
    { id: 218, name: "タカブシギ" },
    { id: 219, name: "ツルシギ" },
    { id: 220, name: "アオアシシギ" },
    { id: 221, name: "カラフトアオアシシギ" },
    { id: 222, name: "オオキアシシギ" },
    { id: 223, name: "シギ科sp." }
  ]
}
,
{
  family: "ツバメチドリ科",
  species: [
    { id: 224, name: "ツバメチドリ" },
    { id: 225, name: "ツバメチドリ科sp." }
  ]
},
{
  family: "カモメ科",
  species: [
    { id: 226, name: "クロアジサシ" },
    { id: 227, name: "ヒメクロアジサシ" },
    { id: 228, name: "ハイイロアジサシ" },
    { id: 229, name: "シロアジサシ" },
    { id: 230, name: "ミツユビカモメ" },
    { id: 231, name: "アカアシミツユビカモメ" },
    { id: 232, name: "ゾウゲカモメ" },
    { id: 233, name: "クビワカモメ" },
    { id: 234, name: "ハシボソカモメ" },
    { id: 235, name: "ボナパルトカモメ" },
    { id: 236, name: "チャガシラカモメ" },
    { id: 237, name: "ユリカモメ" },
    { id: 238, name: "ズグロカモメ" },
    { id: 239, name: "ヒメカモメ" },
    { id: 240, name: "ヒメクビワカモメ" },
    { id: 241, name: "ワライカモメ" },
    { id: 242, name: "アメリカズグロカモメ" },
    { id: 243, name: "ゴビズキンカモメ" },
    { id: 244, name: "オオズグロカモメ" },
    { id: 245, name: "ウミネコ" },
    { id: 246, name: "カモメ" },
    { id: 247, name: "ワシカモメ" },
    { id: 248, name: "シロカモメ" },
    { id: 249, name: "アイスランドカモメ" },
    { id: 250, name: "セグロカモメ" },
    { id: 251, name: "オオセグロカモメ" },
    { id: 252, name: "ニシセグロカモメ" },
    { id: 253, name: "ハシブトアジサシ" },
    { id: 254, name: "オニアジサシ" },
    { id: 255, name: "オオアジサシ" },
    { id: 256, name: "ベンガルアジサシ" },
    { id: 257, name: "コアジサシ" },
    { id: 258, name: "アメリカコアジサシ" },
    { id: 259, name: "コシジロアジサシ" },
    { id: 260, name: "ナンヨウマミジロアジサシ" },
    { id: 261, name: "マミジロアジサシ" },
    { id: 262, name: "セグロアジサシ" },
    { id: 263, name: "ベニアジサシ" },
    { id: 264, name: "エリグロアジサシ" },
    { id: 265, name: "アジサシ" },
    { id: 266, name: "キョクアジサシ" },
    { id: 267, name: "クロハラアジサシ" },
    { id: 268, name: "ハジロクロハラアジサシ" },
    { id: 269, name: "ハシグロクロハラアジサシ" },
    { id: 270, name: "カモメ科sp." }
  ]
},
{
  family: "トウゾクカモメ科",
  species: [
    { id: 271, name: "オオトウゾクカモメ" },
    { id: 272, name: "トウゾクカモメ" },
    { id: 273, name: "クロトウゾクカモメ" },
    { id: 274, name: "シロハラトウゾクカモメ" },
    { id: 275, name: "トウゾクカモメ科sp." }
  ]
},
{
  family: "ウミスズメ科",
  species: [
    { id: 276, name: "ヒメウミスズメ" },
    { id: 277, name: "ハシブトウミガラス" },
    { id: 278, name: "ウミガラス" },
    { id: 279, name: "ウミバト" },
    { id: 280, name: "ケイマフリ" },
    { id: 281, name: "マダラウミスズメ" },
    { id: 282, name: "ウミスズメ" },
    { id: 283, name: "カンムリウミスズメ" },
    { id: 284, name: "アメリカウミスズメ" },
    { id: 285, name: "ウミオウム" },
    { id: 286, name: "コウミスズメ" },
    { id: 287, name: "シラヒゲウミスズメ" },
    { id: 288, name: "エトロフウミスズメ" },
    { id: 289, name: "ウトウ" },
    { id: 290, name: "ツノメドリ" },
    { id: 291, name: "エトピリカ" },
    { id: 292, name: "ウミスズメ科sp." }
  ]
},
{
  family: "ネッタイチョウ科",
  species: [
    { id: 293, name: "アカオネッタイチョウ" },
    { id: 294, name: "シラオネッタイチョウ" },
    { id: 295, name: "ネッタイチョウ科sp." }
  ]
},
{
  family: "アビ科",
  species: [
    { id: 296, name: "アビ" },
    { id: 297, name: "オオハム" },
    { id: 298, name: "シロエリオオハム" },
    { id: 299, name: "ハシグロアビ" },
    { id: 300, name: "ハシジロアビ" },
    { id: 301, name: "アビ科sp." }
  ]
},
{
  family: "アシナガウミツバメ科",
  species: [
    { id: 302, name: "アシナガウミツバメ" },
    { id: 303, name: "アシナガウミツバメ科sp." }
  ]
},
{
  family: "アホウドリ科",
  species: [
    { id: 304, name: "コアホウドリ" },
    { id: 305, name: "クロアシアホウドリ" },
    { id: 306, name: "アホウドリ" },
    { id: 307, name: "アホウドリ科sp." }
  ]
},
{
  family: "ウミツバメ科",
  species: [
    { id: 308, name: "ハイイロウミツバメ" },
    { id: 309, name: "ヒメクロウミツバメ" },
    { id: 310, name: "クロウミツバメ" },
    { id: 311, name: "コシジロウミツバメ" },
    { id: 312, name: "クロコシジロウミツバメ" },
    { id: 313, name: "オーストンウミツバメ" },
    { id: 314, name: "ウミツバメ科sp." }
  ]
},
{
  family: "ミズナギドリ科",
  species: [
    { id: 315, name: "フルマカモメ" },
    { id: 316, name: "ハジロミズナギドリ" },
    { id: 317, name: "オオシロハラミズナギドリ" },
    { id: 318, name: "カワリシロハラミズナギドリ" },
    { id: 319, name: "ハワイシロハラミズナギドリ" },
    { id: 320, name: "マダラシロハラミズナギドリ" },
    { id: 321, name: "クビワオオシロハラミズナギドリ" },
    { id: 322, name: "ハグロシロハラミズナギドリ" },
    { id: 323, name: "シロハラミズナギドリ" },
    { id: 324, name: "ヒメシロハラミズナギドリ" },
    { id: 325, name: "オオミズナギドリ" },
    { id: 326, name: "オナガミズナギドリ" },
    { id: 327, name: "ミナミオナガミズナギドリ" },
    { id: 328, name: "ハイイロミズナギドリ" },
    { id: 329, name: "ハシボソミズナギドリ" },
    { id: 330, name: "シロハラアカアシミズナギドリ" },
    { id: 331, name: "アカアシミズナギドリ" },
    { id: 332, name: "コミズナギドリ" },
    { id: 333, name: "オガサワラヒメミズナギドリ" },
    { id: 334, name: "ハワイセグロミズナギドリ" },
    { id: 335, name: "オガサワラミズナギドリ" },
    { id: 336, name: "アナドリ" },
    { id: 337, name: "ミズナギドリ科sp." }
  ]
},
{
  family: "コウノトリ科",
  species: [
    { id: 338, name: "ナベコウ" },
    { id: 339, name: "コウノトリ" },
    { id: 340, name: "コウノトリ科sp." }
  ]
},
{
  family: "グンカンドリ科",
  species: [
    { id: 341, name: "オオグンカンドリ" },
    { id: 342, name: "コグンカンドリ" },
    { id: 343, name: "グンカンドリ科sp." }
  ]
},
{
  family: "カツオドリ科",
  species: [
    { id: 344, name: "アオツラカツオドリ" },
    { id: 345, name: "アカアシカツオドリ" },
    { id: 346, name: "カツオドリ" },
    { id: 347, name: "カツオドリ科sp." }
  ]
},
{
  family: "ウ科",
  species: [
    { id: 348, name: "チシマウガラス" },
    { id: 349, name: "ヒメウ" },
    { id: 350, name: "ウミウ" },
    { id: 351, name: "カワウ" },
    { id: 800, name: "ウ科sp." }
  ]
},
{
  family: "トキ科",
  species: [
    { id: 352, name: "クロトキ" },
    { id: 353, name: "トキ" },
    { id: 354, name: "ブロンズトキ" },
    { id: 355, name: "ヘラサギ" },
    { id: 356, name: "クロツラヘラサギ" },
    { id: 357, name: "トキ科sp." }
  ]
},
{
  family: "サギ科",
  species: [
    { id: 358, name: "サンカノゴイ" },
    { id: 359, name: "ヨシゴイ" },
    { id: 360, name: "オオヨシゴイ" },
    { id: 361, name: "リュウキュウヨシゴイ" },
    { id: 362, name: "タカサゴクロサギ" },
    { id: 363, name: "ミゾゴイ" },
    { id: 364, name: "ズグロミゾゴイ" },
    { id: 365, name: "ゴイサギ" },
    { id: 366, name: "ハシブトゴイ" },
    { id: 367, name: "ササゴイ" },
    { id: 368, name: "アカガシラサギ" },
    { id: 369, name: "アマサギ" },
    { id: 370, name: "アオサギ" },
    { id: 371, name: "ムラサキサギ" },
    { id: 372, name: "ダイサギ" },
    { id: 373, name: "チュウサギ" },
    { id: 374, name: "コサギ" },
    { id: 375, name: "クロサギ" },
    { id: 376, name: "カラシラサギ" },
    { id: 377, name: "サギ科sp." }
  ]
},
{
  family: "ペリカン科",
  species: [
    { id: 378, name: "モモイロペリカン" },
    { id: 379, name: "ホシバシペリカン" },
    { id: 380, name: "ハイイロペリカン" },
    { id: 381, name: "ペリカン科sp." }
  ]
},
{
  family: "ミサゴ科",
  species: [
    { id: 382, name: "ミサゴ" },
    { id: 383, name: "ミサゴ科sp." }
  ]
},
{
  family: "タカ科",
  species: [
    { id: 384, name: "ハチクマ" },
    { id: 385, name: "クロハゲワシ" },
    { id: 386, name: "カンムリワシ" },
    { id: 387, name: "クマタカ" },
    { id: 388, name: "カラフトワシ" },
    { id: 389, name: "カタシロワシ" },
    { id: 390, name: "イヌワシ" },
    { id: 391, name: "アカハラダカ" },
    { id: 392, name: "ツミ" },
    { id: 393, name: "ハイタカ" },
    { id: 394, name: "オオタカ" },
    { id: 395, name: "チュウヒ" },
    { id: 396, name: "ハイイロチュウヒ" },
    { id: 397, name: "アメリカハイイロチュウヒ" },
    { id: 398, name: "マダラチュウヒ" },
    { id: 399, name: "トビ" },
    { id: 400, name: "オオワシ" },
    { id: 401, name: "オジロワシ" },
    { id: 402, name: "ハクトウワシ" },
    { id: 403, name: "サシバ" },
    { id: 404, name: "ケアシノスリ" },
    { id: 405, name: "オオノスリ" },
    { id: 406, name: "ノスリ" },
    { id: 407, name: "タカ科sp." }
  ]
},
{
  family: "フクロウ科",
  species: [
    { id: 408, name: "アオバズク" },
    { id: 409, name: "キンメフクロウ" },
    { id: 410, name: "コノハズク" },
    { id: 411, name: "リュウキュウコノハズク" },
    { id: 412, name: "オオコノハズク" },
    { id: 413, name: "トラフズク" },
    { id: 414, name: "コミミズク" },
    { id: 415, name: "シロフクロウ" },
    { id: 416, name: "ワシミミズク" },
    { id: 417, name: "シマフクロウ" },
    { id: 418, name: "フクロウ" },
    { id: 419, name: "フクロウ科sp." }
  ]
},
{
  family: "ヤツガシラ科",
  species: [
    { id: 420, name: "ヤツガシラ" },
    { id: 421, name: "ヤツガシラ科sp." }
  ]
},
{
  family: "ブッポウソウ科",
  species: [
    { id: 422, name: "ブッポウソウ" },
    { id: 423, name: "ブッポウソウ科sp." }
  ]
},
{
  family: "カワセミ科",
  species: [
    { id: 424, name: "アカショウビン" },
    { id: 425, name: "ヤマショウビン" },
    { id: 426, name: "ナンヨウショウビン" },
    { id: 427, name: "ミヤコショウビン" },
    { id: 428, name: "カワセミ" },
    { id: 429, name: "ミツユビカワセミ" },
    { id: 430, name: "ヤマセミ" },
    { id: 431, name: "カワセミ科sp." }
  ]
},
{
  family: "ハチクイ科",
  species: [
    { id: 432, name: "ルリオハチクイ" },
    { id: 433, name: "ハチクイ" },
    { id: 434, name: "ハチクイ科sp." }
  ]
},
{
  family: "キツツキ科",
  species: [
    { id: 435, name: "アリスイ" },
    { id: 436, name: "コゲラ" },
    { id: 437, name: "ミユビゲラ" },
    { id: 438, name: "コアカゲラ" },
    { id: 439, name: "チャバラアカゲラ" },
    { id: 440, name: "アカゲラ" },
    { id: 441, name: "ノグチゲラ" },
    { id: 442, name: "オオアカゲラ" },
    { id: 443, name: "キタタキ" },
    { id: 444, name: "クマゲラ" },
    { id: 445, name: "アオゲラ" },
    { id: 446, name: "ヤマゲラ" },
    { id: 447, name: "キツツキ科sp." }
  ]
},
{
  family: "ハヤブサ科",
  species: [
    { id: 448, name: "ヒメチョウゲンボウ" },
    { id: 449, name: "チョウゲンボウ" },
    { id: 450, name: "アカアシチョウゲンボウ" },
    { id: 451, name: "コチョウゲンボウ" },
    { id: 452, name: "チゴハヤブサ" },
    { id: 453, name: "シロハヤブサ" },
    { id: 454, name: "ハヤブサ" },
    { id: 455, name: "ハヤブサ科sp." }
  ]
},
{
  family: "ヤイロチョウ科",
  species: [
    { id: 456, name: "ズグロヤイロチョウ" },
    { id: 457, name: "ヤイロチョウ" },
    { id: 458, name: "ヤイロチョウ科sp." }
  ]
},
{
  family: "モリツバメ科",
  species: [
    { id: 459, name: "モリツバメ" },
    { id: 460, name: "モリツバメ科sp." }
  ]
},
{
  family: "サンショウクイ科",
  species: [
    { id: 461, name: "サンショウクイ" },
    { id: 462, name: "リュウキュウサンショウクイ" },
    { id: 463, name: "アサクラサンショウクイ" },
    { id: 464, name: "サンショウクイ科sp." }
  ]
},
{
  family: "コウライウグイス科",
  species: [
    { id: 465, name: "コウライウグイス" },
    { id: 466, name: "コウライウグイス科sp." }
  ]
},
{
  family: "オウチュウ科",
  species: [
    { id: 467, name: "カンムリオウチュウ" },
    { id: 468, name: "ハイイロオウチュウ" },
    { id: 469, name: "オウチュウ" },
    { id: 470, name: "オウチュウ科sp." }
  ]
},
{
  family: "カササギヒタキ科",
  species: [
    { id: 471, name: "クロエリヒタキ" },
    { id: 472, name: "サンコウチョウ" },
    { id: 473, name: "カササギヒタキ科sp." }
  ]
},
{
  family: "モズ科",
  species: [
    { id: 474, name: "オオカラモズ" },
    { id: 475, name: "オオモズ" },
    { id: 476, name: "チゴモズ" },
    { id: 477, name: "セアカモズ" },
    { id: 478, name: "アカモズ" },
    { id: 479, name: "モズ" },
    { id: 480, name: "タカサゴモズ" },
    { id: 481, name: "モズ科sp." }
  ]
},
{
  family: "カラス科",
  species: [
    { id: 482, name: "カケス" },
    { id: 483, name: "ルリカケス" },
    { id: 484, name: "オナガ" },
    { id: 485, name: "カササギ" },
    { id: 486, name: "ホシガラス" },
    { id: 487, name: "ニシコクマルガラス" },
    { id: 488, name: "コクマルガラス" },
    { id: 489, name: "ミヤマガラス" },
    { id: 490, name: "ハシボソガラス" },
    { id: 491, name: "ハシブトガラス" },
    { id: 492, name: "ワタリガラス" },
    { id: 493, name: "カラス科sp." }
  ]
},
{
  family: "レンジャク科",
  species: [
    { id: 494, name: "キレンジャク" },
    { id: 495, name: "ヒレンジャク" },
    { id: 496, name: "レンジャク科sp." }
  ]
},
{
  family: "シジュウカラ科",
  species: [
    { id: 497, name: "ヒガラ" },
    { id: 498, name: "キバラガラ" },
    { id: 499, name: "ヤマガラ" },
    { id: 500, name: "オリイヤマガラ" },
    { id: 501, name: "ハシブトガラ" },
    { id: 502, name: "コガラ" },
    { id: 503, name: "ルリガラ" },
    { id: 504, name: "シジュウカラ" },
    { id: 505, name: "シジュウカラ科sp." }
  ]
},
{
  family: "ツリスガラ科",
  species: [
    { id: 506, name: "ツリスガラ" },
    { id: 507, name: "ツリスガラ科sp." }
  ]
},
{
  family: "ヒゲガラ科",
  species: [
    { id: 508, name: "ヒゲガラ" },
    { id: 509, name: "ヒゲガラ科sp." }
  ]
},
{
  family: "ヒバリ科",
  species: [
    { id: 510, name: "ツリスガラ" },
    { id: 511, name: "ヒゲガラ" },
    { id: 512, name: "ヒバリ" },
    { id: 513, name: "ハマヒバリ" },
    { id: 514, name: "ヒメコウテンシ" },
    { id: 515, name: "クビワコウテンシ" },
    { id: 516, name: "コウテンシ" },
    { id: 517, name: "コヒバリ" },
    { id: 518, name: "ヒバリ科sp." }
  ]
},
{
  family: "ヒヨドリ科",
  species: [
    { id: 519, name: "ヒヨドリ" },
    { id: 520, name: "シロガシラ" },
    { id: 521, name: "ヒヨドリ科sp." }
  ]
},
{
  family: "ツバメ科",
  species: [
    { id: 522, name: "ショウドウツバメ" },
    { id: 523, name: "タイワンショウドウツバメ" },
    { id: 524, name: "リュウキュウツバメ" },
    { id: 525, name: "ツバメ" },
    { id: 526, name: "イワツバメ" },
    { id: 527, name: "コシアカツバメ" },
    { id: 528, name: "ツバメ科sp." }
  ]
},
{
  family: "ウグイス科",
  species: [
    { id: 529, name: "ウグイス" },
    { id: 530, name: "チョウセンウグイス" },
    { id: 531, name: "ヤブサメ" },
    { id: 532, name: "ウグイス科sp." }
  ]
},
{
  family: "エナガ科",
  species: [
    { id: 533, name: "エナガ" },
    { id: 534, name: "エナガ科sp." }
  ]
},
{
  family: "ムシクイ科",
  species: [
    { id: 535, name: "モリムシクイ" },
    { id: 536, name: "キマユムシクイ" },
    { id: 537, name: "シセンムシクイ" },
    { id: 538, name: "カラフトムシクイ" },
    { id: 539, name: "カラフトムジセッカ" },
    { id: 540, name: "ムジセッカ" },
    { id: 541, name: "キタヤナギムシクイ" },
    { id: 542, name: "チフチャフ" },
    { id: 543, name: "センダイムシクイ" },
    { id: 544, name: "イイジマムシクイ" },
    { id: 545, name: "ヤナギムシクイ" },
    { id: 546, name: "エゾムシクイ" },
    { id: 547, name: "アムールムシクイ" },
    { id: 548, name: "メボソムシクイ" },
    { id: 549, name: "オオムシクイ" },
    { id: 550, name: "コムシクイ" },
    { id: 551, name: "ムシクイ科sp." }
  ]
},
{
  family: "ヨシキリ科",
  species: [
    { id: 552, name: "オオヨシキリ" },
    { id: 553, name: "コヨシキリ" },
    { id: 554, name: "スゲヨシキリ" },
    { id: 555, name: "マンシュウイナダヨシキリ" },
    { id: 556, name: "ヤブヨシキリ" },
    { id: 557, name: "ハシブトオオヨシキリ" },
    { id: 558, name: "ヒメウタイムシクイ" },
    { id: 559, name: "ヨシキリ科sp." }
  ]
}
,
{
  family: "センニュウ科",
  species: [
    { id: 560, name: "エゾセンニュウ" },
    { id: 561, name: "オオセッカ" },
    { id: 562, name: "シベリアセンニュウ" },
    { id: 563, name: "シマセンニュウ" },
    { id: 564, name: "ウチヤマセンニュウ" },
    { id: 565, name: "マキノセンニュウ" },
    { id: 566, name: "センニュウ科sp." }
  ]
},
{
  family: "セッカ科",
  species: [
    { id: 567, name: "セッカ" },
    { id: 568, name: "セッカ科sp." }
  ]
},
{
  family: "ズグロムシクイ科",
  species: [
    { id: 569, name: "コノドジロムシクイ" },
    { id: 570, name: "ズグロムシクイ科sp." }
  ]
},
{
  family: "メジロ科",
  species: [
    { id: 571, name: "メグロ" },
    { id: 572, name: "チョウセンメジロ" },
    { id: 573, name: "メジロ" },
    { id: 574, name: "メジロ科sp." }
  ]
},
{
  family: "キクイタダキ科",
  species: [
    { id: 575, name: "キクイタダキ" },
    { id: 576, name: "キクイタダキ科sp." }
  ]
},
{
  family: "ミソサザイ科",
  species: [
    { id: 577, name: "ミソサザイ" },
    { id: 578, name: "ミソサザイ科sp." }
  ]
},
{
  family: "ゴジュウカラ科",
  species: [
    { id: 579, name: "ゴジュウカラ" },
    { id: 580, name: "ゴジュウカラ科sp." }
  ]
},
{
  family: "キバシリ科",
  species: [
    { id: 581, name: "キバシリ" },
    { id: 582, name: "キバシリ科sp." }
  ]
},
{
  family: "ムクドリ科",
  species: [
    { id: 583, name: "ギンムクドリ" },
    { id: 584, name: "ムクドリ" },
    { id: 585, name: "シベリアムクドリ" },
    { id: 586, name: "コムクドリ" },
    { id: 587, name: "カラムクドリ" },
    { id: 588, name: "バライロムクドリ" },
    { id: 589, name: "ホシムクドリ" },
    { id: 590, name: "ムクドリ科sp." }
  ]
},
{
  family: "ツグミ科",
  species: [
    { id: 591, name: "ハイイロチャツグミ" },
    { id: 592, name: "トラツグミ" },
    { id: 593, name: "ミナミトラツグミ" },
    { id: 594, name: "オガサワラガビチョウ" },
    { id: 595, name: "マミジロ" },
    { id: 596, name: "オレンジジツグミ" },
    { id: 597, name: "ウタツグミ" },
    { id: 598, name: "ヤドリギツグミ" },
    { id: 599, name: "クロウタドリ（和名検討中）" },
    { id: 600, name: "ワキアカツグミ" },
    { id: 601, name: "クロツグミ" },
    { id: 602, name: "カラアカハラ" },
    { id: 603, name: "マミチャジナイ" },
    { id: 604, name: "シロハラ" },
    { id: 605, name: "アカハラ" },
    { id: 606, name: "アカコッコ" },
    { id: 607, name: "ノハラツグミ" },
    { id: 608, name: "ノドグロツグミ" },
    { id: 609, name: "ツグミ" },
    { id: 610, name: "ハチジョウツグミ" },
    { id: 611, name: "ツグミ科sp." }
  ]
},
{
  family: "ヒタキ科",
  species: [
    { id: 612, name: "エゾビタキ" },
    { id: 613, name: "サメビタキ" },
    { id: 614, name: "ミヤマヒタキ" },
    { id: 615, name: "チャムネサメビタキ" },
    { id: 616, name: "コサメビタキ" },
    { id: 617, name: "ムナフヒタキ" },
    { id: 618, name: "オオルリ" },
    { id: 619, name: "ロクショウヒタキ" },
    { id: 620, name: "ヨーロッパコマドリ" },
    { id: 621, name: "オガワコマドリ" },
    { id: 622, name: "ノゴマ" },
    { id: 623, name: "コルリ" },
    { id: 624, name: "コマドリ" },
    { id: 625, name: "アカヒゲ" },
    { id: 626, name: "ホントウアカヒゲ" },
    { id: 627, name: "シマゴマ" },
    { id: 628, name: "マミジロキビタキ" },
    { id: 629, name: "キビタキ" },
    { id: 630, name: "リュウキュウキビタキ" },
    { id: 631, name: "ムギマキ" },
    { id: 632, name: "ニシオジロビタキ" },
    { id: 633, name: "オジロビタキ" },
    { id: 634, name: "マダラヒタキ" },
    { id: 635, name: "ルリビタキ" },
    { id: 636, name: "セアカジョウビタキ" },
    { id: 637, name: "カワビタキ" },
    { id: 638, name: "クロジョウビタキ" },
    { id: 639, name: "シロビタイジョウビタキ" },
    { id: 640, name: "ジョウビタキ" },
    { id: 641, name: "ヒメイソヒヨ" },
    { id: 642, name: "コシジロイソヒヨドリ" },
    { id: 643, name: "イソヒヨドリ" },
    { id: 644, name: "ヤマザキヒタキ" },
    { id: 645, name: "マミジロノビタキ" },
    { id: 646, name: "クロノビタキ" },
    { id: 647, name: "ノビタキ" },
    { id: 648, name: "ハシグロヒタキ" },
    { id: 649, name: "イナバヒタキ" },
    { id: 650, name: "サバクヒタキ" },
    { id: 651, name: "セグロサバクヒタキ" },
    { id: 652, name: "ヒタキ科sp." }
  ]
},
{
  family: "カワガラス科",
  species: [
    { id: 653, name: "カワガラス" },
    { id: 654, name: "カワガラス科sp." }
  ]
},
{
  family: "スズメ科",
  species: [
    { id: 655, name: "ニュウナイスズメ" },
    { id: 656, name: "スズメ" },
    { id: 657, name: "イエスズメ" },
    { id: 658, name: "スズメ科sp." }
  ]
},
{
  family: "イワヒバリ科",
  species: [
    { id: 659, name: "イワヒバリ" },
    { id: 660, name: "ヤマヒバリ" },
    { id: 661, name: "カヤクグリ" },
    { id: 662, name: "イワヒバリ科sp." }
  ]
},
{
  family: "セキレイ科",
  species: [
    { id: 663, name: "イワミセキレイ" },
    { id: 664, name: "ニシツメナガセキレイ" },
    { id: 665, name: "ツメナガセキレイ" },
    { id: 666, name: "キガシラセキレイ" },
    { id: 667, name: "キセキレイ" },
    { id: 668, name: "ハクセキレイ" },
    { id: 669, name: "セグロセキレイ" },
    { id: 670, name: "マミジロタヒバリ" },
    { id: 671, name: "コマミジロタヒバリ" },
    { id: 672, name: "マキバタヒバリ" },
    { id: 673, name: "ヨーロッパビンズイ" },
    { id: 674, name: "ビンズイ" },
    { id: 675, name: "セジロタヒバリ" },
    { id: 676, name: "ウスベニタヒバリ" },
    { id: 677, name: "ムネアカタヒバリ" },
    { id: 678, name: "タヒバリ" },
    { id: 679, name: "セキレイ科sp." }
  ]
},
{
  family: "アトリ科",
  species: [
    { id: 680, name: "ズアオアトリ" },
    { id: 681, name: "アトリ" },
    { id: 682, name: "シメ" },
    { id: 683, name: "コイカル" },
    { id: 684, name: "イカル" },
    { id: 685, name: "ギンザンマシコ" },
    { id: 686, name: "ウソ" },
    { id: 687, name: "ハギマシコ" },
    { id: 688, name: "アカマシコ" },
    { id: 689, name: "オガサワラマシコ" },
    { id: 690, name: "ベニマシコ" },
    { id: 691, name: "オオマシコ" },
    { id: 692, name: "カワラヒワ" },
    { id: 693, name: "オガサワラカワラヒワ" },
    { id: 694, name: "ベニヒワ" },
    { id: 695, name: "イスカ" },
    { id: 696, name: "ナキイスカ" },
    { id: 697, name: "マヒワ" },
    { id: 698, name: "アトリ科sp." }
  ]
},
{
  family: "ツメナガホオジロ科",
  species: [
    { id: 699, name: "ツメナガホオジロ" },
    { id: 700, name: "ユキホオジロ" },
    { id: 701, name: "ツメナガホオジロ科sp." }
  ]
},
{
  family: "ホオジロ科",
  species: [
    { id: 702, name: "キアオジ" },
    { id: 703, name: "シラガホオジロ" },
    { id: 704, name: "ホオジロ" },
    { id: 705, name: "イワバホオジロ" },
    { id: 706, name: "ズアオホオジロ" },
    { id: 707, name: "シロハラホオジロ" },
    { id: 708, name: "ホオアカ" },
    { id: 709, name: "コホオアカ" },
    { id: 710, name: "キマユホオジロ" },
    { id: 711, name: "カシラダカ" },
    { id: 712, name: "ミヤマホオジロ" },
    { id: 713, name: "シマアオジ" },
    { id: 714, name: "シマノジコ" },
    { id: 715, name: "ズグロチャキンチョウ" },
    { id: 716, name: "チャキンチョウ" },
    { id: 717, name: "ノジコ" },
    { id: 718, name: "シベリアアオジ" },
    { id: 719, name: "アオジ" },
    { id: 720, name: "クロジ" },
    { id: 721, name: "シベリアジュリン" },
    { id: 722, name: "コジュリン" },
    { id: 723, name: "オオジュリン" },
    { id: 724, name: "ホオジロ科sp." }
  ]
},
{
  family: "ゴマフスズメ科",
  species: [
    { id: 725, name: "ゴマフスズメ" },
    { id: 726, name: "ミヤマシトド" },
    { id: 727, name: "キガシラシトド" },
    { id: 728, name: "サバンナシトド" },
    { id: 729, name: "ウタスズメ" },
    { id: 730, name: "ゴマフスズメ科sp." }
  ]
},
{
  family: "アメリカムシクイ科",
  species: [
    { id: 731, name: "カオグロアメリカムシクイ" },
    { id: 732, name: "キヅタアメリカムシクイ" },
    { id: 733, name: "アメリカムシクイ科sp." }
  ]
},
{
  family: "外来種",
  species: [
    { id: 734, name: "カナダガン", alien: true  },
    { id: 735, name: "コクチョウ", alien: true },
    { id: 736, name: "コブハクチョウ", alien: true },
    { id: 737, name: "コリンウズラ", alien: true },
    { id: 738, name: "ヤマドリ", alien: true },
    { id: 739, name: "タイリクキジ", alien: true },
    { id: 740, name: "キジ", alien: true },
    { id: 741, name: "インドクジャク", alien: true },
    { id: 742, name: "コジュケイ", alien: true },
    { id: 743, name: "テッケイ", alien: true },
    { id: 744, name: "ドバト", alien: true },
    { id: 745, name: "シラコバト", alien: true },
    { id: 746, name: "クロエリセイタカシギ", alien: true },
    { id: 747, name: "コウノトリ", alien: true },
    { id: 748, name: "トキ", alien: true },
    { id: 749, name: "オキナインコ", alien: true },
    { id: 750, name: "ダルマインコ", alien: true },
    { id: 751, name: "オオホンセイインコ", alien: true },
    { id: 752, name: "ホンセイインコ", alien: true },
    { id: 753, name: "セキセイインコ", alien: true },
    { id: 754, name: "ヤマムスメ", alien: true },
    { id: 755, name: "サンジャク", alien: true },
    { id: 756, name: "カササギ", alien: true },
    { id: 757, name: "メジロ", alien: true },
    { id: 758, name: "ソウシチョウ", alien: true },
    { id: 759, name: "ガビチョウ", alien: true },
    { id: 760, name: "ヒゲガビチョウ", alien: true },
    { id: 761, name: "カオジロガビチョウ", alien: true },
    { id: 762, name: "カオグロガビチョウ", alien: true },
    { id: 763, name: "ハッカチョウ", alien: true },
    { id: 764, name: "ジャワハッカ", alien: true },
    { id: 765, name: "ハイイロハッカ", alien: true },
    { id: 766, name: "インドハッカ", alien: true },
    { id: 767, name: "ホオジロムクドリ", alien: true },
    { id: 768, name: "メンハタオリドリ", alien: true },
    { id: 769, name: "オオキンランチョウ", alien: true },
    { id: 770, name: "ブンチョウ", alien: true },
    { id: 771, name: "シマキンパラ", alien: true },
    { id: 772, name: "コシジロキンパラ", alien: true },
    { id: 773, name: "ギンパラ", alien: true },
    { id: 774, name: "キンパラ", alien: true },
    { id: 775, name: "ヘキチョウ", alien: true },
    { id: 776, name: "ホオアカカエデチョウ", alien: true },
    { id: 777, name: "カエデチョウ", alien: true },
    { id: 778, name: "ベニスズメ", alien: true },
    { id: 779, name: "ホウオウジャク", alien: true },
    { id: 780, name: "コウカンチョウ", alien: true },
    { id: 781, name: "コウカンチョウ", alien: true },
    { id: 782, name: "外来種sp.", alien: true }
  ]
}
];

// ===== 表示処理（折りたたみ対応） =====
const list = document.getElementById("birdList");
const exportBtn = document.getElementById("exportBtn");
const output = document.getElementById("output");

birds.forEach(familyGroup => {
  // 科の見出し
  const familyTitle = document.createElement("h2");
  familyTitle.textContent = familyGroup.family;
  familyTitle.classList.add("family-title");

  // 科ごとのリスト（折りたたみ対象）
  const familyList = document.createElement("ul");
  familyList.classList.add("family-list");

  // 開閉処理
  familyTitle.addEventListener("click", () => {
    familyTitle.classList.toggle("open");
    familyList.classList.toggle("open");
  });

  list.appendChild(familyTitle);
  list.appendChild(familyList);

  familyGroup.species.forEach(bird => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "bird-" + bird.id;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = " " + bird.name + " ";

    const countInput = document.createElement("input");
    countInput.type = "text";
    countInput.placeholder = "数・メモ";
    countInput.style.width = "80px";

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(countInput);

    familyList.appendChild(li);
  });
});

// ===== テキスト出力処理 =====
// ===== テキスト出力処理 =====
exportBtn.addEventListener("click", () => {

  let result = "";

  // 種数カウンタ
  let nativeSpeciesCount = 0;
  let alienSpeciesCount = 0;

  // ---- 観察情報 ----
  if (obsDate.value) {
    const formattedDate = obsDate.value.replace(/-/g, "/");
    result += formattedDate;

    if (obsStartTime.value || obsEndTime.value) {
      result += " ";
      if (obsStartTime.value) result += obsStartTime.value;
      if (obsStartTime.value && obsEndTime.value) result += "–";
      if (obsEndTime.value) result += obsEndTime.value;
    }
    result += "\n";
  }

  if (obsPlace.value) result += `${obsPlace.value}\n`;
  if (obsWeather.value) result += `天候:${obsWeather.value}\n`;
  if (obsObserver.value) result += `観察者:${obsObserver.value}\n`;

  result += "\n";

  // ---- 鳥リスト ----
  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      const checkbox = document.getElementById("bird-" + bird.id);
      if (checkbox && checkbox.checked) {

        if (bird.alien === true) {
          alienSpeciesCount++;
        } else {
          nativeSpeciesCount++;
        }

        const countInput = checkbox.nextSibling.nextSibling;
        const count = countInput.value ? countInput.value : "";

        result += `${bird.name} ${count}\n`;
      }
    });
  });

  result += "\n";
  result += `確認種数：${nativeSpeciesCount}種\n`;
  result += `＋${alienSpeciesCount}種\n`;

  output.textContent = result;
});


// ===== テキスト保存 =====
const saveBtn = document.getElementById("saveBtn");
const showRecordsBtn = document.getElementById("showRecordsBtn");
const recordList = document.getElementById("recordList");


// ===============================
// 0. 現在編集中の記録番号
// ===============================
let currentRecordIndex = null;


// ===============================
// ① 記録を保存（上書き対応）
// ===============================
saveBtn.addEventListener("click", () => {

  let record = {
  date: obsDate.value,
  startTime: obsStartTime.value,
  endTime: obsEndTime.value,
  place: obsPlace.value,
  weather: obsWeather.value,
  observer: obsObserver.value,
  birds: []
};

  // チェックされた種を保存
  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      const checkbox = document.getElementById("bird-" + bird.id);
      if (checkbox && checkbox.checked) {
        record.birds.push(bird.id);
      }
    });
  });

  let records = JSON.parse(localStorage.getItem("birdRecords")) || [];

  if (currentRecordIndex !== null) {
    // ===== 上書き保存 =====
    records[currentRecordIndex] = record;
    alert("記録を上書き保存しました");
  } else {
    // ===== 新規保存 =====
    records.push(record);
    alert("記録を保存しました");
  }

  localStorage.setItem("birdRecords", JSON.stringify(records));

  // 保存後は編集状態を解除
  currentRecordIndex = null;
});


// ===============================
// ② 保存済み記録を表示／折りたたみ
// ===============================
showRecordsBtn.addEventListener("click", () => {

  if (recordList.style.display === "block") {
    recordList.style.display = "none";
    showRecordsBtn.textContent = "保存済み記録を表示";
    return;
  }

  recordList.style.display = "block";
  showRecordsBtn.textContent = "保存済み記録を閉じる";
  recordList.innerHTML = "";

  let records = JSON.parse(localStorage.getItem("birdRecords")) || [];

  if (records.length === 0) {
    recordList.textContent = "保存された記録はありません";
    return;
  }

  records.forEach((record, index) => {

    const row = document.createElement("div");
    const title = document.createElement("span");

    // ===== 日付を / 表示に変換 =====
    let dateText = "日付なし";
    if (record.date) {
      dateText = record.date.replace(/-/g, "/");
    }

    title.textContent = dateText + " " + (record.place || "");

    // 開くボタン
    const openBtn = document.createElement("button");
    openBtn.textContent = "開く";
    openBtn.addEventListener("click", () => {
      openRecord(index);
    });

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.addEventListener("click", () => {
      deleteRecord(index);
    });

    row.appendChild(title);
    row.appendChild(openBtn);
    row.appendChild(deleteBtn);

    recordList.appendChild(row);
  });
});


// ===============================
// ③ 記録を開く
// ===============================
function openRecord(index) {

  let records = JSON.parse(localStorage.getItem("birdRecords")) || [];
  let record = records[index];
  if (!record) return;

  // ★ 編集中インデックスを記憶
  currentRecordIndex = index;

  // 入力欄を復元
  obsDate.value = record.date || "";
  obsPlace.value = record.place || "";
  obsWeather.value = record.weather || "";
  obsObserver.value = record.observer || "";

  // 全チェック解除
  birds.forEach(familyGroup => {
    familyGroup.species.forEach(bird => {
      const checkbox = document.getElementById("bird-" + bird.id);
      if (checkbox) checkbox.checked = false;
    });
  });

  // 保存されていた種を再チェック
  record.birds.forEach(id => {
    const checkbox = document.getElementById("bird-" + id);
    if (checkbox) checkbox.checked = true;
  });
}


// ===============================
// ④ 記録を削除
// ===============================
function deleteRecord(index) {

  if (!confirm("この記録を削除しますか？")) return;

  let records = JSON.parse(localStorage.getItem("birdRecords")) || [];
  records.splice(index, 1);

  localStorage.setItem("birdRecords", JSON.stringify(records));

  alert("削除しました");

  // 削除した記録を編集中だった場合リセット
  if (currentRecordIndex === index) {
    currentRecordIndex = null;
  }

  showRecordsBtn.click();
}


