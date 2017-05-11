function surveillePosition(position) {
	var infopos = "Position déterminée :\n";
	infopos += "Latitude : "+position.coords.latitude +"\n";
	infopos += "Longitude: "+position.coords.longitude+"\n";
	infopos += "Altitude : "+position.coords.altitude +"\n";
	infopos += "Vitesse  : "+position.coords.speed +"\n";
	document.getElementById("infoposition").innerHTML = infopos;

	var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	localStorage.setItem("Coordonnées", pos);

	var i;

	console.log("local storage");
	for (i = 0; i < localStorage.length; i++)   {
    	console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
	}

	var mapProp= {
		center: pos,
		zoom:19,
	};

	var map=new google.maps.Map(document.getElementById("map"),mapProp);

	var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title:"Vous êtes ici",
    });
}

function erreurPosition(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
    case error.TIMEOUT:
    	info += "Timeout !";
    break;
    case error.PERMISSION_DENIED:
		info += "Vous n’avez pas donné la permission";
    break;
    case error.POSITION_UNAVAILABLE:
    	info += "La position n’a pu être déterminée";
    break;
    case error.UNKNOWN_ERROR:
		info += "Erreur inconnue";
    break;
    }
    document.getElementById("infoposition").innerHTML = info;
}


if(navigator.geolocation) {
    survId = navigator.geolocation.watchPosition(surveillePosition,erreurPosition,{maximumAge:30000,enableHighAccuracy:true});
} else {
    alert("Ce navigateur ne supporte pas la géolocalisation");
}