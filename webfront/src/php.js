const inputFilePath = ''

const uploadFileP12 = async () => {
    fileP12.addEventListener("change", (e) => {
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
        inputSig = forge.util.bytesToHex(signature)
        //console.log(inputSig);
        /*console.log(forge.util.bytesToHex(signature)); */

        // 証明書内の公開鍵で署名値を検証
        const result = cert.publicKey.verify(
          md.digest().bytes(),
          signature
        );
        //setInputResult(result);
        inputResult = result;
        console.log(result)

      };
      reader.readAsDataURL(p12File);
      /* await setString(inputCert);
      const _myStr = await getString();
      setSendContents(_myStr); */
    });

  }