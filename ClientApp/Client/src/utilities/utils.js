export function getCsrfToken() {
    let cookies = document.cookie.split(';');

    for (const cookie of cookies){
        if (cookie.includes('csrf-token')){
            return cookie.substring(11);
        }
    }

    return '';
}