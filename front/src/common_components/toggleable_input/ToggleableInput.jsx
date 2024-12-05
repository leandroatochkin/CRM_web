import React,{useState} from 'react'
import { EyeOpen, EyeClosed } from '../../utils/icons'
import style from './ToggleableInput.module.css'

const ToggleableInput = ({handleChange}) => {
    const [showInput, setShowInput] = useState(false)

  return (
    <>
    <input type={showInput ? 'text' : 'password'} name='password'  placeholder='password'onChange={handleChange} className={style.inputPass}/>
    <button className={style.eyeButton} onClick={()=>setShowInput(!showInput)}><span id="togglePassword" className={style.eye}>{showInput ? <EyeClosed />  : <EyeOpen />}</span></button>
    </>
  )
}

export default ToggleableInput