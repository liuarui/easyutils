import { validateChinesePhoneNumber } from '@/main';

test('validateChinesePhoneNumber', () => {
    expect(validateChinesePhoneNumber('13333333333')).toBe(true);
    expect(validateChinesePhoneNumber('1333333333')).toBe(false);
    expect(validateChinesePhoneNumber(void 0 as unknown as string)).toBe(false);
    expect(validateChinesePhoneNumber(null as unknown as string)).toBe(false);
});
