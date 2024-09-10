import dayjs from 'dayjs';

let wmContainerObx: MutationObserver | null = null;
let wmObx: MutationObserver | null = null;
let wmTimer: number | null = null;
let watermarkDiv: HTMLDivElement | null = null;

export interface WatermarkOptions {
    content: string;
    container: HTMLElement;
    width: number;
    height: number;
    textAlign: CanvasTextAlign;
    textBaseline: CanvasTextBaseline;
    fontSize: string;
    fontFamily: string;
    fillStyle: string;
    rotate: number;
    zIndex: number;
    timestamp: string;
    watch: boolean;
}

function innerCreateWatermark(param: WatermarkOptions) {
    const {
        content,
        container,
        width,
        height,
        textAlign,
        textBaseline,
        fontSize,
        fontFamily,
        fillStyle,
        rotate,
        zIndex,
        timestamp,
        watch,
    } = param;

    if (!container) {
        return console.warn('createWatermark配置的container不能为空');
    }

    destroyWatermark();

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);

    const ctx = canvas?.getContext && canvas.getContext('2d');
    if (!ctx) {
        return console.warn('当前浏览器不支持canvas，当前utils无法生成水印');
    }

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = fillStyle;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-(Math.PI / 180) * rotate);
    ctx.fillText(`${content}`, 0, 0);

    if (timestamp) {
        ctx.fillText(`${dayjs(new Date()).format(timestamp)}`, 0, parseInt(fontSize) + 5);
    }

    const CLASS_NAME = `wm_${Date.now()}`;

    watermarkDiv = document.createElement('div');
    const styleStr = `
    position: ${container === document.body ? 'fixed' : 'absolute'};
    user-select: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    pointer-events: none !important;
    background-repeat: repeat;
    background-image: url('${canvas.toDataURL()}')`;
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add(CLASS_NAME);

    if (container.firstChild) {
        container.insertBefore(watermarkDiv, container.firstChild);
    } else {
        container.appendChild(watermarkDiv);
    }

    const MutationObserver = window.MutationObserver;
    if (watch && MutationObserver) {
        wmContainerObx = new MutationObserver(() => {
            if (!container.querySelector(`.${CLASS_NAME}`)) {
                innerCreateWatermark(param);
            }
        });

        wmContainerObx.observe(container, {
            childList: true,
        });

        wmObx = new MutationObserver(() => {
            if (watermarkDiv!.getAttribute('style') !== styleStr) {
                innerCreateWatermark(param);
            }
        });

        wmObx.observe(watermarkDiv, {
            attributes: true,
        });
    }

    if (timestamp) {
        let timeout = 1000 * 60 * 60 * 24;
        if (timestamp.includes('s')) {
            timeout = 1000;
        } else if (timestamp.includes('m')) {
            timeout = 1000 * 60;
        } else if (timestamp.includes('h') || timestamp.includes('H')) {
            timeout = 1000 * 60 * 60;
        }

        wmTimer = window.setTimeout(() => {
            innerCreateWatermark(param);
        }, timeout);
    }
}

export function destroyWatermark() {
    // 监听器关闭
    wmObx?.disconnect();
    wmObx = null;
    wmContainerObx?.disconnect();
    wmContainerObx = null;

    // 清除timer
    if (wmTimer) {
        window.clearTimeout(wmTimer);
        wmTimer = null;
    }

    // 删除水印元素
    watermarkDiv?.parentNode?.removeChild(watermarkDiv);
    watermarkDiv = null;
}
export function createWatermark(option: Partial<WatermarkOptions>) {
    const defaultOption: WatermarkOptions = {
        content: 'lm-easyutils',
        container: document.body,
        width: 300,
        height: 300,
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: '14px',
        fontFamily: 'Microsoft Yahei',
        fillStyle: 'rgba(184, 184, 184, 0.3)',
        rotate: 25,
        zIndex: 99999,
        timestamp: 'YYYY-MM-DD HH:mm',
        watch: true,
    };

    innerCreateWatermark({
        ...defaultOption,
        ...option,
    });
}
