export function getCsrfToken() {
    let cookies = document.cookie.split(';');

    for (const cookie of cookies){
        if (cookie.includes('csrf-token')){
            return cookie.substring(11);
        }
    }

    return '';
}

export function removeUnderscore(str) {
    let newStr = str.replaceAll('_', ' ');
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}