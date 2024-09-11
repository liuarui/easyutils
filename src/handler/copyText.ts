import { copyText as copyTextImpl, CopyTextOpt } from 'easycopyjs';

export function copyText(text: string, opt?: CopyTextOpt) {
    return copyTextImpl(text, opt);
}
