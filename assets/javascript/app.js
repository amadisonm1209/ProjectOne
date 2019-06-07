// global variables


const submitButton = $(".button-submit");
const mapKey = "c760d648-3728-45a4-9c60-bf2d3ed9d5fc";
const weatherKey = "88b9c8ef1d303abfad87f0e3796672aa";
var incidentTime = [];
var incidentLat = [];
var incidentLong = [];
var timeConvertedUnixArray = [];
var moonPhaseNum = [];
var newMoon = [];
var firstQuarterMoon = [];
var fullMoon = [];
var thirdQuarterMoon = [];
var crimeSummary = [];

var map;

// establish location variables

var Chandler = {
    lat: 33.3039917,
    lng: -111.8318716,
    pop: "253,458",
    id: "chn-az",

};

var Mesa = {
    lat: 33.420614,
    lng: -111.789240,
    pop: "508,958",
    id: "mesa-az",
};

var Scottsdale = {
    lat: 33.483901,
    lng: -111.908444,
    pop: "246,645",
    id: "sct-az",
};


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

    $("tbody").empty();

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
            place = Mesa.id;
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
        url: "https://municipal.systems/v1/places/" + place + "/dataTypes/crime/data?key=" + mapKey + "&limit=" + limit + "&offset=10",
        method: "GET"
    }).then(function (crimeResponse) {
        console.log(crimeResponse);
        for (var i = 0; i < crimeResponse.results.length; i++) {

            var timeConvertedUnix = moment(incidentTime[i]).format("X");
            timeConvertedUnixArray.push(timeConvertedUnix);
            incidentLong.push(crimeResponse.results[i].data.location.coordinates[0].toFixed(4));
            incidentLat.push(crimeResponse.results[i].data.location.coordinates[1].toFixed(4));

            incidentTime.push(crimeResponse.results[i].data.startedAt);
            crimeSummary.push(crimeResponse.results[i].data.type);

            var coords = crimeResponse.results[i].data.location.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map

            });

            //format date and time for table
            var date = moment(incidentTime[i]).format("LL");
            var time = moment(incidentTime[i]).format("hh:mm a");

            //display crime type, date, and time in the table
            var newRow = $("<tr>").append(
                $("<td>").text(crimeResponse.results[i].data.type),
                $("<td>").text(date),
                $("<td>").text(time),
                $("<td>").addClass("weather"),
                      );

                      $("table > tbody").append(newRow);
        };

    }).then(function weatherResponse() {

  

    //ajax call using the crime data to the weather api


        for (var i = 0; i < incidentLat.length; i++) {
            $.ajax({
                url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88b9c8ef1d303abfad87f0e3796672aa/" + incidentLat[i] + "," + incidentLong[i] + "," + timeConvertedUnixArray[i],
                method: "GET"
            }).then(function (weatherResponse) {

                var weatherSummary = weatherResponse.currently.summary;

                console.log(weatherSummary);

                moonPhaseNum.push(weatherResponse.daily.data[0].moonPhase);
                checkMoonPhase(moonPhaseNum);

                //display weather summary in table
                $(".weather").text(weatherSummary);
            });
        };
});
});


//need to filter through results using moon phase set above
$(".moon-image").on("click", function () {
    var moonPhase = $(this).data("value");
    
    switch (moon) {
        case moonPhase === "new-moon":
            console.log(newMoon);
            break;
        case moonPhase === "first-quarter":
            console.log(firstQuarterMoon);
            break;
        case moonPhase === "full-moon":
            console.log(fullMoon);
            break;
        case moonPhase === "last-quarter":
            console.log(thirdQuarterMoon);
            break;
    };
    
});


// function to display map
function initMap(latitude, longitude) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 10
    });
};


function checkMoonPhase(moonPhaseNum) {
    if (moonPhaseNum >= 0 && moonPhaseNum < 0.2) {
        newMoon.push(crimeSummary);
    } else if (moonPhaseNum >= 0.2 && moonPhaseNum < 0.4) {
        firstQuarterMoon.push(crimeSummary);
    } else if (moonPhaseNum >= 0.4 && moonPhaseNum < 0.7) {
        fullMoon.push(crimeSummary);
    } else if (moonPhaseNum >= 0.7 && moonPhaseNum <= 1.00) {
        thirdQuarterMoon.push(crimeSummary);
    };
}
