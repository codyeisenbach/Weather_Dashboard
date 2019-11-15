var button = $("#button-addon1");



$(button).on("click", function () {
    // In this case, the "this" keyword refers to the button that was clicked
    var zip = $.trim($(".form-control").val());
    console.log(zip)
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&APPID=8b56516a3d32f8be50c3c2b2e0638ee8";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API
        .then(function (response) {
        console.log(response)
        });
    });
