import { useState } from "react";

export default function () {

  let content = `my article content my article 
  content my article content my article content
  my article content my article 
  content my article content my article content`

  const [data, setData] = useState(content)

  const singleStyle = {
    width: '200px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }

  function mutipleStyle(rowSize) {
    return {
      textOverflow: ''
    }
  }

  function changeData() {
    console.log(data, content);
    setData(data + content)
  }

  return (
    <>
      <h1>my article title</h1>
      <article style={{
        width: '200px',
        textOverflow: 'ellipsis',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {data}
      </article>
      <button onClick={changeData}>change</button>
    </>
  )
}
