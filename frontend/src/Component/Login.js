import React from 'react';
import {useRef , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Login() {  
  
  let emailInputRef = useRef();
  let passwordInputRef = useRef();


  let navigate = useNavigate();

  useEffect(()=>{

    if(localStorage.getItem('token')){
    userLoginThroughToken();
    emailInputRef.current.value = localStorage.getItem("Email");
    passwordInputRef.current.value = localStorage.getItem("Password");
    }

  } ,[]); 

  // User Login through credentials validation ---->>>>

  let validateLoginCredentials = async()=>{
    let dataToSend = new FormData();    
    dataToSend.append("email", emailInputRef.current.value);    
    dataToSend.append("password", passwordInputRef.current.value);    
    let reqOptions ={
      method: "POST",
      body: dataToSend
    };        
    let url = "http://localhost:5555/validatelogin";
    let JSONData = await fetch(url, reqOptions);
    let JSOData = await JSONData.json();
    if(JSOData.status == 'Failure'){

      alert(JSOData.details);

    }else{

      console.log(JSOData.details)
  
      localStorage.setItem ("Email" , emailInputRef.current.value);
      localStorage.setItem ("token" , JSOData.details.token);
      localStorage.setItem ( "id", JSOData.details.id);
      localStorage.setItem ( "name", JSOData.details.firstName);
     
      
      
     
       navigate('/dashbord', {state:JSOData.details});

    
    }
   

  } ;


   // User Login through Token Validation ---->>>>

   let userLoginThroughToken = async()=>{
    

      let tokendata = new FormData();
      tokendata.append ('token', localStorage.getItem('token'));

      let reqOptions ={

        method: "POST",
        body: tokendata
  
      };
          
      let url = "http://localhost:5555/validatetoken";
  
      let JSONData = await fetch(url, reqOptions);
      console.log(JSONData)
  
  
      let JSOData = await JSONData.json(); 

      if(JSOData.status == 'Failure'){
        alert(JSOData.details);

  
      }else{
         navigate('/dashbord' , {state: JSOData.details});  
      }
  };




  return (
    <div className='formDiv'>

        <h1>Login</h1>
        <form>

            <div>
            <input className="formInput" type='email' placeholder='UserName' ref={emailInputRef}></input>
            </div>
            <div>
            <input className="formInput" type='password' placeholder='Password' ref={passwordInputRef}></input>
            </div>
            <br></br>
            <br></br>
            <button className="submitButton" type='button' onClick={()=>{

               validateLoginCredentials()

            }}>Login</button>
            <br></br>
            <p>Don't have an Account ? <Link to='/signup'>SignUp</Link> Now</p>
            
            <p>Copyright ©AsmitaRai.com</p>


        </form>

    </div>
  )
}

export default Login