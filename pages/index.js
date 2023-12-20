import { useState, useEffect } from 'react'
import supabase from "../features/components/supabase"
import boin from '../features/components/boin'

export default function Home() {
  /*
  const data = require('./wordList.json');
  const jsonString = JSON.stringify(data);
  const objectData = JSON.parse(jsonString);
  const [list, setList] = useState([]);
  const [json, setJson] = useState(objectData.words);
  */
  const [word, setWord] = useState("");
  const [tests, setTests] = useState([]);

  const onChangeWord = ((e) => {
    setWord(boin(e.target.value));
  })

  async function db(boin) {

    const { data: words, error } = await supabase
    .from("test_kanas")
    .select('*').eq('boin', boin)
    /*
    const { data: t, err} = await supabase
    .from("test_word")
    .select("*").eq("id", words.word_id)
    */

    if(error != null){
      //console.log(error)
    }else{
      //console.log(words)
    }
    //console.log(t);
    setTests(words);

  }

  
  useEffect(() => {
    db(word);   
  }, [word])//useEffect
  
  return (

    <div>
        <title>ダジャレ替え歌作成機</title>
        <form>
        <p>ひらがな/カタカナで入力</p>
        <input type="text" onChange={onChangeWord} />
        <p>{word}</p>
        </form>
        
        <ul>
          {tests.map((item, index) => (
            <li key={index}>
              <strong>{item.word}</strong> {item.kana}
            </li>
          ))}
        </ul>
        
    </div>
  )
}
