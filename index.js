module.exports = function(path) {

    var n = path.length,
        result = [],
        i = 0,
        resultIndex = 0,
        p0x, p0y, p1x, p1y;

    for (i; i<n-2; i+=2) {
        p0x = path[i];
        p0y = path[i+1];
        p1x = path[i+2];
        p1y = path[i+3];

        result[resultIndex++] = 0.75 * p0x + 0.25 * p1x;
        result[resultIndex++] = 0.75 * p0y + 0.25 * p1y;
        result[resultIndex++] = 0.25 * p0x + 0.75 * p1x;
        result[resultIndex++] = 0.25 * p0y + 0.75 * p1y;
    }

    return result;
};
