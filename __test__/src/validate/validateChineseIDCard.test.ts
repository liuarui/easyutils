import { validateChineseIDCard } from '@/main';

test('validateChineseIDCard', () => {
    expect(validateChineseIDCard('513701199305091010')).toBe(true);
    expect(validateChineseIDCard('513701930509101')).toBe(true);
    expect(validateChineseIDCard('')).toBe(false);
    expect(validateChineseIDCard('37072519881105149X')).toBe(true);
    expect(validateChineseIDCard('110105194912310020X1')).toBe(false);
});
