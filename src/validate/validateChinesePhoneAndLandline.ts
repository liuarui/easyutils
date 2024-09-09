const chinesePhoneAndLandlineRegex = /^(1[3456789]\d{9}|0\d{2,3}(?:-\d{7,8})?(-\d{1,6})?)$/;

export function validateChinesePhoneAndLandline(number: string): boolean {
    if (typeof number !== 'string') {
        return false;
    }
    return chinesePhoneAndLandlineRegex.test(number);
}
