import { copyText as copyTextImpl, CopyTextOpt } from 'easycopyjs/main';
export function copyText(text: string, opt?: CopyTextOpt) {
    return copyTextImpl(text, opt);
}
