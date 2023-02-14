import React, { FC } from "react";
import "../stylesheets/Navtest.css";
import pic from "../../img/react.png"
import { Dropdown } from "./Dropdown";

export const Navbar: FC = () => {
    return (
        <div className="navtest">
            <nav>
                <nav className="viewtest">
                    <img src={pic} />
                    <span className="title">
                        My Dapps
                    </span>
                    {/*<span className="dropdown">*/}
                    <Dropdown />
                    {/*</span>*/}
                    <button className="send">
                        <span className="material-symbols-outlined" >send</span>
                        <span className="text">
                            send
                        </span>
                    </button>
                </nav>
            </nav>
        </div>
    );
}