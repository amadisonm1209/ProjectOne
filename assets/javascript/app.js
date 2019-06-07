// global variables


var Seattle = {
    lat: 47.607803,
    lng: -122.331341,
    pop: "744,955",
    id: "sea-wa",
};

var SanFrancisco = {
    lat: 37.769866,
    lng: -122.426256,
    pop: "883,305",
    id: "sf-ca",
};

var Detroit = {
    lat: 42.336762,
    lng: -83.066283,
    pop: "673,104",
    id: "dt-mi",
};

// on click submit button event

submitButton.on("click", function (event) {

    event.preventDefault();

    // grabbing limit value
    var limit = $("#userEntrySelection").val();
    var place 
    
     // grabbing value of city selected
     city = $("#userCitySelection option:selected").val()
      
     // returning coordinates and initiating map for each city
     switch (city) {
         case "Option 1":
             initMap(Chandler.lat, Chandler.lng);
             place = Chandler.id;
             break;
         case "Option 2":
             initMap(Detroit.lat, Detroit.lng);
             place = Detroit.id;
             break;
         case "Option 3":
             initMap(Mesa.lat, Mesa.lng);
             place= Mesa.id;
             break;
         case "Option 4":
             initMap(SanFrancisco.lat, SanFrancisco.lng);
             place = SanFrancisco.id;
             break;
         case "Option 5":
             initMap(Scottsdale.lat, Scottsdale.lng);
             place = Scottsdale.id;
             break;
         case "Option 6":
             initMap(Seattle.lat, Seattle.lng);
             place = Seattle.id;
     };

    // ajax call to municipal site
    $.ajax({
        url: "https://municipal.systems/v1/places/" + place + "/dataTypes/crime/data?key=" + mapKey + "&limit=" + limit,
        method: "GET"
    }).then(function (crimeResponse) {
        console.log(crimeResponse);

        for (var i = 0; i < crimeResponse.results.length; i++) {
            incidentLong.push(crimeResponse.results[i].data.location.coordinates[0].toFixed(4));
            incidentLat.push(crimeResponse.results[i].data.location.coordinates[1].toFixed(4));
            var coords = crimeResponse.results[i].data.location.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
            position: latLng,
            map: map

            
          });

            

        };
    }).then(function (result) {
    });

    //ajax call using the crime data to the weather api
    function weatherResponse() {

        for (var i = 0; i < incidentLat.length; i++) {
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88b9c8ef1d303abfad87f0e3796672aa/" + incidentLat[i] + "," + incidentLong[i] + "," + timeConvertedUnix[i],
                method: "GET"
            }).then(function (weatherResponse) {

                //display weather summary 
                var moonPhaseNum = weatherResponse.daily.data[0].moonPhase;

                if (moonPhaseNum >= 0 && moonPhaseNum < 0.2) {

                    //display "New Moon"
                } else if (moonPhaseNum >= 0.2 && moonPhaseNum < 0.4) {
                    //display "First Quarter Moon"
                } else if (moonPhaseNum >= 0.4 && moonPhaseNum < 0.7) {
                    //display "Full Moon"
                } else if (moonPhaseNum >= 0.7 && moonPhaseNum <= 1.00) {
                    //display "Third Quarter Moon"
                    // alert("I'm a moon");
                };
            })
        }

    };
     
});

//need to filter through results using moon phase set above
    $(".moon-image").on("click", function () {
        var moonPhase = $(this).data("value");
        console.log(moonPhase);
    });

   
    // function to display map

    function initMap(latitude, longitude) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: latitude, lng: longitude },
            zoom: 10
        });
    };
