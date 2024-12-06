import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import { Navbar, Sidebar } from '../../common_components'
import { uiStore } from '../../utils/stores/uiStore'
import { HumanResources, Locations, Profile, Purchases, Statistics, StockManagement, TaxInformation, Trasactions } from '../../views'

const Home = () => {
const [displayComponent, setDisplayComponent] = useState(null)

const componentArr = [<HumanResources />, <StockManagement/>, <Purchases/>, <Locations />, <Trasactions/>, <Statistics/>, <TaxInformation />, <Profile />]

const displayElement = uiStore((state)=>state.displayElement)

useEffect(()=>{console.log(displayElement)},[displayElement])

  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.bottom}>
      <Sidebar />
      <div className={style.display}>
        {componentArr[displayElement]}
      </div>
      </div>
    </div>
  )
}

export default Home