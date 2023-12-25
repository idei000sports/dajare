import { useState, useEffect, useCallback } from 'react'
import supabase from "../features/components/supabase"
import boin from '../features/components/boin'
import Select from 'react-select'
import '../app/globals.css'
import Header from './header'
//taliwind

export default function Home() {
  //モード切り替えのセレクター
  const options = [
    { value: 'tango', label: '単語' },
    { value: 'ichibu', label: '一部' },
  ]

  const [isClicked, setClick] = useState(false)


  const [word, setWord] = useState("");
  const [wordList, setWordList] = useState([]);

  //モード情報
  const [mode, setMode] = useState("tango");
  const [text, setText] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [ichibuText, setIchibuText] = useState([]);
  const [info, setInfo] = useState("");
  const [sample, setSample] = useState("");
  //入力情報取得
  const onChangeWord = ((e) => {
    if (mode == "tango") {
      //単語モードなので受け取ったテキストそのままで動作
      console.log("tangoモード動作")
      setText(e.target.value);
      setSearchWord(boin(e.target.value));
    } else if (mode == "ichibu") {
      //一部モードなので受け取ったテキストの[]内を取得
      console.log("ichibuモード動作");
      let seiki = new RegExp(/「.+?」/);
      let s = "";
      if (seiki.exec(e.target.value) != null) {
        //正規表現で周りを削除
        s = seiki.exec(e.target.value)[0]
        //[]を外す
        s = s.slice(1);
        s = s.slice(0, -1);
        setSearchWord(boin(s));
        console.log("[]の中" + s);

        seiki = new RegExp(/(.*)(?=「)/);
        let mae = seiki.exec(e.target.value)[0];
        console.log("[]の前" + mae);

        seiki = new RegExp(/(?<=」)(.*)/);
        let ato = seiki.exec(e.target.value)[0];
        console.log("[]の後" + ato);

        let arr = [mae, ato];
        setIchibuText(arr);
      }
      setText(s);
    }
  })






  //モード切り替えスイッチ
  const onClickMode = useCallback((mode) => {
    setMode(mode);
  }, []);
    //setMode(e.value)


  //検索ワードから検索する
  useEffect(() => {
    db(searchWord);
  }, [searchWord])//useEffect

  useEffect(() => {
    if(mode == "tango"){
      setIchibuText(["",""])
      setInfo("ひらがな/カタカナで入力してください")
      setSample("だじゃれ");
      setClick(true);
    }else if(mode =="ichibu"){
      setInfo("変換したいひらがな/カタカナを「」でくくってください")
      setSample("「いしばし」を叩いて渡る")
      setClick(false);
    }else{

    }
  }, [mode])//useEffect


  //db接続(母音一致)
  async function db(boin) {
    const { data: words, error } = await supabase
      .from("test_kanas")
      .select('*').eq('boin', boin)
    //console.log(t);
    setWordList(words);
  }



  return (

    <>
      <Header />
      <div className="container mx-auto font-body">

        <title>ダジャレ替え歌作成機</title>



        <div className="flex-auto px-5">
          <div className="flex flex-col text-center w-full mb-5">
            <div className="flex mx-auto border-2 border-orange rounded overflow-hidden mt-6 text-orange font-bold">
              <button className={`py-1 px-4 focus:outline-none ${isClicked === true ? 'bg-light-orange text-white' : '' }`} onClick={() => {onClickMode("tango")}}>単語</button>
              <button className={`py-1 px-4 focus:outline-none ${isClicked === false ? 'bg-light-orange text-white' : '' }`} onClick={() => {onClickMode("ichibu")}}>一部</button>
            </div>
            
          </div>

            <div className="flex-auto">
              <textarea type="text" id="textbox" name="input" onChange={onChangeWord} placeholder={sample} className="w-full bg-gray-100 border border-orange text-base"></textarea>
              <label htmlFor="input" className="text-sm text-gray-600">{info}</label>
          </div>
        </div>

        <div className="container" >
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
      
            <ul className="w-full">
              <li className="text-center text-lg font-semibold border-b-2 border-orange border-neutral-100 border-opacity-100 pt-5 pb-5 dark:border-opacity-50">{text}</li>
              {wordList.map((item, index) => (
                <li key={index} className="border-b-2 border-orange border-neutral-100 border-opacity-100 pt-8 dark:border-opacity-50">
                  <span className="text-xl">{ichibuText[0]}</span><span>  </span><ruby className="text-xl font-medium">{item.word}<rt className="text-sm font-normal py-4 text-gray-600">{item.kana}</rt></ruby><span> </span>  <span className="text-xl">{ichibuText[1]}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
      
    </>
  )
}
