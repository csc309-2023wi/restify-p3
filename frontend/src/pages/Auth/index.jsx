import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../../components/Navbar";

function Auth() {
    // redirect to profile if logged in
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            navigate("/profile");
        }
    }, [navigate]);

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [usernameErr, setUsernameErr] = useState("");
    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [phoneNumberErr, setPhoneNumberErr] = useState("");
    const [avatarErr, setAvatarErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [password2Err, setPassword2Err] = useState("");
    const [genErr, setGenErr] = useState("");
    const [loginErr, setLoginErr] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
            validateUsername(value);
        }
        if (name === "first-name") {
            setFirstName(value);
            validateFirstName(value);
        }
        if (name === "last-name") {
            setLastName(value);
            validateLastName(value);
        }
        if (name === "email") {
            setEmail(value);
            validateEmail(value);
        }
        if (name === "phone-number") {
            setPhoneNumber(value);
            validatePhoneNumber(value);
        }
        if (name === "avatar") {
            if (e.target.files[0] !== undefined && validateAvatar(e.target.files[0].type)) {
                setAvatar(e.target.files[0]);
            }
        }
        if (name === "password") {
            setPassword(value);
            validatePassword(value);
            validatePassword2(password2);
        }
        if (name === "password2") {
            setPassword2(value);
            validatePassword2(value);
        }
    };

    const validateUsername = (username) => {
        if (username.length < 6) {
            setUsernameErr("Username must be at least 6 characters long.");
        } else if (!username.match(/^[a-zA-Z0-9_]*$/)) {
            setUsernameErr("Username must be alphanumeric.");
        } else {
            setUsernameErr(" ");
            return true;
        }
        return false;
    };
    const validateFirstName = (firstName) => {
        if (firstName.length === 0) {
            setFirstNameErr("First name is required.");
        } else {
            setFirstNameErr("");
            return true;
        }
        return false;
    };
    const validateLastName = (lastName) => {
        if (lastName.length === 0) {
            setLastNameErr("Last name is required.");
        } else {
            setLastNameErr("");
            return true;
        }
        return false;
    };
    const validateEmail = (email) => {
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailErr("Email is invalid.");
        } else {
            setEmailErr("");
            return true;
        }
        return false;
    };
    const validatePhoneNumber = (phoneNumber) => {
        if (phoneNumber !== "" && !phoneNumber.match(/^\d{3}\d{3}\d{4}$/)) {
            setPhoneNumberErr("Phone number is invalid.");
        } else {
            setPhoneNumberErr("");
            return true;
        }
        return false;
    };
    const validatePassword = (password) => {
        if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)) {
            setPasswordErr(
                "Password must be at least 8 characters including a number, lowercase, uppercase, and special character."
            );
        } else {
            setPasswordErr("");
            return true;
        }
        return false;
    };
    const validatePassword2 = (password2) => {
        if (password !== password2) {
            setPassword2Err("Passwords must match.");
        } else {
            setPassword2Err("");
            return true;
        }
        return false;
    };
    const validateAvatar = (avatar) => {
        const validExtensions = ["png", "jpeg", "jpg", "webp"];
        const fileExtension = avatar.split("/")[1];
        const isImage = validExtensions.includes(fileExtension);
        if (!isImage) {
            setAvatarErr("Avatar must be an image");
        } else {
            setAvatarErr("");
        }
        return isImage;
    };

    const validateAll = () => {
        let isValid =
            validateUsername(username) &&
            validateFirstName(firstName) &&
            validateLastName(lastName) &&
            validateEmail(email) &&
            (phoneNumber === "" || validatePhoneNumber(phoneNumber)) &&
            (avatar === null || avatarErr === "") &&
            validatePassword(password) &&
            validatePassword2(password);
        return isValid;
    };

    const generateSignUpBody = () => {
        let form_data = new FormData();
        form_data.append("username", username);
        form_data.append("first_name", firstName);
        form_data.append("last_name", lastName);
        form_data.append("email", email);
        form_data.append("password", password);
        form_data.append("password2", password2);

        if (avatar != null) {
            form_data.append("avatar", avatar);
        }

        if (phoneNumber !== "") {
            form_data.append("phone_number", phoneNumber);
        }

        return form_data;
    };

    const signUp = () => {
        if (!validateAll()) {
            setGenErr("At least one field is invalid.");
            return;
        }
        setGenErr("");
        const requestOptions = {
            method: "POST",
            body: generateSignUpBody(),
        };
        fetch("http://localhost:8000/api/signup/", requestOptions).then(async (response) => {
            if (response.ok) {
                setIsLogin(true);
            } else {
                setGenErr("Username is already taken.");
            }
        });
    };

    const login = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        fetch("http://localhost:8000/api/login/", requestOptions).then(async (response) => {
            if (response.ok) {
                let data = await response.json();
                localStorage.setItem("accessToken", data["access"]);
                window.location.href = "/";
            } else {
                setLoginErr("Invalid username/password.");
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="sidebar">
                    <h2>Welcome to Restify!</h2>
                    {isLogin ? (
                        <>
                            <h3>Create a new account!</h3>
                            <button className="action-btn bordered-dark" onClick={() => setIsLogin(false)}>
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            <h3>Already have an account?</h3>
                            <button className="action-btn bordered-dark" onClick={() => setIsLogin(true)}>
                                Log-in
                            </button>
                        </>
                    )}
                </div>

                <form
                    className="auth-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}>
                    {isLogin ? (
                        <>
                            <h1>Log-in</h1>
                            <h3>
                                Username <mark className="red">*</mark>
                            </h3>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <h3>
                                Password <mark className="red">*</mark>
                            </h3>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => handleInputChange(e)}
                            />
                            <button className="action-btn purple-dark" type="submit">
                                Log-in
                            </button>
                            <p className="error">{loginErr}</p>
                        </>
                    ) : (
                        <>
                            <h1>Sign up</h1>
                            <h3>
                                Username <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{usernameErr}</p>
                            </div>

                            <h3>
                                First Name <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    name="first-name"
                                    value={firstName}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{firstNameErr}</p>
                            </div>

                            <h3>
                                Last Name <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input
                                    type="text"
                                    name="last-name"
                                    value={lastName}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{lastNameErr}</p>
                            </div>

                            <h3>
                                Email <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input type="email" name="email" value={email} onChange={(e) => handleInputChange(e)} />
                                <p className="error">{emailErr}</p>
                            </div>

                            <h3>Phone Number</h3>
                            <div>
                                <input
                                    type="tel"
                                    name="phone-number"
                                    value={phoneNumber}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{phoneNumberErr}</p>
                            </div>

                            <h3>Avatar</h3>
                            <div>
                                <input type="file" name="avatar" onChange={(e) => handleInputChange(e)} />
                                <p className="error">{avatarErr}</p>
                            </div>

                            <h3>
                                Password <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{passwordErr}</p>
                            </div>

                            <h3>
                                Confirm Password <mark className="red">*</mark>
                            </h3>
                            <div>
                                <input
                                    type="password"
                                    name="password2"
                                    value={password2}
                                    onChange={(e) => handleInputChange(e)}
                                />
                                <p className="error">{password2Err}</p>
                            </div>

                            <button className="action-btn purple-dark" onClick={() => signUp()}>
                                Sign up
                            </button>
                            <p className="error">{genErr}</p>
                        </>
                    )}
                </form>
            </div>
        </>
    );
}

export default Auth;
