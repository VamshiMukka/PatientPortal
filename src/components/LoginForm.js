import {React, useState} from "react";
import axios from "axios";
import serviceLocator from "./Headers";
import {useNavigate} from "react-router-dom";
import * as constants from "./Constants";


const LoginForm = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState("empty");
    const [isUserUnAuthorized, setIsUserUnAuthorized] = useState(false);
    let navigate = useNavigate();

    const submitHandler = async (e) => {
      e.preventDefault();
      setIsUserUnAuthorized(false);
      loginUser({username: username, password: password});
    };
    
function loginUser(credentials) {
    
    axios({
        method: constants.POST,
        url: constants.LoginUrl,
        headers: { ...serviceLocator.Headers},
        data: { ...credentials }
    }).then((response)=>{
        console.log(response);
        parseLoginResponse(response);
    }).catch((err) => err);

}

// parse the response and navigate to patient list page upon successful login
function parseLoginResponse(response)
{
    if(response && response!=undefined && response!=null)
        {
            localStorage.setItem(constants.AuthorizationToken,response.data.success);
            setToken(response.data.success); 
            navigate(constants.PatientList);
        }
        else{
            setIsUserUnAuthorized(true);
        }
}

// render the login page
    return (
        <form onSubmit={submitHandler}> 
            <div className='form-inner'>
                <h2>Patient Portal Login</h2>
                <br/>
                <div className='form-group'>
                    <label htmlFor="name">Name:</label>
                     <input type="text" name="username" id="username" onChange={e=>setUserName(e.target.value)}></input>
                </div>
                <br/>
                <div className='form-group'>
                    <label htmlFor="password">Password:</label>
                     <input type="password" name="password" id="password" onChange={e=>setPassword(e.target.value)}></input>
                </div>
                <br/>
                
                <div className='form-group'>
                    <input type ="submit" value="LOGIN"/>
                </div>
                {isUserUnAuthorized?
                <div>
                    <p><h2 color='Red'>401 UnAuthorized - Incorrect Credentials</h2></p>
                </div>
                :null}    
            </div>    
        </form>
    )
}

export default LoginForm;