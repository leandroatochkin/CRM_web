import React, { useState } from 'react'
import { userStore } from '../../utils/stores/userStore'
import style from './Profile.module.css'
import { uiStore } from '../../utils/stores/uiStore'
import { Button, DropPicModal, ChangePasswordModal, PasswordResetModal } from '../../common_components'
import { host, profilePics } from '../../utils/async_functions'


const Profile = () => {
    const [modal, setModal] = useState(0)

    const userData = userStore((state)=>state.employeeInfo)
    const language = uiStore((state)=>state.language)
    const setOpenModal = uiStore((state)=>state.setOpenModal)
    const openModal = uiStore((state)=>state.openModal)

    console.log(userData)

    const modalsArr = [<DropPicModal />, <ChangePasswordModal />, <PasswordResetModal />]

    const handleClick = (modal) =>{
        setModal(modal)
        setOpenModal(true)
    }


  return (
    <div className={style.container}>
        { openModal && modalsArr[modal]}
        <div className={style.header}>
            <h2>Perfil</h2>
            <div className={style.parent}>
                 <div className={style.div1}>
                        <img src={userData.profilePic_path === null ? '/public/images/no-pic.jpg' : `${host}${profilePics}${userData.profilePic_path}`} alt="profile" className={style.pic} />
                 </div>
                 <div className={style.div2}>
                 <h2>{`${userData.name} ${userData.last_name}`}</h2>
                 </div>
                 <fieldset className={style.fieldset}>
                 <legend>{language.ui.file}</legend>
                 <div className={style.div3}>{userData.file_num}</div>
                 </fieldset>
                 <fieldset className={style.fieldset}>
                 <legend>{language.ui.identification}</legend>
                 <div className={style.div4}>{userData.identification_num}</div>
                 </fieldset>
                 <fieldset className={style.fieldset}>
                 <legend>{language.ui.work_email}</legend>
                 <div className={style.div5} name='email'>{userData.work_email}</div>
                 </fieldset>
            </div>
            <div className={style.buttonContainer}>
            <Button text={language.ui.request_password_reset} handler={()=>handleClick(2)}/>
            <Button text={language.ui.change_password} handler={()=>handleClick(1)}/>
            <Button text={language.ui.change_picture} handler={()=>handleClick(0)}/>
            </div>
            
        </div>
    </div>
  )
}

export default Profile