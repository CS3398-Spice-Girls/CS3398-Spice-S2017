var clusterfck = require("clusterfck");

var colors = [
   [20, 20, 80],
   [22, 22, 90],
   [250, 255, 253],
   [0, 30, 70],
   [200, 0, 23],
   [100, 54, 100],
   [255, 13, 8]
];

var clusters = clusterfck.kmeans(colors, 3);

for(var i = 0; i < 3 ; i++){
	var rAve = 0;
	var gAve = 0;
	var bAve = 0;
	var len = clusters[i].length;
	for (var j = 0; j < len; j++){
		rAve += clusters[i][j][0];
		gAve += clusters[i][j][1];
		bAve += clusters[i][j][2];
	}
	console.log([rAve/len, gAve/len, bAve/len]);
}

