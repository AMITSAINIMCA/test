'use strict';

const crypto = require('crypto');
const ENCRYPTION_KEY = '5654654^%$^$^$^HFHgf5rgf&**&%^F5'; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
var cyptjs = {}
cyptjs.encrypt = function (text) {
    var iv = crypto.randomBytes(IV_LENGTH);
    var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

cyptjs.decrypt = function (text) {
    var textParts = text.split(':');
    var iv = new Buffer(textParts.shift(), 'hex');
    var encryptedText = new Buffer(textParts.join(':'), 'hex');
    var decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

cyptjs.passencrypt = function (data) {
    var cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

cyptjs.passdecrypt = function (data) {
    var decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
module.exports = cyptjs;