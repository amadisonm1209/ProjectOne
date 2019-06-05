// global variables

const submitButton = $(".button-submit");
const mapKey = "c760d648-3728-45a4-9c60-bf2d3ed9d5fc";
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
    $.ajax({
        url: "https://municipal.systems/v1/places/usa/dataTypes/crime/data?key=" + mapKey + "&limit=" + limit,
        method: "GET"
      }).then(function(response) {
        console.log(response);
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
}});



// function to display map

function initMap(latitude, longitude)  {
      map = new google.maps.Map(document.getElementById('map'), {
       center: {lat: latitude, lng: longitude},
         zoom: 10
       });
}

// function to click moons 

