export function getUrlQueryParams(key: string) {
    if (typeof window === 'undefined') {
        console.error(
            'This function can only be used in a browser environment'
        );
        return '';
    }

    const hash = window.location.hash;
    if (!hash) {
        return '';
    }

    const queryString = hash.substring(hash.indexOf('?') + 1);
    const urlSearchParams = new URLSearchParams(queryString);
    return urlSearchParams.get(key) || '';
}
