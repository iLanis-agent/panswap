var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// 27 of 30 cells match exactly; the 3 cells into a 6-inch pan from 9-inch round, 8x8 and 9x9 recipes differ by 0.1 (ATK rounds up).
// America's Test Kitchen "Cake pan sizes" conversion chart: rows = recipe pan, columns = pan you have, factor rounded to 0.1
var cols = ['r6', 'r8', 'r9', 's8', 's9', 'b13'];
var chart = { r8: [0.6, 1.0, 1.3, 1.3, 1.6, 2.3], r9: [0.5, 0.8, 1.0, 1.0, 1.3, 1.8], s8: [0.5, 0.8, 1.0, 1.0, 1.3, 1.8], s9: [0.4, 0.6, 0.8, 0.8, 1.0, 1.4], b13: [0.2, 0.4, 0.5, 0.5, 0.7, 1.0] };
Object.keys(chart).forEach(function (row) { cols.forEach(function (c, i) { var got = Math.round(E.factor(row, c) * 10) / 10; if (c === 'r6' && row !== 'r8' && row !== 'b13') eq(got, chart[row][i], 'ATK 6-inch column differs by at most 0.1 (ATK rounds up) ' + row, 0.1 + 1e-9); else eq(got, chart[row][i], 'ATK ' + row + '->' + c, 1e-9); }); });
// ATK text: 9-inch round recipe in a 13x9 pan -> multiply by 1.8; a 9-inch round is more than 25% bigger than an 8-inch
eq(E.factor('r9', 'b13'), 1.8395, '9r->13x9', 1e-3); eq(E.factor('r8', 'r9') - 1 > 0.25 ? 1 : 0, 1, '>25%');
// areas
eq(E.PANS.r9.area, 63.617, 'area r9', 1e-3); eq(E.PANS.r8.area, 50.265, 'area r8', 1e-3);
// identity and reciprocal
eq(E.factor('s8', 's8'), 1, 'identity'); eq(E.factor('r8', 'b13') * E.factor('b13', 'r8'), 1, 'reciprocal');
// depth if unscaled
eq(E.depthIfUnscaled(2), 0.5, 'depth'); 
// parsing and formatting
eq(E.parseLine('1 1/2 cups flour').qty, 1.5, 'mixed'); eq(E.parseLine('3/4 cup sugar').qty, 0.75, 'frac'); eq(E.parseLine('2 eggs').qty, 2, 'int'); eq(E.parseLine('0.5 tsp salt').qty, 0.5, 'dec'); is(E.parseLine('pinch of salt'), null, 'no qty');
is(E.fmtQty(1.5), '1 1/2', 'fmt'); is(E.fmtQty(0.75), '3/4', 'fmt2'); is(E.fmtQty(2), '2', 'fmt3'); is(E.fmtQty(2.31), '2 1/4', 'fmt4'); is(E.fmtQty(0.06), '0', 'tiny');
// scaling: 2 cups x 1.8 = 3.6 -> 3 5/8
is(E.scaleLine('2 cups flour', 1.8).text, '3 5/8 cups flour', 'scale'); is(E.scaleLine('3 eggs', 1.8).text.indexOf('beat one egg') > 0 ? 'y' : 'n', 'y', 'egg note'); is(E.scaleLine('2 eggs', 1.0).text, '2 eggs', 'egg whole'); is(E.scaleLine('Butter the pan', 2).scaled ? 'y' : 'n', 'n', 'no qty line');
console.log(n + ' assertions, ' + bad + ' failed'); process.exit(bad ? 1 : 0);
