import { useState } from "react";
import context from "./MainCont";

const GiveContext=(props)=>{
    const s={
        login:false,
        token:"",
        name:""
    }
    const [state, setState] = useState(s)
    const update=(val)=>{
        setState({...state,...val})
    }
    return (
        <context.Provider value={{state,update}}>
            {props.children}
        </context.Provider>)
}
export default GiveContext