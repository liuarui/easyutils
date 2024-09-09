const chinesePhoneRegex = /^(\+?86)?1[3-9]\d{9}$/;

export function validateChinesePhoneNumber(phoneNumber: string): boolean {
    if (typeof phoneNumber !== 'string') {
        return false;
    }
    return chinesePhoneRegex.test(phoneNumber);
}
