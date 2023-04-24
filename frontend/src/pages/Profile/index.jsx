import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Navbar from "../../components/Navbar";

function Profile() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [avatarURL, setAvatarURL] = useState("");
    const [avatarImg, setAvatarImg] = useState(null);

    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [phoneNumberErr, setPhoneNumberErr] = useState("");
    const [avatarErr, setAvatarErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [password2Err, setPassword2Err] = useState("");
    const [genErr, setGenErr] = useState("");

    const validateFirstName = (firstName) => {
        setFirstName(firstName);
        if (firstName.length === 0) {
            setFirstNameErr("First name must not be empty.");
        } else {
            setFirstNameErr("");
            return true;
        }
        return false;
    };
    const validateLastName = (lastName) => {
        setLastName(lastName);
        if (lastName.length === 0) {
            setLastNameErr("Last name is required.");
        } else {
            setLastNameErr("");
            return true;
        }
        return false;
    };
    const validateEmail = (email) => {
        setEmail(email);
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setEmailErr("Email is invalid.");
        } else {
            setEmailErr("");
            return true;
        }
        return false;
    };
    const validatePhoneNumber = (phoneNumber) => {
        setPhoneNumber(phoneNumber);
        if (phoneNumber !== "" && !phoneNumber.match(/^\d{3}\d{3}\d{4}$/)) {
            setPhoneNumberErr("Phone number is invalid.");
        } else {
            setPhoneNumberErr("");
            return true;
        }
        return false;
    };
    const validatePassword = (password) => {
        setPassword(password);
        validatePassword2(password2);
        if (password !== "" && !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)) {
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
        setPassword2(password2);
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
            validateFirstName(firstName) &&
            validateLastName(lastName) &&
            validateEmail(email) &&
            (phoneNumber === "" || validatePhoneNumber(phoneNumber)) &&
            (avatarImg === null || avatarErr === "") &&
            validatePassword(password) &&
            validatePassword2(password);
        return isValid;
    };
    const handleSave = (event) => {
        event.preventDefault();
        if (!validateAll()) {
            setGenErr("At least one field is invalid.");
            return;
        }
        setGenErr("");
        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: generateSaveBody(),
        };

        fetch("http://localhost:8000/api/user/profile/", requestOptions).then(async (response) => {
            if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            }
            if (!response.ok) {
                console.log(response);
            }
        });
    };

    const generateSaveBody = () => {
        let form_data = new FormData();
        form_data.append("first_name", firstName);
        form_data.append("last_name", lastName);
        form_data.append("email", email);

        if (avatarImg != null) {
            form_data.append("avatar", avatarImg);
        }

        if (phoneNumber !== "") {
            form_data.append("phone_number", phoneNumber);
        }

        if (password !== "") {
            form_data.append("password", password);
        }

        return form_data;
    };

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };
        fetch("http://localhost:8000/api/user/profile/", requestOptions).then(async (response) => {
            if (response.ok) {
                let data = await response.json();
                setFirstName(data["first_name"]);
                setLastName(data["last_name"]);
                setEmail(data["email"]);
                setPhoneNumber(data["phone_number"] ? data["phone_number"] : "");
                setAvatarURL("http://localhost:8000" + data["avatar"]);
            } else if (response.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/auth");
            }
        });
    }, []);

    const changeAvatar = (e) => {
        if (validateAvatar(e.target.files[0].type)) {
            setAvatarURL(URL.createObjectURL(e.target.files[0]));
            setAvatarImg(e.target.files[0]);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container profile">
                <span className="avatar-container avatar-container-profile">
                    <img className="avatar" src={avatarURL} alt="Avatar" />
                </span>
                <input
                    type="file"
                    accept="image/*"
                    className="avatar-input"
                    id="avatar-input"
                    onChange={(e) => changeAvatar(e)}
                />
                <div className="avatar-container">
                    <label htmlFor="avatar-input" className="avatar-label">
                        Change Avatar
                    </label>
                    <p className="error">{avatarErr}</p>
                </div>

                <h3 className="hello">
                    Hello {firstName} {lastName}!
                </h3>

                <form onSubmit={handleSave}>
                    <section>
                        <div className="label-row">
                            <label htmlFor="Your F_Name:" className="left">
                                First Name:
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="f_name"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => validateFirstName(e.target.value)}
                            />
                            <p className="error">{firstNameErr}</p>
                        </div>
                    </section>

                    <section>
                        <div className="label-row">
                            <label htmlFor="Your S_Name" className="left">
                                Last Name:
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="s_name"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => validateLastName(e.target.value)}
                            />
                            <p className="error">{lastNameErr}</p>
                        </div>
                    </section>

                    <section>
                        <div className="label-row">
                            <label htmlFor="Email" className="left">
                                E-mail:
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="email"
                                placeholder="john.does.csc309@gmail.com"
                                value={email}
                                onChange={(e) => validateEmail(e.target.value)}
                            />
                            <p className="error">{emailErr}</p>
                        </div>
                    </section>

                    <section>
                        <div className="label-row">
                            <label htmlFor="Phone Number" className="left">
                                Phone Number:
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                placeholder=""
                                value={phoneNumber}
                                onChange={(e) => validatePhoneNumber(e.target.value)}
                            />
                            <p className="error">{phoneNumberErr}</p>
                        </div>
                    </section>

                    <section>
                        <div className="label-row">
                            <label htmlFor="Password" className="left">
                                Password:
                            </label>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="**********"
                                onChange={(e) => validatePassword(e.target.value)}
                            />
                            <p className="error">{passwordErr}</p>
                        </div>
                    </section>

                    <section>
                        <div className="label-row">
                            <label htmlFor="Password2" className="left">
                                Confirm New Password:
                            </label>
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password2"
                                placeholder=""
                                onChange={(e) => validatePassword2(e.target.value)}
                            />
                            <p className="error">{password2Err}</p>
                        </div>
                    </section>
                    <button className="action-btn purple-dark" type="submit">
                        Save
                    </button>
                    <p className="error">{genErr}</p>
                </form>
            </div>
        </>
    );
}

export default Profile;
