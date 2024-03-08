import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  
  const [endPoint,setPoint]=useState('')
  const [container,setContainer]=useState([])
  const [finalPoint,setFinalPoint]=useState('');

  useEffect(()=>{
    fetchme()
  },[finalPoint])


  const  fetchme = async ()=> { 

  fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=+${endPoint}`,{
    method: await 'GET',
    headers: {
      'X-RapidAPI-Key': '79b226d5c5msh58936cc3837787ap1e2f40jsn18453c50cd1b',
		  'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
  }
})

.then ( response => {
  return response.json();
})	

.then(data =>{
  setContainer(data.d)
  console.log(data)
})

.catch (error => {
	console.error(error);
})
}
function onchangeHandler(e){
  setPoint(e.target.value)
}

const submitHandler = e =>{
  e.preventDefault();
  setFinalPoint(endPoint);
}
  return (
    <div>
      <form onSubmit={submitHandler}>
      <input type="text" value={endPoint} onChange={onchangeHandler}/>
      <button type='submit'>submit</button>
      
      {container.map((item,index)=>{
        return (<div key={index}  className="card" style={{width: "18rem"} }>
          <p>{item.l}</p>
          <img src={item.i.imageUrl} alt="" width={250} height={300} />
          <p>Actors name:{item.s}</p>
          </div>
        )
      })}
</form>
    </div>
  )
}

export default App