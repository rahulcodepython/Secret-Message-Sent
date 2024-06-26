export const Decrypt = (token, key) => {
    let decryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        decryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decryptedToken;
}

export const Encrypt = (token, key) => {
    let encryptedToken = '';
    for (let i = 0; i < token?.length; i++) {
        encryptedToken += String.fromCharCode(token.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedToken;
}