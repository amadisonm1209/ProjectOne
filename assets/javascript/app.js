


$(".button-submit").on("click", function(event) {

    event.preventDefault();

    var incidentLatLong;
    var incidentTime = "2015-11-04T02:09:00.000Z";
    var timeConvertedUnix = moment(incidentTime).format("X");

    console.log(timeConvertedUnix);


     var queryURL ="https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88b9c8ef1d303abfad87f0e3796672aa/42.3601,-71.0589," + timeConvertedUnix;

     $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function(response) {
         console.log(response);
         console.log(response.currently.summary);
         console.log(response.daily.data[0].moonPhase);

         var moonPhaseNum = response.daily.data[0].moonPhase;
         var weatherSummary = response.currently.summary;

     

        if (moonPhaseNum > 0 && moonPhaseNum < 0.13 || moonPhaseNum > 0.87 && moonPhaseNum < 1.00) {
             var moonPhase = "New Moon";
         }else if (moonPhaseNum > 0.12 && moonPhaseNum < 0.38) {
             var moonPhase = "First Quarter Moon";
         }else if (moonPhaseNum > 0.37 && moonPhaseNum < 0.63) {
             var moonPhase = "Full Moon";
         }else if (moonPhaseNum > 0.62 & moonPhaseNum < 0.88) {
             var moonPhase = "Last Quarter Moon";
         }

        console.log(moonPhase);
     })
    });



