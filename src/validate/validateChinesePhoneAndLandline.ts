import { chinesePhoneAndLandlineRegex } from '../constants/index';
export function validateChinesePhoneAndLandline(number: string): boolean {
    if (typeof number !== 'string') {
        return false;
    }
    return chinesePhoneAndLandlineRegex.test(number);
}
