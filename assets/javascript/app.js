// global variables

const submitButton = $(".button-submit");
const mapKey = "c760d648-3728-45a4-9c60-bf2d3ed9d5fc";
const weatherKey = "88b9c8ef1d303abfad87f0e3796672aa";
var incidentTime = [];
var incidentLat = [];
var incidentLong = [];
var timeConvertedUnix = moment(incidentTime).format("X");

var map;

// establish location variables

var Chandler = {
    lat: 33.3039917,
    lng: -111.8318716,
    pop: "253,458",

};

var Mesa = {
    lat: 33.420614, 
    lng: -111.789240,
    pop: "508,958",
};

var Scottsdale = {
    lat: 33.483901, 
    lng: -111.908444,
    pop: "246,645",
};

var Seattle = {
    lat: 47.607803, 
    lng: -122.331341,
    pop: "744,955",
};

var SanFrancisco = {
    lat: 37.769866, 
    lng: -122.426256, 
    pop: "883,305",
};

var Detroit = {
    lat: 42.336762, 
    lng: -83.066283,
    pop: "673,104",
};

// on click submit button event

submitButton.on("click", function(event) {

    event.preventDefault();

    // grabbing limit value
    var limit = $("#userEntrySelection").val().trim();

    // ajax call to municipal site
   $.ajax( {
        url: "https://municipal.systems/v1/places/usa/dataTypes/crime/data?key=" + mapKey + "&limit=" + limit,
        method: "GET"
      }).then(function (crimeResponse){
          console.log(crimeResponse);

            for (var i = 0; i < crimeResponse.results.length; i++){
            incidentLong.push(crimeResponse.results[i].data.location.coordinates[0].toFixed(4));
            incidentLat.push(crimeResponse.results[i].data.location.coordinates[1].toFixed(4));
            incidentTime.push(crimeResponse.results[i].data.startedAt);
        
            };
          }).then (function (result){
              weatherResponse();
          });

    function weatherResponse() {
        for ( var i = 0; i < incidentLat.length; i++){
             $.ajax( {
            url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88b9c8ef1d303abfad87f0e3796672aa/" + incidentLat[i] +","+ incidentLong[i] + "," + timeConvertedUnix[i],
            method: "GET"
            }).then(function(weatherResponse){
                console.log(weatherResponse);
            })
        }
      };


    // var incidentTime = "2015-10-04T02:09:00.000Z";


    //   }).then(function(response) {
    //       console.log(response);
    //       console.log(response.currently.summary);
    //       console.log(response.daily.data[0].moonPhase);
 
    //       var moonPhaseNum = response.daily.data[0].moonPhase;
    //       var weatherSummary = response.currently.summary;
 
    //      if (moonPhaseNum >= 0 && moonPhaseNum < 0.2) {
    //           var moonPhase = "New Moon";
    //       }else if (moonPhaseNum >= 0.2 && moonPhaseNum < 0.4) {
    //           var moonPhase = "First Quarter Moon";
    //       }else if (moonPhaseNum >= 0.4 && moonPhaseNum < 0.7) {
    //           var moonPhase = "Full Moon";
    //       }else if (moonPhaseNum >= 0.7 & moonPhaseNum <= 1.00) {
    //           var moonPhase = "Last Quarter Moon";
    //       }
 
    //      console.log(moonPhase);
    //   });

    // $.when(crimeCall, weatherCall).done(function(res1, res2){
    //     console.log(res1[0]);
    //     console.log(res2[0]);
    // })

   
        });
  
  
  $(".moon-image").on("click", function() {
      var moonPhase = $(this).data("value");
      console.log(moonPhase);
     });

// grabbing value of city selected
city = $("#userCitySelection option:selected").val()

// returning coordinates and initiating map for each city
switch(city) {
    case "Option 1":
        initMap(Chandler.lat, Chandler.lng);
        break;
    case "Option 2":
        initMap(Detroit.lat, Detroit.lng);
        break;
    case "Option 3":
        initMap(Mesa.lat, Mesa.lng);
        break;
    case "Option 4":
        initMap(SanFrancisco.lat, SanFrancisco.lng);
        break;
    case "Option 5":
        initMap(Scottsdale.lat, Scottsdale.lng);
        break;
    case "Option 6":
        initMap(Seattle.lat, Seattle.lng);
};



// function to display map

function initMap(latitude, longitude)  {
      map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: latitude, lng: longitude},
         zoom: 10
       });
};
