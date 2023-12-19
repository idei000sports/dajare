/*

import boin from '../components/boin'
import Word from '../components/word'

const apiKey = process.env.NEXT_PUBLIC_Y_A_K
const url = process.env.NEXT_PUBLIC_PARSE_URL
const parse_url = url + apiKey;
let data = require('../../pages/wordList.json');
let jsonString = JSON.stringify(data);
let objectData = JSON.parse(jsonString);
let json = objectData.words;
//let arr2 = [];

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


function loadJson(){
    data = require('../../pages/wordList.json');
    jsonString = JSON.stringify(data);
    objectData = JSON.parse(jsonString);
    json = objectData.words;
}


let text = "";



async function analyze(query) {
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
            //console.log(arr[i])
            arr2.push(arr[i]);
        }
    }

    const deletedChofukuArr = arr2.filter((element, index, self) => self.findIndex(e => e.tango === element.tango && e.yomi == element.yomi) === index);

    let stringArr = [];

    for(let i = 0; i < deletedChofukuArr.length; i++){
        stringArr.push(deletedChofukuArr[i] + "\n");
    }

    return stringArr;
    
}

async function analyzer(){
    let arr = [];
    loadJson();
    const query = document.querySelector("#input_text").value;
    //console.log(query);
    let queryArr = [];

    for (let i = 0; i < query.length / 15000; i++) {
        queryArr.push(query.substr(i * 15000, 15000));
    }
    //console.log(queryArr);

    console.log("処理回数" + queryArr.length);
    for(let i = 0; i < queryArr.length; i++){
        arr = await analyze(queryArr[i]);
        if(i != 0){
        console.log("5秒待つ");
        await wait(5000);
        console.log("5秒待った");
        }
        console.log("残り回数" + (queryArr.length - (i+1)));
    }
    console.log("完了");
    document.getElementById("parse").value = arr;
    document.getElementById("parse").value = document.getElementById("parse").value + ",";


}

const wait = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(); // setTimeoutの第一引数の関数として簡略化できる
        }, ms)
    });
}



export default analyzer;

*/