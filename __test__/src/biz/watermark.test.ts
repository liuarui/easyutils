import { createWatermark, destroyWatermark } from '@/main'; // 替换成实际文件路径

describe('Watermark', () => {
    let container: HTMLElement;
    beforeEach(() => {
        jest.useFakeTimers();
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        destroyWatermark();
        document.body.removeChild(container);
    });

    it('should warn when container is document.body', () => {
        createWatermark({ container: document.body });
        const watermarkDiv = document.body.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
    });
    it('should warn when container is null', () => {
        console.warn = jest.fn();
        createWatermark({ container: null as any });
        expect(console.warn).toHaveBeenCalledWith('createWatermark配置的container不能为空');
    });

    it('should create a watermark with default settings', () => {
        createWatermark({ container });
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
    });

    it('should create a watermark with custom content', () => {
        createWatermark({ container, content: 'Test Watermark' });
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
    });

    it('should handle container with existing children', () => {
        const firstChild = document.createElement('div');
        container.appendChild(firstChild);

        createWatermark({ container });
        expect(container.firstChild).not.toBe(firstChild);
    });

    it('should create watermark with timestamp', () => {
        createWatermark({ container, timestamp: 'YYYY-MM-DD HH:mm:ss' });
        let watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
        destroyWatermark();
        createWatermark({ container, timestamp: 'YYYY-MM-DD hh' });
        watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
        destroyWatermark();
        createWatermark({ container, timestamp: 'YYYY-MM-DD HH' });
        watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();
        destroyWatermark();
    });

    it('should destroy the watermark', () => {
        createWatermark({ container });
        destroyWatermark();
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).toBeNull();
    });

    it('should recreate the watermark with timestamp after timeout', () => {
        createWatermark({ container, timestamp: 'ss' });
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(watermarkDiv).not.toBeNull();

        jest.advanceTimersByTime(1000);

        const newWatermarkDiv = container.querySelector('div[style*="background-image"]');
        expect(newWatermarkDiv).not.toBeNull();
        expect(newWatermarkDiv).not.toBe(watermarkDiv); // Should be a new watermark div
    });

    it('should recreate the watermark if modified', (done) => {
        jest.useRealTimers();
        createWatermark({ container, content: 'Initial Watermark' });
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        if (watermarkDiv) {
            watermarkDiv.setAttribute('style', 'background-color: red');
            setTimeout(() => {
                const newWatermarkDiv = container.querySelector('div[style*="background-image"]');
                expect(newWatermarkDiv).not.toBeNull();
                done();
            }, 1000);
        } else {
            done.fail('Watermark div not found');
        }
    });

    it('should recreate the watermark if removed', (done) => {
        jest.useRealTimers();
        createWatermark({ container, content: 'Initial Watermark' });
        const watermarkDiv = container.querySelector('div[style*="background-image"]');
        if (watermarkDiv) {
            container.removeChild(watermarkDiv);
            setTimeout(() => {
                const newWatermarkDiv = container.querySelector('div[style*="background-image"]');
                expect(newWatermarkDiv).not.toBeNull();
                done();
            }, 1000);
        } else {
            done.fail('Watermark div not found');
        }
    });

    it('canvas is not supported', () => {
        console.warn = jest.fn();
        const mockSpy = jest
            .spyOn(HTMLCanvasElement.prototype, 'getContext')
            .mockImplementation(() => null);
        createWatermark({ container });
        expect(console.warn).toHaveBeenCalledWith('当前浏览器不支持canvas，当前utils无法生成水印');
        mockSpy.mockRestore();
    });
});
