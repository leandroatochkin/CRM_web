import React from 'react'
import style from './Navbar.module.css'
import SmallProfileCard from '../small_profile_card/SmallProfileCard'


const Navbar = () => {



  return (
    <div className={style.container}>
        <SmallProfileCard />
    </div>
  )
}

export default Navbar