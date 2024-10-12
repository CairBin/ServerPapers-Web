import CryptoJS from 'crypto-js';
import sm from 'sm-crypto';

export enum HashType{
    MD5 = "MD5",
    SHA256 = "SHA256",
    SM3 = "SM3",
}

export function md5(val:string):string{
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.MD5(val)
    );
}

export function sha256(val:string):string{
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.SHA256(val)
    );
}


export function sm3(val:string):string{
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Hex.parse(
            sm.sm3(val)
        )
    );
    
}

export function getHash(val:string, hashType:HashType):string{
    if(hashType === HashType.MD5)
        return md5(val);
    else if(hashType === HashType.SHA256)
        return sha256(val);
    else if(hashType === HashType.SM3)
        return sm3(val);
    else
        return sm3(val);
}