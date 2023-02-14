import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate, redirect } from "react-router-dom";
import { ethers } from "ethers";
import artifact from "../../artifacts/contracts/Setinfo.sol/Setinfo.json";
import Home from "./components/Home";
import {Login} from "./components/Login";
import {Content} from "./components/Content"
import User from "./User"
import { Sample } from "./sample";


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const App: FC =  () =>  {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, artifact.abi, provider);  // const { METHOD_NAME } = contract.functions;
    const contractWithSigner = contract.connect(signer);

        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}>
                    </Route>
                    <Route path="/" element={User.isLoggedIn()?(<Home />): (<Navigate to="/login" />)}>
                    </Route>
                    <Route path="/content" element={User.isLoggedIn()? (<Content contract={contractWithSigner} />) : (<Navigate to="/login" />)}>
                    </Route>
                </Routes>
            </BrowserRouter >
        );
    
}