import boin from '../components/boin'
import Word from '../components/word'

const apiKey = process.env.NEXT_PUBLIC_Y_A_K
const url = process.env.NEXT_PUBLIC_PARSE_URL
const parse_url = url + apiKey;
const data = require('../../pages/wordList.json');
const jsonString = JSON.stringify(data);
const objectData = JSON.parse(jsonString);
const json = objectData.words;


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
async function analyze() {
   
    const query = document.querySelector("#input_text").value;
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

                    let obj = new Word(text[i][0], text[i][1], boin(text[i][1]), text[i][2])
                    arr.push(obj);
                }
            break;
        }
    }
    let arr2 = [];
    for(let i = 0; i < arr.length; i++){
        let bln = false;
        for (let item in json){ 
            if (json[item]["単語"] == arr[i].tango && json[item]["かな"] == arr[i].yomi){
                //一致するものがあった場合
                bln = true;
            }
        }
        if(!bln){
            arr2.push(arr[i]);
        }
    }

    const deletedChofukuArr = arr2.filter((element, index, self) => self.findIndex(e => e.tango === element.tango && e.yomi == element.yomi) === index);

    let stringArr = [];

    for(let i = 0; i < deletedChofukuArr.length; i++){
        stringArr.push(deletedChofukuArr[i] + "\n");
    }

    document.getElementById("parse").value = stringArr;
    document.getElementById("parse").value = document.getElementById("parse").value + ",";
    
}

export default analyze;