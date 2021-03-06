import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { emailRgx, passwordRgx } from "./RegexHelper";
import Swal from "sweetalert2";
import "./auth.css";

export default function Reg() {

    const history = useNavigate();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);


    const onFieldChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }

        validateField(name);
    };

    const resetErrByFieldName = (name) => {
        switch (name) {
            case "name":
                setNameError(null);
                break;
            case "username":
                setUsernameError(null);
                break;
            case "email":
                setEmailError(null);
                break;
            case "password":
                setPasswordError(null);
                break;
            default:
                break;
        }
    };

    const resetFields = () => {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
    };

    const setErrorByFieldName = (name, error) => {
        switch (name) {
            case "name":
                setNameError(error);
                break;
            case "username":
                setUsernameError(error);
                break;
            case "email":
                setEmailError(error);
                break;
            case "password":
                setPasswordError(error);
                break;
            default:
                break;
        }
    };

    const validateField = (e) => {
        if (!e.target || !e.target.name) {
            return;
        }

        const { name, value } = e.target;
        resetErrByFieldName(name);

        if (!value) {
            setErrorByFieldName(name, "???????? ???? ??????????????????");
            return;
        }

        let error = null;
        switch (name) {
            case "name": {
                if (value.length < 2) {
                    error = "?????? ???????????? ?????????????????? ???????????? 2 ????????????????";
                }
                break;
            }
            case "username": {
                if (value.length < 5) {
                    error = "?????? ???????????????????????? ???????????? ?????????????????? ???????????? 5 ????????????????";
                }
                break;
            }
            case "email": {
                if (!emailRgx.test(String(value).toLowerCase())) {
                    error = "Email ????????????????????????";
                }
                break;
            }
            case "password":
                if (!passwordRgx.test(String(value).toLowerCase())) {
                    error = "???????????? ???????????? ?????????????????? ???????????? 5 ????????????????";
                }
                break;
            default:
                break;
        }

        if (error) {
            setErrorByFieldName(name, error);
        }

        return error == null;
    };

    const validateAllFields = () => {
        const items = [
            { name: "name", value: name },
            { name: "username", value: username },
            { name: "email", value: email },
            { name: "password", value: password },
        ];

        return items.every((item) => validateField({ target: item }));
    };

    const onSubmit = () => {
        const isValid = validateAllFields();

        if (isValid) {
            resetFields();
            Swal.fire({
                title: "????????????????????????",
                text: "?????????????? ???? ?????????????????????? ???? ?????????? ??????????!",
                icon: "success",
                confirmButtonText: "????????????????????",
            });
            history("/");
            return;
        }

        Swal.fire({
            title: "????????????",
            text: "?????????????????? ???????????? ?????? ??????????????????????!",
            icon: "error",
            confirmButtonText: "????????????????????",
        });
    };


    return (
        <div className="auth">
            <p className="auth_header">????????????????????????????????????</p>
            <div className="auth_red">
                <p>?? ?????? ?????? ???????? ???????????????</p>
                <NavLink className="auth_link" to="/auth">
                    ??????????
                </NavLink>
            </div>

            <form className="form">
                <p className="label">??????</p>
                {nameError && <div className="errors">{nameError}</div>}
                <input
                    onBlur={(e) => validateField(e)}
                    onChange={(e) => onFieldChange(e)}
                    value={name}
                    name="name"
                    className="form_input"
                    type="text"
                    placeholder="??????"
                ></input>

                <p className="label">????. ??????????</p>
                {emailError && <div className="errors">{emailError}</div>}
                <input
                    onBlur={(e) => validateField(e)}
                    onChange={(e) => onFieldChange(e)}
                    value={email}
                    name="email"
                    className="form_input"
                    type="email"
                    placeholder="????. ??????????"
                ></input>

                <p className="label">?????? ????????????????????????</p>
                {usernameError && <div className="errors">{usernameError}</div>}
                <input
                    onBlur={(e) => validateField(e)}
                    onChange={(e) => onFieldChange(e)}
                    value={username}
                    name="username"
                    className="form_input"
                    type="text"
                    placeholder="?????? ????????????????????????"
                ></input>

                <p className="label">????????????</p>
                {passwordError && <div className="errors">{passwordError}</div>}
                <input
                    onBlur={(e) => validateField(e)}
                    onChange={(e) => onFieldChange(e)}
                    value={password}
                    name="password"
                    className="form_input"
                    type="password"
                    placeholder="????????????"
                ></input>

                <br></br>
                <br></br>

                <input
                    className="form_btn"
                    type="button"
                    value="????????????????????????????????????"
                    onClick={onSubmit}
                />
            </form>
        </div>
    );
}
