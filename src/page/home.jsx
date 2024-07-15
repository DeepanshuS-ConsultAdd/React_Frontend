import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const URL=`/api/home`;

function Page() {
  const [task, setTask] = useState("Loading..");

  useEffect(() => {
    const fetchData = async() => {
      try{
        const result = await fetch(URL);
        const json = await result.text();
        setTask(json);
      }catch(error)
      {
        console.error("Error: ",error);
        setTask("Failed to load task");
      }
    };
    fetchData();
  },[]);

  const navigate = useNavigate();
  
  const CallSignIn = () => {
    navigate("/signin");
  };

  const CallSignUp = () => {
    navigate("/signup");
  };
  

  return (
    <>
     <header>
        <h1> Employee Portal </h1> 
    {/* <p>": {task} ."</p> */}
    </header>
    <div className='navigatebuttons'>
      <div>
    <button onClick={()=> {CallSignUp ()}}>signup</button>
    </div>
    <div>
    <button onClick={() => {CallSignIn()}}>signin</button>
    </div>
    </div>
    </>
  )
}

export default Page;
