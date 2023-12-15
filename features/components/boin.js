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
            case "ゃ":
            case "ャ":
              wordArr[i - 1] = "ア";
              wordArr.splice(i, 1);
              i--;
              break;
  
            case "ぃ":
            case "ィ":
                  wordArr[i - 1] = "イ";
                  wordArr.splice(i, 1);
                  i--;
                  break;
  
            case "ゅ":
            case "ュ":
            case "ぅ":
            case "ゥ":
              wordArr[i - 1] = "ウ";
              wordArr.splice(i, 1);
              i--;
              break;
            
            case "ぇ":
            case "ェ":
                wordArr[i - 1] = "エ";
                wordArr.splice(i, 1);
                i--;
                break;
      
            case "ぉ":
            case "ォ":
            case "ょ":
            case "ョ":
              wordArr[i - 1] = "オ";
              wordArr.splice(i, 1);
              i--;
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

  export default boin;