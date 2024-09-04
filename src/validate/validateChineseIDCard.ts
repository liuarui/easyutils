/**
 * 验证18位身份证号码的校验码
 * @param id - 18位身份证号码
 * @returns 如果校验码有效则返回 true，否则返回 false
 */
function validateChecksum(id: string): boolean {
    // 身份证前17位数字的加权因子
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 身份证最后一位校验码对应的字符
    const checksums = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    // 计算前17位数字的加权和
    const sum = id
        .slice(0, 17)
        .split('')
        .reduce((sum, num, index) => {
            return sum + parseInt(num, 10) * weights[index];
        }, 0);

    // 计算校验码索引
    const checksumIndex = sum % 11;

    // 验证校验码
    return checksums[checksumIndex] === id[17].toUpperCase();
}

/**
 * 验证中国身份证号码是否有效
 * @param id - 要验证的身份证号码
 * @returns 如果身份证号码有效则返回 true，否则返回 false
 */
export function validateChineseIDCard(id: string): boolean {
    // 定义身份证号码正则表达式
    const idRegex =
        /^(^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(?:\d|X)$)|(^[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$)$/;

    // 如果不符合基本格式，返回 false
    if (!idRegex.test(id)) {
        return false;
    }

    // 如果是15位身份证号码，不需要校验校验码
    if (id.length === 15) {
        return true;
    }

    // 验证18位身份证号码的校验码
    if (id.length === 18) {
        return validateChecksum(id);
    }

    return false;
}
