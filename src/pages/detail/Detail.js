import React from 'react'
import {useParams} from 'react-router-dom'
function Detail() {
    const params = useParams();
    console.log(params)
  return (
    <div>
      <p>{params.id}</p>
    </div>
  )
}

export default Detail
