# smooth-path

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Smothes a flat number array path using [Chaikins Algorithm](http://www.idav.ucdavis.edu/education/CAGDNotes/Chaikins-Algorithm/Chaikins-Algorithm.html)

## Usage – New Features (v1.1.0+)

[![NPM](https://nodei.co/npm/smooth-path.png?downloads=true)](https://nodei.co/npm/smooth-path/)

```js
const smoothPath = require('smooth-path');

// Classic (same as before)
smoothPath([0,0, 20,20, 15,15, 60,50]);

// Better quality with 2 iterations
smoothPath(points, { iterations: 2 });

// Modern smooth curves
smoothPath(points, {
  mode: 'catmull-rom',
  catmullTension: 0.45,
  segments: 10
});

## License

MIT, see [LICENSE](http://github.com/stbaer/smooth-path/blob/master/LICENSE)
