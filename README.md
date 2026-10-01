# PanSwap

Swap baking pans: scale a recipe by pan area.

factor = area(pan you have) / area(pan the recipe uses). Multiply every ingredient by it.
Areas: round pi r^2, rectangle length x width. Ingredient lines are parsed ("1 1/2 cups flour") and shown to the nearest 1/8.

Tests: America's Test Kitchen cake pan chart (https://www.americastestkitchen.com/articles/8002-cake-pan-sizes). 27 of 30 cells match exactly; the 3 into a 6-inch pan from 9-inch round, 8x8 and 9x9 differ by 0.1 (ATK rounds up).
Bake time is not computed; check early.

Static client-side. `node test-engine.js` runs the tests.
