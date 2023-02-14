//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Setinfo {
    event LicenseSended(
        uint256 license_id,
        string license_date,
        string license_text,
        string license_cert
    );

    struct License {
        string license_date;
        string license_text;
        string license_cert;
        /*string license_sig;
        bool license_result;*/
    }

    uint256 public licenseCount = 0;

    mapping(uint256 => License) public licenses;

    constructor() {
        setLicense("Initial Date","Initial text","Initial License");
        //console.log(msg.sender);
    }

    function setLicense(
        string memory  _license_date,
        string memory  _license_text,
        string memory  _license_cert
        /*string memory  _license_sig,
        bool _license_result*/
    ) public {
        licenseCount++;
        licenses[licenseCount] = License(
            _license_date,
            _license_text,
            _license_cert
            /*_license_sig,
            _license_result*/
        );

        emit LicenseSended(licenseCount,_license_date,_license_text, _license_cert);
    }
}
