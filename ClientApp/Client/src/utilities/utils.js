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

/**
 * @param {int} timestamp - In seconds
 * @returns date string (yyyy-mm-dd)
 * Example - 1386110460 seconds --> 2013-12-03
 */
 export function formatTimestamp(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

export function formatYoutubeLink(url) {
    if (url.includes('watch?v=')) {
        let newUrl = url.replace('watch?v=', 'embed/');
        return newUrl;
    }
    if (url.includes('youtu.be/')) {
        let newUrl = url.replace('.be/', 'be.com/embed/');
        return newUrl;
    }
}
