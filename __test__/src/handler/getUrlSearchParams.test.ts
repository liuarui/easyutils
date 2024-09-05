import { getUrlSearchParams } from '@/main';

describe('getUrlSearchParams', () => {
    beforeEach(() => {
        // 清理 mock
        jest.restoreAllMocks();
    });

    it('should return an empty string if window is undefined', () => {
        const originalWindow = global.window;
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();

        // @ts-ignore
        delete global.window;
        const result = getUrlSearchParams('key');
        expect(result).toBe('');
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'This function can only be used in a browser environment'
        );

        global.window = originalWindow;
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty string if search params are not present', () => {
        Object.defineProperty(window, 'location', {
            value: { search: '' },
            writable: true,
        });

        const result = getUrlSearchParams('key');
        expect(result).toBe('');
    });

    it('should return the value of the specified key from the search params', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?key=value&foo=bar',
            },
            writable: true,
        });

        const result = getUrlSearchParams('key');
        expect(result).toBe('value');
    });

    it('should return an empty string if the specified key is not found in the search params', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?foo=bar',
            },
            writable: true,
        });

        const result = getUrlSearchParams('key');
        expect(result).toBe('');
    });

    it('should correctly decode parameter values', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?key=value%20with%20spaces&encoded=%E4%B8%AD%E6%96%87',
            },
            writable: true,
        });

        const resultSpaces = getUrlSearchParams('key');
        expect(resultSpaces).toBe('value with spaces');

        const resultChinese = getUrlSearchParams('encoded');
        expect(resultChinese).toBe('中文');
    });

    it('should handle search params with no value for the key', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?key&foo=bar',
            },
            writable: true,
        });

        const result = getUrlSearchParams('key');
        expect(result).toBe('');
    });

    it('should return the correct value for repeated keys (first occurrence)', () => {
        Object.defineProperty(window, 'location', {
            value: {
                search: '?key=value1&key=value2',
            },
            writable: true,
        });

        const result = getUrlSearchParams('key');
        expect(result).toBe('value1');
    });
});
