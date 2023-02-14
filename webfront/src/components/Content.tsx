import React, { useEffect, useState, useRef, FC } from "react";
import { ethers } from "ethers";
import "../stylesheets/Contract.css"
//import "../stylesheets/Navbar.css"
import "../stylesheets/Navtest.css"
import { years, months, days, attributes } from "../difinition";
import { Navbar } from "./Navbar";
import pic from "../../img/react.png"

/*type Date = {
  year: string;
  month: string;
  day: string;
}*/

type License = {
  license_id: string,
  license_date: string;
  license_text: string;
  license_cert: string,
  /*license_sig: string,
  license_result: boolean*/
}

const useContent = (
  contract: ethers.Contract
) => {
  //myStrを呼び出すための関数を取得
  const { licenses, setLicense, licenseCount } = contract.functions;
  const forge = require('node-forge/dist/forge.min.js');

  const [licenseCountValue, setLicenseCountValue] = useState<string>("");
  const [licenseValue, setLicenseValue] = useState<License[]>([]);
  //const [licenseText, setLicenseText] = useState<string>("");

  //useStateは変更されると再レンダリングされる
  let inputText = "";
  let inputCert = "";
  /*let inputSig = "";
  let inputResult = false;*/


  useEffect(() => {
    const getLicense = async () => {
      const _licenseCount = await licenseCount();
      setLicenseCountValue(_licenseCount);

      const _licenses = []
      for (let i = 1; i <= _licenseCount; i++) {
        const _license = await licenses(i);
        _licenses.push({
          ..._license,
          license_id: i
        })
      }
      setLicenseValue(_licenses);
      console.log(_licenses);
    }
    getLicense();
  }, [])

  const uploadFileP12 = async () => {
    fileP12.addEventListener("change", (e: any) => {
      let p12File = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        let p12DataUrl = reader.result;
        let p12B64 = p12DataUrl.split("base64,")[1];
        let p12Der = forge.util.decode64(p12B64);
        let p12Asn1 = forge.asn1.fromDer(p12Der);
        let p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, "ginga0093");

        // 証明書
        let cert = p12.getBags({ bagType: forge.pki.oids.certBag })[
          forge.pki.oids.certBag
        ][0].cert;
        const pemCert = forge.pki.certificateToPem(cert);
        console.log(pemCert);
        //setInputCert(pemCert);
        inputCert = pemCert;

        // 秘密鍵
        let privateKey = p12.getBags({
          bagType: forge.pki.oids.pkcs8ShroudedKeyBag
        })[forge.pki.oids.pkcs8ShroudedKeyBag][0].key;

        // SHA256で署名対象データのハッシュ値を作成
        const md = forge.md.sha256.create();
        md.update("サーバに送信するデータ", "utf8");

        // 秘密鍵でハッシュ値を暗号化 = 署名値
        const signature = privateKey.sign(md);
        //setInputSig(forge.util.bytesToHex(signature));
        //inputSig = forge.util.bytesToHex(signature)
        //console.log(inputSig);
        /*console.log(forge.util.bytesToHex(signature)); */

        // 証明書内の公開鍵で署名値を検証
        const result = cert.publicKey.verify(
          md.digest().bytes(),
          signature
        );
        //setInputResult(result);
        //inputResult = result;
        //console.log(result)

      };
      reader.readAsDataURL(p12File);
      /* await setString(inputCert);
      const _myStr = await getString();
      setSendContents(_myStr); */
    });

  }

  const updateText = async (e: React.ChangeEvent<HTMLInputElement>) => inputText = e.target.value;



  const requestSetLicense = async (inputDate: string) => {
    //uploadFileP12();
    if (inputCert === "") return;
    await setLicense(inputDate, inputText, inputCert);
  };

  return {
    /* myStr: sendContents,
     getfileP12 */
    licenseCount: licenseCountValue,
    licences: licenseValue,
    updateText,
    requestSetLicense,
    uploadFileP12
  }
}

