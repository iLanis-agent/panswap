(function (root) {
  'use strict';
  var PI = Math.PI;
  var PANS = {
    r6: { name: '6-inch round', area: PI * 9 }, r8: { name: '8-inch round', area: PI * 16 }, r9: { name: '9-inch round', area: PI * 20.25 }, r10: { name: '10-inch round', area: PI * 25 },
    s8: { name: '8x8 square', area: 64 }, s9: { name: '9x9 square', area: 81 }, b13: { name: '13x9 rectangle', area: 117 }, h11: { name: '11x7 rectangle', area: 77 }
  };
  function factor(fromKey, toKey) { return PANS[toKey].area / PANS[fromKey].area; }
  function depthIfUnscaled(factorValue) { return 1 / factorValue; } // same batter in a bigger pan is thinner
  // quantity parsing: "2", "1 1/2", "3/4", "0.5" at the start of a line
  function parseLine(line) {
    var m = /^\s*(\d+\s+\d+\/\d+|\d+\/\d+|\d*\.\d+|\d+)\s*(.*)$/.exec(line); if (!m) return null;
    var q = m[1], v;
    if (/^\d+\s+\d+\/\d+$/.test(q)) { var p = q.split(/\s+/), f = p[1].split('/'); v = +p[0] + f[0] / f[1]; }
    else if (/\//.test(q)) { var g = q.split('/'); v = g[0] / g[1]; } else v = parseFloat(q);
    return { qty: v, rest: m[2] };
  }
  function fmtQty(v) { // nearest 1/8, kitchen style
    var e = Math.round(v * 8), whole = Math.floor(e / 8), r = e % 8, fr = { 0: '', 1: '1/8', 2: '1/4', 3: '3/8', 4: '1/2', 5: '5/8', 6: '3/4', 7: '7/8' }[r];
    if (e === 0) return '0'; return (whole ? whole : '') + (whole && fr ? ' ' : '') + fr;
  }
  function scaleLine(line, f) {
    var p = parseLine(line); if (!p) return { text: line, scaled: false };
    var v = p.qty * f, isEgg = /\begg/i.test(p.rest), note = isEgg && Math.abs(v - Math.round(v)) > 0.2 ? ' (beat one egg and use part of it)' : '';
    return { text: (isEgg ? (Math.abs(v - Math.round(v)) > 0.2 ? v.toFixed(1) : String(Math.round(v))) : fmtQty(v)) + ' ' + p.rest + note, scaled: true, value: v };
  }
  var api = { PANS: PANS, factor: factor, depthIfUnscaled: depthIfUnscaled, parseLine: parseLine, fmtQty: fmtQty, scaleLine: scaleLine };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Pan = api;
})(typeof window !== 'undefined' ? window : this);
