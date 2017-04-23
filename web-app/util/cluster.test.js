
var cluster
var mean = require("./kMeanCluster");

var colors = [
   [20, 20, 80],
   [22, 22, 90],
   [250, 255, 253],
   [0, 30, 70],
   [200, 0, 23],
   [100, 54, 100],
   [255, 13, 8]
];

it('should return 4 colors', () => {
	var testPalette = mean.clusterColors(colors, 4);

	expect(testPalette.length).toBe(4);
});

it('colors should be valid rgb 0-255', () => {
	var testPalette = mean.clusterColors(colors, 4);
	
	for(var i = 0; i < testPalette.length; i++){
		expect(testPalette[i].length).toBe(3);
		for(var j = 0; j < testPalette[i].length; j++){
			expect(testPalette[i][j]).toBeLessThanOrEqual(255);
			expect(testPalette[i][j]).toBeGreaterThanOrEqual(0);
		}
	}
});


