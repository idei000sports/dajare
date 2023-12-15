


export default function Input() {
  const test = process.env.NEXT_PUBLIC_TEST
  console.log(test);
    return(
        <div>
            <h1>test</h1>
        </div>
    )
}
/*
<html lang="ja">
    <head>
        <style>
            textarea{
                width: 500px;
                height: 200px;
            }

        </style>
        <script>
          //header(Access-Control-Allow-Origin: *);
            const hiraganaBoinArr = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["が", "ぎ", "ぐ", "げ", "ご"],
  ["さ", "し", "す", "せ", "そ"],
  ["ざ", "じ", "ず", "ぜ", "ぞ"],
  ["た", "ち", "つ", "て", "と"],
  ["だ", "ぢ", "づ", "で", "ど"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ば", "び", "ぶ", "べ", "ぼ"],
  ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"],
  ["ま", "み", "む", "め", "も"],
  ["ら", "り", "る", "れ", "ろ"],
  ["や", "ゐ", "ゆ", "ゑ", "よ"],
  ["わ", "ゐ", "う", "ゑ", "を"]
]

const katakanaBoinArr = [
  ["ア", "イ", "ウ", "エ", "オ"],
  ["カ", "キ", "ク", "ケ", "コ"],
  ["ガ", "ギ", "グ", "ゲ", "ゴ"],
  ["サ", "シ", "ス", "セ", "ソ"],
  ["ザ", "ジ", "ズ", "ゼ", "ゾ"],
  ["タ", "チ", "ツ", "テ", "ト"],
  ["ダ", "ヂ", "ヅ", "デ", "ド"],
  ["ナ", "ニ", "ヌ", "ネ", "ノ"],
  ["ハ", "ヒ", "フ", "ヘ", "ホ"],
  ["バ", "ビ", "ブ", "ベ", "ボ"],
  ["パ", "ピ", "プ", "ペ", "ポ"],
  ["マ", "ミ", "ム", "メ", "モ"],
  ["ヤ", "ヰ", "ユ", "ヱ", "ヨ"],
  ["ラ", "リ", "ル", "レ", "ロ"],
  ["ワ", "ヰ", "ウ", "ヱ", "ヲ"]
]


function boin(word){
  let wordArr = [];
  for(let i = 0; i < word.length; i++){
    wordArr[i] = word.charAt(i);
  }

  for(let i = 0; i < wordArr.length; i++){
    for (let j = 0; j < hiraganaBoinArr.length; j++){
      for(let k = 0; k < hiraganaBoinArr[j].length; k++){
        if(wordArr[i] == hiraganaBoinArr[j][k] || wordArr[i] == katakanaBoinArr[j][k]){
          wordArr[i] = katakanaBoinArr[0][k];
        }

        switch(wordArr[i]){
          case "ぁ":
          case "ァ":
            wordArr[i - 1] = "ア";
            wordArr.splice(i, 1);
            break;
          case "ぃ":
          case "ィ":
            wordArr[i - 1] = "イ";
            wordArr.splice(i, 1);
            break;

          case "ぅ":
          case "ゥ":
            wordArr[i - 1] = "ウ";
            wordArr.splice(i, 1);
            break;

          case "ぇ":
          case "ェ":
            wordArr[i - 1] = "エ";
            wordArr.splice(i, 1);
            break;

          case "ぉ":
          case "ォ":
            wordArr[i - 1] = "オ";
            wordArr.splice(i, 1);
            break;

          case "ゃ":
          case "ャ":
            wordArr[i - 1] = "ア";
            wordArr.splice(i, 1);
            break;
          case "ゅ":
          case "ュ":
            wordArr[i - 1] = "ウ";
            wordArr.splice(i, 1);
            break;
          case "ょ":
          case "ョ":
            wordArr[i - 1] = "オ";
            wordArr.splice(i, 1);
             break;
          case "っ":
          case "ッ":
            wordArr[i] = "ッ";
            break;
          case "ん":
          case "ン":
            wordArr[i] = "ン";
            break;
          case "ー":
            wordArr[i] = wordArr[i - 1];
            break;
        }

      }
    }
  }

  return wordArr.join('');
}
            
            

            const parse_url = 'https://jlp.yahooapis.jp/MAService/V2/parse?appid=' + encodeURIComponent(APPID);
            const furigana_url = "https://jlp.yahooapis.jp/FuriganaService/V2/furigana?appid=" + encodeURIComponent(APPID);
            let text = "";
            async function postRequest(query) {
                const response = await fetch(parse_url, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        "id": "A123",
                        "jsonrpc" : "2.0",
                        "method": 'jlp.maservice.parse',
                        "params" : { "q" : query }
                    }),
                });
                return await response.json();
            }
            async function main() {
               
                const query = document.querySelector("#input-text").value;
                const response = await postRequest(query)
                text = response['result']['tokens'].map(x => [x[0], x[1], x[3],x[4]])

                let arr = []
                for (let i = 0; i < text.length; i++){
                    switch(text[i][2]) {
                        case "判定詞":
                        case "助詞":
                        case "接頭辞":
                        case "接尾辞":
                        case "特殊":
                        case "助動詞":
                        case "未定義語":
                        case "動詞":
                            break;
                        default :
                            if(text[i][3] != "人名" && text[i][3] != "数詞"){
                                let txt = `{"単語" : "${text[i][0]}", "かな" : "${text[i][1]}", "母音" : "${boin(text[i][1])}", "品詞" : "${text[i][2]}"}\n`;
                                arr.push(txt);
                            }
                        break;
                    }
                }

                document.getElementById("parse").value = arr;
                document.getElementById("parse").value = document.getElementById("parse").value + ",";
                
            }
        </script>
    </head>
    <body>
        <p></p>
        <textarea id="input-text"></textarea>
        <button onclick="main()">解析</button>

        <p></p>
        <textarea id="parse">unko</textarea>
    <body>

</html>
*/