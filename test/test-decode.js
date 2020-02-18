const test = require('tape');
const decode = require('../jisx0410.js').decode;

test('decode', function(t) {
  t.plan(6);
  t.deepEqual(decode("5438"), [138, 36, 138 + 1, 36 + 2 / 3], "1st");
  t.deepEqual(decode("543800"), [138, 36, 138 + 1 / 8, 36 + 2 / 3 / 8], "2nd");
  t.deepEqual(decode("54380000"), [138, 36, 138 + 1 / 80, 36 + 2 / 3 / 80], "3rd");
  t.deepEqual(decode("543800001"), [138, 36, 138 + 1 / 160, 36 + 2 / 3 / 160], "1/2");
  t.deepEqual(decode("5438000011"), [138, 36, 138 + 1 / 320, 36 + 2 / 3 / 320], "1/4");
  t.deepEqual(decode("54380000111"), [138, 36, 138 + 1 / 640, 36 + 2 / 3 / 640], "1/8");
});
