"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
// Function to generate a random encryption key
const generateEncryptionKey = () => {
    return crypto_1.default.randomBytes(32).toString('base64');
};
// Generate the key
const encryptionKey = generateEncryptionKey();
// Write the key to a .env file or secrets management system
fs_1.default.writeFileSync('.env', `ENCRYPTION_KEY=${encryptionKey}`);
console.log('Encryption key generated and saved to .env file.');
