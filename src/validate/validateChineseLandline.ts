const chineseLandlineRegex = /^0\d{2,3}(-\d{7,8})(-\d{1,6})?$/;

/**
 * 验证是否为有效的中国座机号码
 * @param number 要验证的号码字符串
 * @returns 如果是有效的中国座机号码返回 true，否则返回 false
 */
export function validateChineseLandline(number: string): boolean {
    // 检查输入是否为字符串
    if (typeof number !== 'string') {
        return false;
    }

    // 使用正则表达式验证号码
    return chineseLandlineRegex.test(number);
}
