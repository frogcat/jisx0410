function decode(meshcode) {
  let delta = NaN;
  let y = 0;
  let x = 0;

  if (meshcode.match(/^([0-9]{2})([0-9]{2})$/)) {
    delta = 1;
    y = parseInt(RegExp.$1);
    x = parseInt(RegExp.$2);
  } else if (meshcode.match(/^([0-9]{2})([0-9]{2})([0-7])([0-7])$/)) {
    delta = 1 / 8;
    y = parseInt(RegExp.$1) + parseInt(RegExp.$3) / 8;
    x = parseInt(RegExp.$2) + parseInt(RegExp.$4) / 8;
  } else if (meshcode.match(/^([0-9]{2})([0-9]{2})([0-7])([0-7])([0-9])([0-9])$/)) {
    delta = 1 / 80;
    y = parseInt(RegExp.$1) + parseInt(RegExp.$3) / 8 + parseInt(RegExp.$5) / 80;
    x = parseInt(RegExp.$2) + parseInt(RegExp.$4) / 8 + parseInt(RegExp.$6) / 80;
  } else if (meshcode.match(/^([0-9]{2})([0-9]{2})([0-7])([0-7])([0-9])([0-9])([1-4]{1,3})$/)) {
    delta = 1 / 80;
    y = parseInt(RegExp.$1) + parseInt(RegExp.$3) / 8 + parseInt(RegExp.$5) / 80;
    x = parseInt(RegExp.$2) + parseInt(RegExp.$4) / 8 + parseInt(RegExp.$6) / 80;
    RegExp.$7.split("").forEach(a => {
      delta *= 1 / 2;
      if (a === "2" || a === "4") x += delta;
      if (a === "3" || a === "4") y += delta;
    });
  }

  return isNaN(delta) ? null : [
    x + 100, y / 1.5, (x + delta) + 100, (y + delta) / 1.5
  ];
}

function dig(v) {
  let rest = v;
  return [1, 8, 10, 2, 2, 2].map(k => {
    const d = k * rest;
    rest = d % 1;
    return Math.floor(d);
  });
}

function encode(longitude, latitude) {
  const a = dig(latitude * 1.5);
  const b = dig(longitude - 100);
  let c = a[0] * 100 + b[0];
  c = c * 100 + (a[1] * 10 + b[1]);
  c = c * 100 + (a[2] * 10 + b[2]);
  c = c * 10 + (a[3] * 2 + b[3] + 1);
  c = c * 10 + (a[4] * 2 + b[4] + 1);
  c = c * 10 + (a[5] * 2 + b[5] + 1);
  return c.toString();
}

module.exports = {
  encode: encode,
  decode: decode
};
