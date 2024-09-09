import { chinesePhoneRegex } from '@/constants';

export function validateChinesePhoneNumber(phoneNumber: string): boolean {
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    return chinesePhoneRegex.test(phoneNumber);
}
