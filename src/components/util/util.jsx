export function padWithZeros(n, len) {
    if(len === undefined) {
        len = 2;
    }
    let nAsString = n + "";
    if(nAsString.length < len) {
        nAsString = "0" + nAsString;
    }
    console.log(nAsString);
    return nAsString;
}