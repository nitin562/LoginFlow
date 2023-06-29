import React, { useContext } from 'react'
import './dash.css'
import { useNavigate } from 'react-router-dom'
import context from '../context/MainCont'
export default function Dashboard() {
  const capitalize=(str)=>{
    let newstr=str.slice(0,1).toUpperCase()+str.slice(1)
    return newstr
  }
  const navigate=useNavigate()
  const gState=useContext(context)
  return (
    <div className='field'>

        {!gState.state.login&&<button className='login' onClick={()=>{
          navigate('/login')
        }}>LOGIN/SIGNUP</button>}
        {gState.state.login&&<p id="noteMsg">Welcome Back {capitalize(gState.state.name)}</p>}
        {gState.state.login&&<button className="login" onClick={()=>{
          gState.update({name:"",login:false,token:""})
        }}>LogOut</button>}
    </div>
  )
}
