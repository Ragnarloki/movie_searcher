import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  
  const [endPoint,setPoint]=useState('')
  const [container,setContainer]=useState([])
  const [finalPoint,setFinalPoint]=useState('');
  const [isloader,setloader]=useState(true);
  const [title,setTitle]=useState("");
  useEffect(()=>{
    // setTimeout(() => {
    //   setloader(false);
    //   setContainer(<Skeleton/>)
    // }, 1000);
     fetchme();
  },[finalPoint])

useEffect(()=>{
    setTimeout(() => {
      setloader(false);
      setTitle("SEARCH THE MOVIE YOU WANT");
    }, 2000);
  },[])
  


  const  fetchme = async ()=> { 

  fetch(`https://imdb146.p.rapidapi.com/v1/find/?query=+${endPoint}`,{
    method: await 'GET',
    headers: {
    'X-RapidAPI-Key': '79b226d5c5msh58936cc3837787ap1e2f40jsn18453c50cd1b',
		'X-RapidAPI-Host': 'imdb146.p.rapidapi.com'
  }
})

.then ( response => {
  return response.json();
})	

.then(data =>{
  setContainer(data.nameResults.results);
  setloader(false);
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
        <center><h1> {title || <Skeleton />}</h1></center>
        <center>  
          {isloader ? ( <Skeleton/>) :(
          
          <input type="text" className='inputField'  value={endPoint} onChange={onchangeHandler} autoFocus/>
          )}
      <button type='submit' className='btn btn-primary'>submit</button>
      </center>
      
      <div className='car'>{container.map((item,index)=>{
        return (<>
        {isloader ? ( <Skeleton style={{display:"flex"}}/>) :(
           <div key={index} className='card'  style={{width: "18rem"} }>
          <p>{item.knownForTitleText}</p>
          <img src={item.avatarImageModel.url} alt="" width={250} height={300} />
          
          <p>caption:{item.avatarImageModel.caption}</p>
          
          </div>
       
        )}
       </>
 )
      })}
      </div>
</form>
    </div>
  )
}

export default App