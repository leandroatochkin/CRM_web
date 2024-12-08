import React from 'react'
import style from './PasswordResetModal.module.css'
import {Button} from '..';
import { setLoading, employeeId, setError, error, language, setOpenModal, loading, storedPassword } from '../../utils/stores';
import Backdrop from './Backdrop'

const PasswordResetModal = () => {

const currentLanguage = language()
const closeModal = setOpenModal()

  return (
    <Backdrop>
      <div className={style.modal}>
        <h2>{currentLanguage.ui.request_password_reset_2}</h2>
        <div className={style.buttonContainer}>
                <Button text={currentLanguage.ui.confirm} />
                <Button text={currentLanguage.ui.cancel} handler={()=>closeModal(false)}/>
        </div>
      </div>
    </Backdrop>
  )
}

export default PasswordResetModal