import supabase from "../features/components/supabase"
import { useState, useEffect } from 'react'


export default function Notes() {
  <>
  </>
  /*
  //配列だから[]で初期化してる
  const [tests, setTests] = useState([]);
  useEffect(() => {
    db();
  }, [])//useEffect

  async function db() {
    const { data: words, error } = await supabase.from("words").select('id').select("*");
    setTests(words);
  }

  return(
    <>
    <div>
      <table>
        <tbody>
        <tr>
          <th>id</th>
          <th>word</th>
          <th>kana</th>
          <th>boin</th>
          <th>hinshi</th>
          <th>create_date</th>
        </tr>
  
        {tests.map((test) => (
          <tr key={test.id}>
            <td>{test.id}</td>
            <td><strong>{test.word}</strong></td>
            <td>{test.kana}</td>
            <td>{test.boin}</td>
            <td>{test.hinshi}</td>
            <td>
              {
                new Date(test.create_date).toLocaleDateString('sv-SE') 
                + "  "
                + new Date(test.create_date).toLocaleTimeString('ja-JP')
              }
            </td>
          </tr>
        ))}
        
        </tbody>
      </table>
    </div>
    </>
  )
*/
}
