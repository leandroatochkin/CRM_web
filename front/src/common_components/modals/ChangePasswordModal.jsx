import React, {useEffect, useRef} from 'react'
import Backdrop from './Backdrop'
import { setLoading, employeeId, setError, error, language, setOpenModal, loading, storedPassword } from '../../utils/stores';
import style from './ChangePasswordModal.module.css' 
import {Button, ToggleableInput} from '../../common_components';
import { changePassword } from '../../utils/async_functions/api_functions';

const ChangePasswordModal = () => {

const currentLanguage = language()
const closeModal = setOpenModal()
const setGlobalError = setError()
const id = employeeId()



const formData = useRef({
    old_password: '',
    new_password: '',
    confirm_password: ''
})

const handleChange = (e) => {
    const { name, value } = e.target;
    formData.current[name] = value; // Update the ref's value
}

const handleSubmit = async () => {
    try{
        if(formData.current.new_password !== formData.current.confirm_password) {
            setGlobalError('Passwords do not match')
            alert('Passwords do not match')
            return
            }
        if(formData.current.new_password.length < 8) {
            setGlobalError('Password must be at least 8 characters long')
            alert('Password must be at least 8 characters long')
            return
            }
        console.log(id, oldPassword, formData.current.new_password) 
        const data = await changePassword(id, formData.current.old_password, formData.current.new_password)
        console.log(data)
    } catch(e){
        setGlobalError(e.message)
        alert('error')
    }
}

  return (
    <Backdrop>
        <div className={style.modal}>
            <div className={style.inputContainer}>
            <ToggleableInput placeholder={currentLanguage.ui.old_password} name={'old_password'} handleChange={handleChange}/>
            <ToggleableInput placeholder={currentLanguage.ui.new_password} name={'new_password'} handleChange={handleChange}/>
            <ToggleableInput placeholder={currentLanguage.ui.confirm_password} name={'confirm_password'} handleChange={handleChange}/>
            </div>
            <div className={style.buttonContainer}>
                <Button text={currentLanguage.ui.confirm} handler={handleSubmit}/>
                <Button text={currentLanguage.ui.cancel} handler={()=>closeModal(false)}/>
            </div>
        </div>
    </Backdrop>
  )
}

export default ChangePasswordModal