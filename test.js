var smoothPath = require('./')
var test = require('tape').test;

// @TODO

test("smooth path tests", function(t) {

    var path = [ 0, 0,  20, 20,  15, 15 ];

    console.log(smoothPath(path));

    t.equal(1, 0+1, 'has a test');

    t.deepEqual( smoothPath(path), [ 5, 5, 15, 15, 18.75, 18.75, 16.25, 16.25 ], 'Readme example correct' );

    t.end()
});
