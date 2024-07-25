"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customDecrypt = exports.customEncryption = void 0;
const customEncryption = (telegramUserId) => {
    const randomAlphanumeric = Math.random().toString(36).substring(7); // Generate a random alphanumeric string
    return `alpharand_user_${randomAlphanumeric}`;
};
exports.customEncryption = customEncryption;
const customDecrypt = (encryptedId) => {
    const parts = encryptedId.split('_');
    if (parts.length === 3 && parts[0] === 'alpharand' && parts[1] === 'user') {
        return parts[2]; // Extract and return the decrypted ID
    }
    return null; // Return null if decryption fails
};
exports.customDecrypt = customDecrypt;
