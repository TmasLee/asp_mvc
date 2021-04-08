export const seriesColors = [
    ['green', 'red'],
    ['#82ca9d', '#bf2b28']
];

export function formatXAxis(timestamp) {
    let date = new Date(timestamp * 1000);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}
