import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../stylesheets/Login.css"
import pic from "../../img/react.png" //型定義をしてから行うこと
import User from "../User"

export const Login: FC = () => {

    let number: string
    let password: string;
    
    const navigate = useNavigate();
    const [loginFlag, setLoginFlag] = useState<string>("");

    const errMessage = User.getLocalStorage('isErrMessage');

    useEffect(() => {
        //navigate('/content');
        if(User.isLoggedIn()){
            navigate('/content');
        }
    },[])

    const click = async () => {
        const isLoginSuccess = await User.login(number, password);
        if (isLoginSuccess) {
        }
        else {
            User.set('isLoginFailed', 'メールアドレスかパスワードが違います');
            User.set('isErrMessage', 'true');
            ErrMessageView();
        }
        window.location.reload();
    };

    const handleNumber = async (e: React.ChangeEvent<HTMLInputElement>) => {
        number = e.target.value;
    }
    const handlePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
        password = e.target.value;
    }

    const ErrMessageView = () => {
        if (errMessage == 'true') {
            return (
                <div>
                    {User.getLocalStorage('isLoginFailed')}
                </div>
            );
        }
        else {
            return null;
        }
    }

    return (
        <div className="login">
            <div className="login-icon">
                <img src={pic} />
            </div>
            <h1>Login</h1>
            <form className="login-form">
                <div className="textbox">
                    <input type="text" placeholder="User Address" onChange={handleNumber} />
                    <span className="material-symbols-outlined">
                        account_circle
                    </span>
                </div>
                <div className="textbox">
                    <input type="password" placeholder="Password" onChange={handlePassword} />
                    <span className="material-symbols-outlined">
                        lock
                    </span>
                </div>
                <ErrMessageView />
                <button type="submit" onClick={click}>LOGIN</button> {/* 動作しなかったら必ず無名関数orアローで確認 */}
            </form>
        </div>
    );

}