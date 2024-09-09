import { validateChineseLandline } from '@/main'; // 请替换为你的实际路径

describe('validateChineseLandline', () => {
    it('should return false if input is not a string', () => {
        expect(validateChineseLandline(12345678901 as any)).toBe(false);
        expect(validateChineseLandline({} as any)).toBe(false);
        expect(validateChineseLandline([] as any)).toBe(false);
        expect(validateChineseLandline(null as any)).toBe(false);
        expect(validateChineseLandline(undefined as any)).toBe(false);
    });

    it('should validate Chinese landline numbers without area code', () => {
        expect(validateChineseLandline('021-12345678')).toBe(true);
        expect(validateChineseLandline('010-87654321')).toBe(true);
        expect(validateChineseLandline('0755-1234567')).toBe(true);
        expect(validateChineseLandline('010-8765432')).toBe(true);
    });

    it('should validate Chinese landline numbers with area code and extension', () => {
        expect(validateChineseLandline('021-12345678-123')).toBe(true);
        expect(validateChineseLandline('010-87654321-4567')).toBe(true);
        expect(validateChineseLandline('0755-1234567-123456')).toBe(true);
    });

    it('should invalidate incorrect Chinese landline numbers', () => {
        expect(validateChineseLandline('021-123456')).toBe(false);
        expect(validateChineseLandline('0755-12345678-1234567')).toBe(false);
        expect(validateChineseLandline('1234-12345678')).toBe(false);
    });

    it('should invalidate empty and malformed strings', () => {
        expect(validateChineseLandline('')).toBe(false);
        expect(validateChineseLandline(' ')).toBe(false);
        expect(validateChineseLandline('abc')).toBe(false);
        expect(validateChineseLandline('123-456')).toBe(false);
        expect(validateChineseLandline('00-87654321')).toBe(false);
    });
});
