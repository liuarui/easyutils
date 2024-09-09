import { validateEmail } from '@/main'; // 请替换为你的实际路径

describe('validateEmail', () => {
    it('should return false if input is not a string', () => {
        expect(validateEmail(123456 as any)).toBe(false);
        expect(validateEmail({} as any)).toBe(false);
        expect(validateEmail([] as any)).toBe(false);
        expect(validateEmail(null as any)).toBe(false);
        expect(validateEmail(undefined as any)).toBe(false);
    });

    it('should validate correct email addresses', () => {
        expect(validateEmail('example@example.com')).toBe(true);
        expect(validateEmail('user.name+tag+sorting@example.com')).toBe(true);
        expect(validateEmail('user_name@example.co.uk')).toBe(true);
        expect(validateEmail('user-name@example.io')).toBe(true);
        expect(validateEmail('user.name@sub.domain.com')).toBe(true);
    });

    it('should invalidate incorrect email addresses', () => {
        expect(validateEmail('plainaddress')).toBe(false);
        expect(validateEmail('@@example.com')).toBe(false);
        expect(validateEmail('user@.com')).toBe(false);
        expect(validateEmail('user@com')).toBe(false);
        expect(validateEmail('user@domain..com')).toBe(false);
        expect(validateEmail('user@domain_com')).toBe(false);
        expect(validateEmail('user@domain.com.')).toBe(false);
    });

    it('should invalidate empty and malformed strings', () => {
        expect(validateEmail('')).toBe(false);
        expect(validateEmail(' ')).toBe(false);
        expect(validateEmail('abc')).toBe(false);
        expect(validateEmail('user@domain,com')).toBe(false);
        expect(validateEmail('user@domain..com')).toBe(false);
    });
});
