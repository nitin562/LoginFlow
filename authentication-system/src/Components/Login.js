import React,{useState, useContext} from 'react'
import './login.css'
import { Link, useNavigate} from 'react-router-dom'
import context from '../context/MainCont'

export default function Login() {
    const gState=useContext(context)
    const navigate=useNavigate()
    const [infoObj, setinfoObj] = useState({email:"",password:""})
    const [error, seterror] = useState("")
    const handleChange=(e)=>{
        if(e.target.type==='email'){
            setinfoObj({...infoObj,email:e.target.value})
        }
        else{
            setinfoObj({...infoObj,password:e.target.value})

        }
    }
    const handleLogin=async()=>{
        const url="http://localhost:8000/api/auth/login"
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            }
            ,body:JSON.stringify(infoObj)
        }
        const result=await fetch(url,options)
        const jResult=await result.json()
        
        if(jResult.Success===0){
            let Message=""
            if("email" in jResult.error){
                Message+=jResult.error.email.msg
            }
            if("password" in jResult.error){
                if(Message===""){
                    Message+=jResult.error.password.msg
                }
                else
                    Message+=" and "+jResult.error.password.msg
            }
            seterror(Message)
            setTimeout(()=>{seterror("")},1500)
        }
        else{
            gState.update({login:true,token:jResult.token,name:jResult.username})

            navigate('/')
        }
        
        
        
    }
  return (
    <div className='field'>
        <div className="LoginArea">
            <img src="http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png" alt="" />
            <input type="email" placeholder='Enter email id' value={infoObj.email} onChange={handleChange}/>
            <input type="password" placeholder='Enter password' value={infoObj.password} onChange={handleChange}/>
            <div className="panel">
                <Link to="/Register">Register Me</Link>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
        <p className="error">{error}</p>
    </div>
  )
}
