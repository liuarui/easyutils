// 正则表达式用于验证IPv4地址
const ipv4Regex = /^((25[0-5]|2[0-4]\d|1?\d\d?)\.){3}(25[0-5]|2[0-4]\d|1?\d\d?)$/;

// 正则表达式用于验证IPv6地址
const ipv6Regex = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;

export function validateIPV4(ip: string) {
    if (ipv4Regex.test(ip)) {
        return true;
    }
    return false;
}
export function validateIPV6(ip: string) {
    if (ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}

export function validateIP(ip: string) {
    if (ipv4Regex.test(ip) || ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
