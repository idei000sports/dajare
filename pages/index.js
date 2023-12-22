import { useState, useEffect } from 'react'
import supabase from "../features/components/supabase"
import boin from '../features/components/boin'
import '../styles/index.css'
import Select from 'react-select'

export default function Home() {
  //モード切り替えのセレクター
  const options = [
    { value: 'tango', label: '単語' },
    { value: 'ichibu', label: '一部' },
  ]


  const [word, setWord] = useState("");
  const [wordList, setWordList] = useState([]);

  //モード情報
  const [mode, setMode] = useState("tango");
  const [text, setText] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [ichibuText, setIchibuText] = useState([]);

  //入力情報取得
  const onChangeWord = ((e) => {
    if(mode == "tango"){
      //単語モードなので受け取ったテキストそのままで動作
      console.log("tangoモード動作")
      setText(e.target.value);
      setSearchWord(boin(e.target.value));
    }else if(mode == "ichibu"){
      //一部モードなので受け取ったテキストの[]内を取得
      console.log("ichibuモード動作");
      let seiki = new RegExp(/\[.+?\]/);
      let s = "";
      if(seiki.exec(e.target.value) != null){
        //正規表現で周りを削除
        s = seiki.exec(e.target.value)[0]
        //[]を外す
        s = s.slice(1);
        s = s.slice(0, -1);
        setSearchWord(boin(s));
        console.log("[]の中" + s);
        
        seiki = new RegExp(/(.*)(?=\[)/);
        let mae = seiki.exec(e.target.value)[0];
        console.log("[]の前" + mae);

        seiki = new RegExp(/(?<=\])(.*)/);
        let ato = seiki.exec(e.target.value)[0];
        console.log("[]の後" + ato);

        let arr = [mae, ato];
        setIchibuText(arr);
      }
      setText(s);
    }
  })
  




  
  //モード切り替えスイッチ
  const onChangeMode = ((e) => {
    setMode(e.value)
  })

  //検索ワードから検索する
  useEffect(() => {
      db(searchWord);   
  }, [searchWord])//useEffect
  //db接続(母音一致)
  async function db(boin) {
    const { data: words, error } = await supabase
    .from("test_kanas")
    .select('*').eq('boin', boin)
    //console.log(t);
    setWordList(words);
  }

  
  
  return (

    <div>
        <title>ダジャレ替え歌作成機</title>
        <form>
        <p>ひらがな/カタカナで入力</p>
        <div>
          <Select 
            options={options} 
            inputId="mode"
            instanceId="mode"
            onChange={onChangeMode}
            defaultValue={options[0]}
          />
        </div>

        <div>
        < input type="text" id="textbox" onChange={onChangeWord}/>
        </div>
        <p>{text}</p>
        </form>
        
        <ul>   
          {wordList.map((item, index) => (
            <li key={index}>
              {ichibuText[0]}<strong>{item.word}</strong>{ichibuText[1]}
            </li>
          ))}
        </ul>
        
    </div>
  )
}
