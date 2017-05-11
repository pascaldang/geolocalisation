function surveillePosition(position) {
	var infopos = "Position déterminée :\n";
	infopos += "Latitude : "+position.coords.latitude +"\n";
	infopos += "Longitude: "+position.coords.longitude+"\n";
	infopos += "Altitude : "+position.coords.altitude +"\n";
	infopos += "Vitesse  : "+position.coords.speed +"\n";
	document.getElementById("infoposition").innerHTML = infopos;

	var mapProp= {
		center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
		zoom:5,
	};
	var map=new google.maps.Map(document.getElementById("map"),mapProp);
}


var survId = navigator.geolocation.watchPosition(surveillePosition);
