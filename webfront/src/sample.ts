import { ethers } from "ethers";
import artifact from "../../artifacts/contracts/Setinfo.sol/Setinfo.json";


const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, artifact.abi, provider);  // const { METHOD_NAME } = contract.functions;
const contractWithSigner = contract.connect(signer);

export class Sample {
    static setInfo = (contract: ethers.Contract ,pemCert:string) => {
        const { licenses, setLicense, licenseCount } = contract.functions;

        const settingLicence = async () => {
            await setLicense("2022/12/24", "基本情報技術者試験", pemCert);
        }

        return {
            settingLicence
        }
    }

}

(function(cert){
    const {settingLicence} = Sample.setInfo(contractWithSigner,cert);
    settingLicence();
}(process.argv[2]))

