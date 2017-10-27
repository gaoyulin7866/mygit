const addCrypto = {};  
const crypto = require('crypto');
  
addCrypto.aesEncrypt = function(data,key){  
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};
//解密报错
addCrypto.aesDecrypt = function(encrypted,key){  
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
  
module.exports = addCrypto;  