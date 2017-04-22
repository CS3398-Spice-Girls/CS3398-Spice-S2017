var clusterfck = require('clusterfck');
module.exports.clusterColors = function(colorSample, numColors){

	var clusters = clusterfck.kmeans(colorSample, numColors);

	var newColors = []

	for(var i = 0; i < numColors ; i++){
		var rAve = 0;
		var gAve = 0;
		var bAve = 0;
		var len = clusters[i].length;
		for (var j = 0; j < len; j++){
			rAve += clusters[i][j][0];
			gAve += clusters[i][j][1];
			bAve += clusters[i][j][2];
		}
		newColors.push([rAve/len, gAve/len, bAve/len])
	}

	return newColors;
}