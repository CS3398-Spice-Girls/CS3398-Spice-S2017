var clusterfck = require('clusterfck');

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
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

		newColors.push([Math.round(rAve/len), 
						Math.round(gAve/len), 
						Math.round(bAve/len)]);
	}

	// sort by dominate colors
	newColors.sort(function(a, b){
		return b.length - a.length;
	});

	return newColors.map(function(color){
		return "#" + componentToHex(color[0]) 
    			   + componentToHex(color[1]) 
    			   + componentToHex(color[2]);
	});
}