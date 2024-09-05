export function getUrlSearchParams(key: string): string {
    if (typeof window === 'undefined') {
        console.error('This function can only be used in a browser environment');
        return '';
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(key) || '';
}
