import React from 'react'
import { userStore } from '../../utils/stores/userStore'
import style from './SmallProfileCard.module.css'
import { uiStore } from '../../utils/stores/uiStore'


const SmallProfileCard = () => {

const userData = userStore((state)=>state.employeeInfo)
const setDisplayElement = uiStore((state)=>state.setDisplayElement)

  return (
    <div className={style.container} onClick={()=>setDisplayElement(7)}>
        <div className={style.picContainer}>
            <img src={userData.profilePic_path === null ? '/public/images/no-pic.jpg' : userData.profilePic_path} alt="profile" className={style.pic} />
        </div>
        <div className={style.infoContainer}>
            <h2>{`${userData.name} ${userData.last_name}`}</h2>
            <p>{userData.file_num.toString()}</p>
        </div>
    </div>
  )
}

export default SmallProfileCard