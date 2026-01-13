/**
 * Smooths a flat coordinate array [x1,y1, x2,y2, ...] 
 * 
 * @param {number[]} path - flat array of 2D points
 * @param {Object} [options] - optional configuration
 * @param {number} [options.iterations=1] - Chaikin iterations (only used in chaikin mode)
 * @param {number} [options.tension=0.75] - Chaikin tension (0.5–0.85 common)
 * @param {boolean} [options.useTypedArray=false] - return Float32Array instead of Array
 * @param {'chaikin'|'catmull-rom'} [options.mode='chaikin'] - smoothing algorithm
 * @param {number} [options.catmullTension=0.5] - Catmull-Rom tension (0 = centripetal, 0.5 = classic)
 * @param {number} [options.segments=8] - points per Catmull-Rom curve segment
 * @returns {number[]|Float32Array} smoothed flat path
 */
function smoothPath(path, options = {}) {
    if (!Array.isArray(path) || path.length < 4 || path.length % 2 !== 0) {
        return path.slice();
    }

    const {
        mode = 'chaikin',
        iterations = 1,
        tension = 0.75,
        useTypedArray = false,
        catmullTension = 0.5,
        segments = 8
    } = options;

    // ── Backward compatible fast path for old usage ─────────────────────────
    if (
        mode === 'chaikin' &&
        iterations === 1 &&
        tension === 0.75 &&
        !useTypedArray &&
        Object.keys(options).length === 0
    ) {
        const n = path.length;
        const result = new Array(n - 2);
        let idx = 0;

        for (let i = 0; i < n - 2; i += 2) {
            const x0 = path[i];
            const y0 = path[i + 1];
            const x1 = path[i + 2];
            const y1 = path[i + 3];

            result[idx++] = 0.75 * x0 + 0.25 * x1;
            result[idx++] = 0.75 * y0 + 0.25 * y1;
            result[idx++] = 0.25 * x0 + 0.75 * x1;
            result[idx++] = 0.25 * y0 + 0.75 * y1;
        }

        return result;
    }

    // ── General case ────────────────────────────────────────────────────────
    let points = path.slice();

    if (mode === 'chaikin') {
        const q = tension;
        const r = 1 - tension;

        for (let it = 0; it < iterations; it++) {
            const result = [];
            const len = points.length;

            result.push(points[0], points[1]);

            for (let i = 0; i < len - 4; i += 2) {
                const x0 = points[i];
                const y0 = points[i + 1];
                const x1 = points[i + 2];
                const y1 = points[i + 3];

                result.push(
                    q * x0 + r * x1, q * y0 + r * y1,
                    r * x0 + q * x1, r * y0 + q * y1
                );
            }

            result.push(points[len - 2], points[len - 1]);
            points = result;
        }
    }
    else if (mode === 'catmull-rom') {
        points = catmullRomSmoothFlat(
            points,
            catmullTension,
            segments
        );
    }
    else {
        // unknown mode → fallback to original behavior
        return smoothPath(path); // recursive call with no options → old path
    }

    return useTypedArray ? new Float32Array(points) : points;
}

/**
 * Catmull-Rom spline on flat array
 * Produces much smoother, natural curves
 */
function catmullRomSmoothFlat(flatPoints, tension = 0.5, segmentsPerCurve = 8) {
    const n = flatPoints.length >> 1;
    if (n < 2) return flatPoints.slice();

    const result = [];

    // Tension factor
    const t = tension;

    // First point
    result.push(flatPoints[0], flatPoints[1]);

    for (let i = 0; i < n - 3; i++) {
        // Get four control points (with safe boundary handling)
        const p0x = i === 0 ? flatPoints[0] : flatPoints[(i - 1) * 2];
        const p0y = i === 0 ? flatPoints[1] : flatPoints[(i - 1) * 2 + 1];
        const p1x = flatPoints[i * 2];
        const p1y = flatPoints[i * 2 + 1];
        const p2x = flatPoints[(i + 1) * 2];
        const p2y = flatPoints[(i + 1) * 2 + 1];
        const p3x = i + 2 >= n - 1 ? p2x : flatPoints[(i + 2) * 2];
        const p3y = i + 2 >= n - 1 ? p2y : flatPoints[(i + 2) * 2 + 1];

        for (let s = 1; s <= segmentsPerCurve; s++) {
            const u = s / segmentsPerCurve;
            const u2 = u * u;
            const u3 = u2 * u;

            const a = 2 * u3 - 3 * u2 + 1;
            const b = (t) * (u3 - 2 * u2 + u);
            const c = (t) * (-2 * u3 + 3 * u2);
            const d = (t) * (u3 - u2);

            const x = a * p1x + b * (p2x - p0x) + c * (p3x - p1x) + d * (p2x - p1x);
            const y = a * p1y + b * (p2y - p0y) + c * (p3y - p1y) + d * (p2y - p1y);

            result.push(x, y);
        }
    }

    // Last point
    result.push(flatPoints[flatPoints.length - 2], flatPoints[flatPoints.length - 1]);

    return result;
}

module.exports = smoothPath;