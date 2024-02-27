import React from 'react';
import {useRef , useEffect} from 'react';
import {useNavigate , useLocation} from 'react-router-dom';



function Userpage() {


    let loc = useLocation();

    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let confPassInputRef = useRef();

    let validatePassMatch = ()=>{

      let newPassword = passwordInputRef.current.value;
      let confPass = confPassInputRef.current.value;
  
      if(newPassword !== confPass){
  
          alert("Password didn't match.")
  
      }
    };

    let navigate = useNavigate();

    useEffect( ()=>{
      

        emailInputRef.current.value=loc.state.email;    

      },[])
    


    let editProfileCredentials = async()=>{

      let dataToSend = new FormData();
       
      dataToSend.append("password", passwordInputRef.current.value);
      dataToSend.append("id", loc.state.id);
         
      let reqOptions ={
  
        method: "PUT",
        body: dataToSend
  
      };
      
      console.log(reqOptions)
      
      let url = "http://localhost:5555/editprofile"
  
      let JSONData = await fetch(url,reqOptions);
  
      console.log(JSONData)
  
      let JSOData = await JSONData.json();
  
      console.log(JSOData)

      if(JSOData.status == "Success"){

        alert("Profile Updated Sucessfully")

        navigate('/');
      }
     
  
    } ;

    let logoutFromDashbord = async()=>{

      let reqOptions = {

        method : "DELETE"

      }

      let url = `http://localhost:5555/logout?id=${loc.state.id}`
    
      let JSONData = await fetch (url, reqOptions);

     
      let JSOData = await JSONData.json();

      console.log(JSOData);

      if(JSOData.status == "Success"){

        alert("Logout Sucessfully")

        navigate('/');
      }


    }
    
    


  return (
    <div>

        <h1>Hi {loc.state.firstName} !! Welcome to your Dashbord...</h1>
    <div className='formDiv'>

        <h2>Edit Profile</h2>
        <form>
            <div>
            <input className="formInput"  type='email' placeholder='UserName' ref={emailInputRef} onBlur={()=>{

              if(emailInputRef !== loc.state.email){

                alert( " You cann't change UserName " )

                
              }
            }}></input>
            </div>
            <div>
            <input className="formInput" type='password' placeholder='New Password' ref={passwordInputRef} ></input>
            </div>
            <div>
            <input className="formInput" type='password' placeholder='Confirm Password' ref={confPassInputRef} onBlur={()=>{

                  validatePassMatch();
               
            }}></input>
            </div>
            
            <br></br>
            <button className="submitButton" type='button' onClick={()=>{

              editProfileCredentials();    

            }}>Submit</button>
            <br></br>
            

            <br></br>
            <button className="submitButton" type='button' onClick={()=>{

              logoutFromDashbord()

            }}>Logout</button>
            <br></br>
            
            <p>Copyright ©AsmitaRai.com</p>






        </form>

    </div>

    </div>
  )
}

export default Userpage