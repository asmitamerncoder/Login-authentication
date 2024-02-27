import React from 'react';
import {useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';





function Signup() {

  let navigate = useNavigate();

  let fNameInputRef = useRef();
  let lNameInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let confPassInputRef = useRef();

  // let validateUserName = ()=>{

  //   let password = passwordInputRef.current.value;
  //   let confPass = confPassInputRef.current.value;

  //   if(password !== confPass){

  //       alert("Password didn't match.")

  //   }
  // };


  let validatePassMatch = ()=>{

    let password = passwordInputRef.current.value;
    let confPass = confPassInputRef.current.value;

    if(password !== confPass){

        alert("Password didn't match.")

    }
  };

  
  let sendUserSignupCredentials = async()=>{

    let dataToSend = new FormData();

    dataToSend.append("firstName", fNameInputRef.current.value);
    
    dataToSend.append("lastName", lNameInputRef.current.value);
    
    dataToSend.append("email", emailInputRef.current.value);
    
    dataToSend.append("password", passwordInputRef.current.value);
   
    

    
    let reqOptions ={

      method: "POST",
      body: dataToSend

    };
    
    console.log(reqOptions)
    
    let url = "http://localhost:5555/signup"

    let JSONData = await fetch(url,reqOptions);

    console.log(JSONData)

    let JSOData = await JSONData.json();

    console.log(JSOData)

    if(JSOData.status == "Success"){

      alert("Registerd Sucessfully")
      navigate('/');
    }
   

  } ;

 

  return (
    <div className='formDiv'>

        <h1>Sign Up</h1>
        <form>
            <div>
            <input className="nameInput"  type='text' placeholder='First Name' ref={fNameInputRef}></input>
            <input className="nameInput" type='text' placeholder='Last Name' ref={lNameInputRef}></input>
            </div>
            <div>
            <input className="formInput" type='email' placeholder='Email' ref={emailInputRef}></input>
            </div>
            <div>
            <input className="formInput" type='password' placeholder='Password' ref={passwordInputRef} ></input>
            </div>
            <div>
            <input className="formInput" type='password' placeholder='Confirm Password' ref={confPassInputRef} onBlur={()=>{

               validatePassMatch()
               
            }}></input>
            </div>
            <br></br>
            <div>
            <input type='checkbox'></input>
            <label>I accept the Terms of Use & Privacy Policy</label>
            </div>
            <br></br>
            <button className="submitButton" type='button' onClick={()=>{

                  sendUserSignupCredentials();

            }}>Sign Up</button>
            <br></br>
            <p>Already have an account?<Link to='/'>Login</Link> here</p>
            
            <p>Copyright ©AsmitaRai.com</p>






        </form>

    </div>
  )
}

export default Signup