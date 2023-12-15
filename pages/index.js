import { useState, useEffect } from 'react'
import boin from '../features/components/boin'

export default function Home() {
  const data = require('./wordList.json');
  const jsonString = JSON.stringify(data);
  const objectData = JSON.parse(jsonString);

  const [json, setJson] = useState(objectData.words);
  const [list, setList] = useState([]);
  const [word, setWord] = useState("");

  const onChangeWord = ((e) => {
    setWord(boin(e.target.value));
  })

  
  useEffect(() => {
    setList();
    const filteredArray = [];
    for (let item in json){    
      if (json[item]["母音"] == word){
        //console.log(json[item]);
        filteredArray.push(json[item]);
      }
    }
    setList(filteredArray);
    //console.log(list);
    
  }, [word])//useEffect
  
  return (


    <div>
        <title>index</title>
        <form>
        <p>ひらがな/カタカナで入力</p>
        <input type="text" onChange={onChangeWord} />
        <p>{word}</p>
        </form>
        

        <ul>
          {list.map(item => (
            <li key={item.index}>
              <strong>{item.単語}</strong> {item.かな}
            </li>
          ))}
        </ul>
        
    </div>
  )
}
