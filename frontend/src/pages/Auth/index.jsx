import React, { useState } from "react";
import "./auth.css";

function Auth() {
    const [isLogin, setIsLogin] = useState(true)

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [avatar, setAvatar] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleInputChange = (e) => {
        const {name , value} = e.target;
        if(name === "username"){
            setUsername(value);
        }
        if(name === "first-name"){
            setFirstName(value);
        }
        if(name === "last-name"){
            setLastName(value);
        }
        if(name === "email"){
            setEmail(value);
        }
        if(name === "phone-number"){
            setPhoneNumber(value);
        }
        if(name === "avatar"){
            setAvatar(value);
        }
        if(name === "password"){
            setPassword(value);
        }
        if(name === "password2"){
            setPassword2(value);
        }

    }

    const signUp = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: username,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password2: password2,
             })
        };
        fetch("http://localhost:8000/api/signup/", requestOptions)
            .then(async response => {
                if(response.ok) {
                    setIsLogin(true)
                }
            })
    }

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: username,
                password: password,
             })
        };
        fetch("http://localhost:8000/api/login/", requestOptions)
            .then(async response => {
                if(response.ok) {
                    let data = await response.json()
                    localStorage.setItem('accessToken', data["access"])
                    window.location.href = '/'
                }
            })
    }

    return <div className="container">

        <div className="sidebar">
            <h2>Welcome to Restify!</h2>
            {isLogin ?
                <>
                    <h3>Create a new account!</h3>
                    <button className="action-btn bordered-dark" onClick={() => setIsLogin(false)}>Sign up</button>
                </>
                :
                <>
                    <h3>Already have an account?</h3>
                    <button className="action-btn bordered-dark" onClick={() => setIsLogin(true)}>Log-in</button>
                </>
            }
            
        </div>

        <div className="auth-form">
            {isLogin ?
                <>
                    <h1>Log-in</h1>
                    <h3>Username <mark className="red">*</mark></h3>
                    <input type="text" name="username" value={username} onChange={(e) => handleInputChange(e)}/>
                    <h3>Password <mark className="red">*</mark></h3>
                    <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)}/>
                    <button className="action-btn purple-dark" onClick={() => login()}>Log-in</button>
                    
                </>
                :
                <>
                    <h1>Sign up</h1>
                    <h3>Username <mark className="red">*</mark></h3>
                    <input type="text" name="username" value={username} onChange={(e) => handleInputChange(e)}/>
                    <h3>First Name <mark className="red">*</mark></h3>
                    <input type="text" name="first-name" value={firstName} onChange={(e) => handleInputChange(e)}/>
                    <h3>Last Name <mark className="red">*</mark></h3>
                    <input type="text" name="last-name" value={lastName} onChange={(e) => handleInputChange(e)}/>
                    <h3>Email <mark className="red">*</mark></h3>
                    <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e)}/>
                    <h3>Phone Number</h3>
                    <input type="tel" name="phone-number" value={phoneNumber} onChange={(e) => handleInputChange(e)}/>
                    <h3>Avatar</h3>
                    <input type="file" name="avatar" value={avatar} onChange={(e) => handleInputChange(e)}/>
                    <h3>Password <mark className="red">*</mark></h3>
                    <input type="password" name="password" value={password} onChange={(e) => handleInputChange(e)}/>
                    <h3>Confirm Password <mark className="red">*</mark></h3>
                    <input type="password" name="password2" value={password2} onChange={(e) => handleInputChange(e)}/>
                    <button className="action-btn purple-dark" onClick={() => signUp()}>Sign up</button>
                </>
            }
            
        </div>

    </div>;
    
}

export default Auth;
