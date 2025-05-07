import CryptoJS from 'crypto-js';
import { CodeData } from '../types/CodeData';


/**
 * AES 加密函数（CBC 模式）
 */
export const encrypt = (data: CodeData, key: string): string => {
  const hash = CryptoJS.SHA1(key).toString();
  const SECRET_KEY = CryptoJS.enc.Utf8.parse(hash);
  const IV = CryptoJS.enc.Utf8.parse(hash);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 输出 Base64 格式密文
};

/**
 * AES 解密函数（CBC 模式）
 */
export const decrypt = (ciphertext: string, key: string): CodeData => {
  const hash = CryptoJS.SHA1(key).toString();
  const SECRET_KEY = CryptoJS.enc.Utf8.parse(hash);
  const IV = CryptoJS.enc.Utf8.parse(hash);

  const decrypted = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)); // 转换为 UTF-8 字符串
};