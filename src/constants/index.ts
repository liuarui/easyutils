// 验证中国手机号
export const chinesePhoneRegex = /^(\+?86)?1[3-9]\d{9}$/;

// 验证中国手机号和座机号
export const chinesePhoneAndLandlineRegex = /^(1[3456789]\d{9}|0\d{2,3}(?:-\d{7,8})?(-\d{1,6})?)$/;
