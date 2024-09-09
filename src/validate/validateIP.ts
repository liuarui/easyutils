// 正则表达式用于验证IPv4地址
const ipv4Regex = /^((25[0-5]|2[0-4]\d|1?\d\d?)\.){3}(25[0-5]|2[0-4]\d|1?\d\d?)$/;

export function validateIPV4(ip: string) {
    if (ipv4Regex.test(ip)) {
        return true;
    }
    return false;
}

export function validateIPV6(ip: string): boolean {
    if (!ip || typeof ip !== 'string') return false;

    // IPv6 should not have more than one '::'
    if (ip.split('::').length > 2) return false;

    // Split the address into segments
    const segments = ip.split(':');

    // Handle '::' cases
    if (ip.includes('::')) {
        // Handle leading '::' or trailing '::'
        const doubleColonIndex = segments.indexOf('');
        if (doubleColonIndex === 0 || doubleColonIndex === segments.length - 1) {
            segments.splice(doubleColonIndex, 1); // Remove empty part caused by leading/trailing '::'
        }

        const partsBeforeDoubleColon = segments.slice(0, doubleColonIndex);
        const partsAfterDoubleColon = segments.slice(doubleColonIndex);

        // At most there can be 7 parts before and after '::'
        if (partsBeforeDoubleColon.length + partsAfterDoubleColon.length > 7) {
            return false;
        }
    } else if (segments.length !== 8) {
        // If there's no '::' and the segments are not exactly 8, it's invalid
        return false;
    }

    const hexRegex = /^[0-9a-fA-F]{1,4}$/;
    for (const segment of segments) {
        if (segment === '') continue; // Skip empty segments caused by '::'
        if (!hexRegex.test(segment)) {
            return false;
        }
    }

    return true;
}

export function validateIP(ip: string) {
    if (validateIPV4(ip) || validateIPV6(ip)) {
        return true;
    }
    return false;
}
