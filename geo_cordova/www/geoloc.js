// Fonction qui releve les coordonnées via le navigateur
function surveillePosition(position) {
	var infopos = "<h3>Coordonnées: </h3> \n \n";
	infopos += "<h5>Latitude : </h5 >"+position.coords.latitude +"\n \n";
	infopos += "<h5>Longitude: </h5 >"+position.coords.longitude+"\n \n";
  

//Envoie les coordonnées vers le fichier Html
	document.getElementById("infoposition").innerHTML = infopos;

// On stocke les coordonnées dans une valables position pour pouvoir les utilisé plus simplement
	var pos= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

//Ajout des coordonnées dans le local storage	
	localStorage.setItem("Coordonnées", pos);

//Affichage des items dans la console
	console.log("local storage");
	for (var i = 0; i < localStorage.length; i++)   {
    	console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
	}


// Propriété de la vue de la map
	var mapProp= {
		center:pos,
		zoom:19,
	};

	//Envoie la map vers le fichiers Htlm
	var map=new google.maps.Map(document.getElementById("map"),mapProp);

//affiche le Marqueur sur la map
var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title:"Vous êtes ici"
    });
}

// Fonction de gestion d'erreur (explicite)
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
    // Envoie le message d'erreur vers le fichiers Htlm
    document.getElementById("infoposition").innerHTML = info;
}

//Appel des callbacks
if(navigator.geolocation){
	survId = navigator.geolocation.watchPosition(surveillePosition, erreurPosition,{maximumAge:600000,enableHighAccuracy:true});
}else{
	alert("Ce ne supporte pas la géolocalisation");
}