module.exports.clusterColors = function(colorSample, numColors){

	var clusters = clusterfck.kmeans(colorSample, numColors);



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

}