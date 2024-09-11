import { validateIPV4, validateIPV6, validateIP } from '@/main'; // 请根据你的文件路径调整导入路径

describe('IP Address Validation', () => {
    describe('validateIPV4', () => {
        it('should return true for valid IPv4 addresses', () => {
            expect(validateIPV4('192.168.1.1')).toBe(true);
            expect(validateIPV4('255.255.255.255')).toBe(true);
            expect(validateIPV4('0.0.0.0')).toBe(true);
        });

        it('should return false for invalid IPv4 addresses', () => {
            expect(validateIPV4('256.256.256.256')).toBe(false);
            expect(validateIPV4('192.168.1')).toBe(false);
            expect(validateIPV4('192.168.1.1.1')).toBe(false);
            expect(validateIPV4('abc.def.ghi.jkl')).toBe(false);
        });
    });

    describe('validateIPV6', () => {
        it('should return true for valid IPv6 addresses', () => {
            expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(validateIPV6('fe80::1')).toBe(true);
            expect(validateIPV6('::1')).toBe(true);
            expect(validateIPV6(null as any)).toBe(false);

            const validIps = [
                '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
                '2001:db8:85a3::8a2e:370:7334',
                '::1',
                '::1',
            ];
            validIps.forEach((ip) => {
                expect(validateIPV6(ip)).toBe(true);
            });
        });

        it('should return false for invalid IPv6 addresses', () => {
            expect(validateIPV6('1200::AB00:1234::2552:7777:1313')).toBe(false);
            expect(validateIPV6('2001:db8::85a3::8a2e:0370:7334')).toBe(false);
            expect(validateIPV6('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(false);
            expect(validateIPV6('::g:1')).toBe(false);

            const invalidIps = [
                '2001:0db8:85a3:0000:0000:8a2e:0370:7334:',
                '2001:0db8:85a3::8a2e::370:7334',
                '1200::AB00:1234::2552:7777:1313',
                '1200:0000:AB00:1234:O000:2552:7777:1313',
                '1200:0000:AB00:1234:0000:2552:7777:1313:0000',
                '1200:0000:AB00:1234:0000:2552:7777',
                '0:000000000:000000:000000:000000::000000:000000:000000:000000',
            ];
            invalidIps.forEach((ip) => {
                expect(validateIPV6(ip)).toBe(false);
            });
        });
    });

    describe('validateIP', () => {
        it('should return true for valid IPv4 addresses', () => {
            expect(validateIP('192.168.1.1')).toBe(true);
            expect(validateIP('255.255.255.255')).toBe(true);
            expect(validateIP('0.0.0.0')).toBe(true);
        });

        it('should return true for valid IPv6 addresses', () => {
            expect(validateIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
            expect(validateIP('fe80::1')).toBe(true);
            expect(validateIP('::1')).toBe(true);
        });

        it('should return false for invalid IP addresses', () => {
            expect(validateIP('256.256.256.256')).toBe(false);
            expect(validateIP('192.168.1')).toBe(false);
            expect(validateIP('192.168.1.1.1')).toBe(false);
            expect(validateIP('abc.def.ghi.jkl')).toBe(false);
            expect(validateIP('1200::AB00:1234::2552:7777:1313')).toBe(false);
            expect(validateIP('2001:db8::85a3::8a2e:0370:7334')).toBe(false);
            expect(validateIP('2001:db8:85a3:0:0:8a2e:370:7334:')).toBe(false);
            expect(validateIP('::g:1')).toBe(false);
        });
    });
});
