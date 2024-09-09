import { validateChinesePhoneAndLandline } from '@/main'; // 请替换为你的实际路径

describe('validateChinesePhoneAndLandline', () => {
    it('should return false if input is not a string', () => {
        expect(validateChinesePhoneAndLandline(12345678901 as any)).toBe(false);
        expect(validateChinesePhoneAndLandline({} as any)).toBe(false);
        expect(validateChinesePhoneAndLandline([] as any)).toBe(false);
        expect(validateChinesePhoneAndLandline(null as any)).toBe(false);
        expect(validateChinesePhoneAndLandline(undefined as any)).toBe(false);
    });

    it('should validate Chinese mobile phone numbers', () => {
        expect(validateChinesePhoneAndLandline('13800138000')).toBe(true);
        expect(validateChinesePhoneAndLandline('15700157000')).toBe(true);
        expect(validateChinesePhoneAndLandline('19900199000')).toBe(true);
    });

    it('should invalidate incorrect Chinese mobile phone numbers', () => {
        expect(validateChinesePhoneAndLandline('23800138000')).toBe(false);
        expect(validateChinesePhoneAndLandline('1380013800')).toBe(false);
        expect(validateChinesePhoneAndLandline('138001380000')).toBe(false);
        expect(validateChinesePhoneAndLandline('abc13800138000')).toBe(false);
    });

    it('should validate Chinese landline numbers without area code', () => {
        expect(validateChinesePhoneAndLandline('021-12345678')).toBe(true);
        expect(validateChinesePhoneAndLandline('010-87654321')).toBe(true);
        expect(validateChinesePhoneAndLandline('0755-1234567')).toBe(true);
    });

    it('should validate Chinese landline numbers with area code and extension', () => {
        expect(validateChinesePhoneAndLandline('021-12345678-123')).toBe(true);
        expect(validateChinesePhoneAndLandline('010-87654321-4567')).toBe(true);
        expect(validateChinesePhoneAndLandline('0755-1234567-123456')).toBe(true);
    });

    it('should invalidate incorrect Chinese landline numbers', () => {
        expect(validateChinesePhoneAndLandline('110-1234256')).toBe(false);
        expect(validateChinesePhoneAndLandline('110-8765432')).toBe(false);
        expect(validateChinesePhoneAndLandline('0755-12345678-1234567')).toBe(false);
        expect(validateChinesePhoneAndLandline('1234-12345678')).toBe(false);
    });

    it('should invalidate empty and malformed strings', () => {
        expect(validateChinesePhoneAndLandline('')).toBe(false);
        expect(validateChinesePhoneAndLandline(' ')).toBe(false);
        expect(validateChinesePhoneAndLandline('abc')).toBe(false);
        expect(validateChinesePhoneAndLandline('123-456')).toBe(false);
        expect(validateChinesePhoneAndLandline('00-87654321')).toBe(false);
    });
});
