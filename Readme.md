# smooth-path

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Smothes a flat number array path using [Chaikins Algorithm](http://www.idav.ucdavis.edu/education/CAGDNotes/Chaikins-Algorithm/Chaikins-Algorithm.html)

## Usage `smoothPath(path)`

[![NPM](https://nodei.co/npm/smooth-path.png?downloads=true)](https://nodei.co/npm/smooth-path/)


```js 

var smoothPath = require('smooth-path');

var path = [ 0, 0, 20, 20, 15, 15, 60, 50 ]; 
var result = smoothPath(path);

// result: [ 5, 5, 15, 15, 18.75, 18.75, 16.25, 16.25 ] 

```

## License

MIT, see [LICENSE](http://github.com/stbaer/smooth-path/blob/master/LICENSE)
