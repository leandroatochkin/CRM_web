import React from 'react'
import { sidebar_es } from '../../utils/data/text'
import style from './Sidebar.module.css'
import DoubleArrow from '../../utils/icons/DoubleArrow'
import { uiStore } from '../../utils/stores/uiStore'

const Sidebar = () => {

const setDisplayElement = uiStore((state)=>state.setDisplayElement)


  return (
    <div className={style.container}>
        {sidebar_es.map((elem, index)=>(
            (<div key={index} className={style.sidebarBtn} onClick={()=>{setDisplayElement(index)}}>{elem}<DoubleArrow height={'10%'} width={'10%'}/></div>)
        ))}
    </div>
  )
}

export default Sidebar