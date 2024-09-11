import dayjs from 'dayjs';

import { createWatermark, destroyWatermark } from './biz/watermark';
import { copyText } from './handler/copyText';
import { getUrlQueryParams } from './handler/getUrlQueryParams';
import { getUrlSearchParams } from './handler/getUrlSearchParams';
import { validateChineseIDCard } from './validate/validateChineseIDCard';
import { validateChineseLandline } from './validate/validateChineseLandline';
import { validateChinesePhoneAndLandline } from './validate/validateChinesePhoneAndLandline';
import { validateChinesePhoneNumber } from './validate/validateChinesePhoneNumber';
import { validateEmail } from './validate/validateEmail';
import { validateIP, validateIPV4, validateIPV6 } from './validate/validateIP';

export * from 'lodash-es';
export {
    copyText,
    createWatermark,
    dayjs,
    destroyWatermark,
    getUrlQueryParams,
    getUrlSearchParams,
    validateChineseIDCard,
    validateChineseLandline,
    validateChinesePhoneAndLandline,
    validateChinesePhoneNumber,
    validateEmail,
    validateIP,
    validateIPV4,
    validateIPV6,
};
