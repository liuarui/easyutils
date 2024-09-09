const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

/**
 * 验证是否为有效的电子邮件地址
 * @param email 要验证的电子邮件地址字符串
 * @returns 如果是有效的电子邮件地址返回 true，否则返回 false
 */
export function validateEmail(email: string): boolean {
    // 检查输入是否为字符串
    if (typeof email !== 'string') {
        return false;
    }

    // 使用正则表达式验证电子邮件地址
    return emailRegex.test(email);
}
