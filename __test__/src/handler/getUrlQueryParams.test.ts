import { getUrlQueryParams } from '@/main';

describe('getUrlQueryParams', () => {
    beforeEach(() => {
        // 清理 mock
        jest.restoreAllMocks();
    });

    it('should return an empty string if window is undefined', () => {
        const originalWindow = global.window;
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        // @ts-ignore
        delete global.window;
        const result = getUrlQueryParams('key');
        expect(result).toBe('');
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'This function can only be used in a browser environment',
        );

        global.window = originalWindow;
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty string if hash is not present', () => {
        Object.defineProperty(window, 'location', {
            value: { hash: '' },
            writable: true,
        });

        const result = getUrlQueryParams('key');
        expect(result).toBe('');
    });

    it('should return the value of the specified key from the query string', () => {
        Object.defineProperty(window, 'location', {
            value: {
                hash: '#/path?key=value&foo=bar',
            },
            writable: true,
        });

        const result = getUrlQueryParams('key');
        expect(result).toBe('value');
    });

    it('should return an empty string if the specified key is not found in the query string', () => {
        Object.defineProperty(window, 'location', {
            value: {
                hash: '#/path?foo=bar',
            },
            writable: true,
        });

        const result = getUrlQueryParams('key');
        expect(result).toBe('');
    });

    it('should correctly decode parameter values', () => {
        Object.defineProperty(window, 'location', {
            value: {
                hash: '#/path?key=value%20with%20spaces&encoded=%E4%B8%AD%E6%96%87',
            },
            writable: true,
        });

        const resultSpaces = getUrlQueryParams('key');
        expect(resultSpaces).toBe('value with spaces');

        const resultChinese = getUrlQueryParams('encoded');
        expect(resultChinese).toBe('中文');
    });

    it('should handle query string with no value for the key', () => {
        Object.defineProperty(window, 'location', {
            value: {
                hash: '#/path?key&foo=bar',
            },
            writable: true,
        });

        const result = getUrlQueryParams('key');
        expect(result).toBe('');
    });

    it('should return the correct value for repeated keys (first occurrence)', () => {
        Object.defineProperty(window, 'location', {
            value: {
                hash: '#/path?key=value1&key=value2',
            },
            writable: true,
        });

        const result = getUrlQueryParams('key');
        expect(result).toBe('value1');
    });
});
