import analyzer from '../features/components/analyze'

export default function Input() {

  function textCount() {
    const length = document.querySelector("#input_text").value.length;
    document.getElementById("length").innerHTML = length + "文字";
 }


  return(
      <div>
        <p id="length"></p>
        <textarea id="input_text" onKeyUp={textCount} style={{width:500, height:200}}></textarea>
        <button onClick={analyzer}>解析</button>

        <p></p>
        <textarea id="parse" style={{width:1024, height:500}}></textarea>
      </div>
  )
}
