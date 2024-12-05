import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../utils/async_functions/api_functions'
import style from './Login.module.css'
import { userStore } from '../../utils/stores/userStore'
import { uiStore } from '../../utils/stores/uiStore'
import { ToggleableInput } from '../../common_components'
import { MoonLoader } from 'react-spinners';


const Login = () => {
const [showPassword, setShowPassword] = useState(false)

 const navigate = useNavigate()

const setUserData = userStore((state)=>state.setLoginStatus)
const setLoadingStatus = uiStore((state)=>state.setLoading)
const loadingStatus = uiStore((state)=>state.loading)


    const formData = useRef({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        formData.current[name] = value; // Update the ref's value
    };

    const handleLogin = async () => {
        setLoadingStatus(true)
        try{
            const data = await login(formData.current.username, formData.current.password)
            if(data.valid){
                setUserData(true, data.employeeId, data.companyId, data.role)
                setLoadingStatus(false)
                navigate('/home')
            } else {
                alert('Invalid username or password')
            }
        }
        catch(e){
            console.log(e)
        }
    }



  return (

        <div className={style.container} aria-label="Login container">
          <div className={style.login} aria-label="Login form">
            <div className={style.title} aria-label="Welcome Back!">
            </div>
    
            {/* Show loader while the login process is happening */}
            {loadingStatus ? (
                <MoonLoader />
            ):(
                              <div className={style.formContainer} aria-label="Google login button container">
                
                              {/*-----------------------inputs container---------------------------*/}
                              <h4 className={style.legend} aria-label="Login form legend">login</h4>
                                <div  className={style.inputContainer}>
                                  {/*-----------------------email input---------------------------*/}
                                  <input type='text' name='username' placeholder='username' className={style.input} onChange={handleChange}/>
                  
                  
                                  <div className={style.inputLine}>
                                      <ToggleableInput handleChange={handleChange}/>
                                  </div>
                                  {/* <p className={invalidCredentials ? style.invalidCredentials : style.hidden}>{language.error_messages.invalid_credentials}</p> */}
                                </div>
                                <div className={style.loginBtnContainer}>
                  {/*-----------------------login button---------------------------*/}
                  
                                      <button  className={style.button} onClick={handleLogin}>login</button>
                               
                  {/*-----------------------login button---------------------------*/}
                                </div>
                  
                  
                                {/*-----------------------inputs container---------------------------*/}
              
                            </div>
            )}

            
          </div>
    
        </div>
      
  )
}

export default Login