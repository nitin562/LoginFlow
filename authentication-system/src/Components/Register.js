import React, { useState, useContext } from "react";
import context from "../context/MainCont";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [infoObj, setinfoObj] = useState({ name: "", email: "", password: "" });
  const [error, seterror] = useState("");
  const gState = useContext(context);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.type === "text") {
      setinfoObj({ ...infoObj, name: e.target.value });
    } else if (e.target.type === "email") {
      setinfoObj({ ...infoObj, email: e.target.value });
    } else {
      setinfoObj({ ...infoObj, password: e.target.value });
    }
  };
  const register = async () => {
    const url = "http://localhost:8000/api/auth/Register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoObj),
    };
    const result = await fetch(url, options);
    const jResult = await result.json();
    if (jResult.Success === 0) {
      let Message = "";
      if ("name" in jResult.error) {
        Message += jResult.error.name.msg;
      }
      if ("email" in jResult.error) {
        if (Message === "") {
          Message += jResult.error.email.msg;
        } else Message += " and " + jResult.error.email.msg;
      }

      if ("password" in jResult.error) {
        if (Message === "") {
          Message += jResult.error.password.msg;
        } else Message += " and " + jResult.error.password.msg;
      }
      seterror(Message);
      setTimeout(() => {
        seterror("");
      }, 1500);
    } else {
      gState.update({
        name: jResult.username,
        token: jResult.token,
        login: true,
      });
      navigate("/");
    }
  };
  return (
    <div className="field">
      <div className="LoginArea">
        <img
          src="http://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Enter user name"
          value={infoObj.name}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Enter email id"
          value={infoObj.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={infoObj.password}
          onChange={handleChange}
        />
        <div className="panel">
          <button onClick={register}>Register</button>
        </div>
      </div>
      <p className="error">{error}</p>
    </div>
  );
}
