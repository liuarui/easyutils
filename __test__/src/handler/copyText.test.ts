import { copyText as copyTextImpl } from 'easycopyjs/main';

import { copyText } from '@/main';

jest.mock('easycopyjs/main', () => ({
    copyText: jest.fn(),
}));

describe('copyText', () => {
    it('should call copyTextImpl with correct parameters', () => {
        const text = 'Hello, World!';
        const opt = { container: document.createElement('div') };

        copyText(text, opt);

        expect(copyTextImpl).toHaveBeenCalledWith(text, opt);
    });

    it('should call copyTextImpl with only text when no options provided', () => {
        const text = 'Hello, World!';

        copyText(text);

        expect(copyTextImpl).toHaveBeenCalledWith(text, undefined);
    });
});
