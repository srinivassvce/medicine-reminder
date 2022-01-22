export function isAfter(dateToCompare, referenceDate) {
    const date1 = Date.parse(dateToCompare);
    const date2 = Date.parse(referenceDate);
    return date1 - date2 > 0;
}
