const test = require('tape');
const encode = require('../jisx0410.js').encode;

test('encode', function(t) {
  t.plan(1);
  t.deepEqual(encode(135, 35), "52354000111");
});