export const Content: FC<{ contract: ethers.Contract }> = ({ contract }) => {
  const { licenseCount, licences, updateText, requestSetLicense, uploadFileP12 } = useContent(contract);
  const [show, setShow] = useState<boolean>(false);

  let d_year = 2000;
  let d_month = 1;
  let d_day = 1;
  let date = "";

  const handleSetLicense = async () => {
    await dateSet();
    await requestSetLicense(date);
    window.location.reload();
  }

  const dateSet = async () => {
    date = `${d_year} / ${d_month} / ${d_day}`;
  }

  const toggleMenu = () => document.body.classList.toggle("open");

  const Modal = () => {
    const birthYearRef = useRef(null);
    const birthMonthRef = useRef(null);
    const birthDayRef = useRef(null);
    const attributeRef = useRef(null);

    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);

    const [myAttribute, setMyAttribute] = useState();

    //DOMの値を動的に変更したい場合はuseStateを使う
    const [formVisible, setFormVisible] = useState<boolean>(false);

    useEffect(() => {
      uploadFileP12();
    }, [])

    const selectBirthYear = async (e: any) => {
      d_year = e.target.value;
      setYear(e.target.value);
    }

    const selectBirthMonth = async (e: any) => {
      d_month = e.target.value;
      setMonth(e.target.value);
    }

    const selectBirthDay = async (e: any) => {
      d_day = e.target.value;
      setDay(e.target.value);
    }

    const selectAttribute = (e: any) => {
      setMyAttribute(e.target.value);
      if (e.target.value == "-- set your attribute --") {
        setFormVisible(false);
      }
      else {
        setFormVisible(true);
      }
    }

    if (show) {
      return (
        <div id="overlay">
          <div id="modalContent">
            <div>
              attribute
              <select ref={attributeRef} value={myAttribute} onChange={selectAttribute}>
                {attributes.map((attribute) =>
                  (<option value={attribute}>{attribute}</option>)
                )}
              </select>
            </div>
            <div style={{ visibility: formVisible ? "visible" : "hidden" }}>
              <label>
                <select ref={birthYearRef} value={year} onChange={selectBirthYear}>
                  {years.map((year) =>
                    (<option value={year}>{year}</option>)
                  )}
                </select>年
              </label>
              <label>
                <select ref={birthMonthRef} value={month} onChange={selectBirthMonth}>
                  {months.map((month) =>
                    (<option value={month}>{month}</option>)
                  )}
                </select>月
              </label>
              <label>
                <select ref={birthDayRef} value={day} onChange={selectBirthDay}>
                  {days.map((day) =>
                    (<option value={day}>{day}</option>)
                  )}
                </select>日
              </label>
              <label>
                <input id="formContext" type={"text"} onChange={updateText} />
              </label>
              <label className={"inputfile"}>
                <input id="fileP12" type="file" />
              </label>
            </div>
            <div>
              <div className={"updateField"}>
                <button className={"updateButton"} onClick={handleSetLicense}>
                  <li className={"updateText"} >update!</li>
                </button>
              </div>
            </div>
            <button onClick={() => setShow(false)}>Close</button>
          </div>
        </div >
      )
    } else {
      return null;
    }
  }

  return (
    <div>
      {/*<button onClick={toggleMenu} className="burger material-symbols-outlined">
        menu
      </button>
      <nav className="navbar">
        <div className="logo">
          <img src={pic} />
          <span>Personal Infomation Storage</span>
        </div>
        </nav>*/}
      <Navbar />
      {/*<div className="updateField">
        <button className="updateButton" onClick={() => { setShow(true) }}>
          <li className="updateText">Modal</li>
        </button>
      </div>
      <Modal />
      <div>
        <p className={"myStr"}>{`licenseCount...${licenseCount}`}</p>
      </div>*/}
      <div>
        <table className={"table"}>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>ID</th>
              <th style={{ width: "40%" }}>date</th>
              <th style={{ width: "40%" }}>text</th>
            </tr>
          </thead>
          <tbody>
            {licences.map((l, index) => <tr key={`licence.${index}`}>
              <td width="10%">{l.license_id}</td>
              <td width="30%">{l.license_date}</td>
              <td width="30%">{l.license_text}</td>
              <td width="30%">
                <button className="hideButton">
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                  <span className="buttonText">
                    hide
                  </span>
                </button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}