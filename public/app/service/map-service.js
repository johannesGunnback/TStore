/**
 * Created by Johannes on 18/01/2015.
 */
app.service('MapService', ['uiGmapGoogleMapApi', 'uiGmapIsReady', function(GoogleMapApi, IsReady){

    var autocompleteService, geocoder;
    GoogleMapApi.then(function() {
        console.log("create");
        autocompleteService = new google.maps.places.AutocompleteService();
        geocoder = new google.maps.Geocoder();
    });

    this.getCurrentPosition = function(callback){
        navigator.geolocation.getCurrentPosition(callback);
    }

    this.getGoogleMap = function(callback){
        IsReady.promise(1).then(function (instances) {
            instances.forEach(function(inst){
                var map = inst.map;
                callback(map);
            });
        });
    }

    this.getPredictionsOnQuery = function(query, callback){

        autocompleteService.getQueryPredictions({ input: query }, function(predictions, status){
            var error;
            var availablePrediction= [];
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                error = status;
            }
            else{
                for (var i = 0, prediction; prediction = predictions[i]; i++) {
                    availablePrediction.push(prediction.description);
                }
            }
            callback(error, availablePrediction);
        });
    }

    this.addMarkOnMap = function(possition, map, callback){
        console.log(possition);
        if(possition.longitude && possition.latitude){
            map.center.longitude = possition.longitude;
            map.center.latitude = possition.latitude;
            var myLatlng = new google.maps.LatLng(map.center.latitude,map.center.longitude);
            marker = new google.maps.Marker({position: myLatlng});
            marker.setMap(map.gmapRef);
        }
        else if(possition.address){
            geocoder.geocode( { 'address': possition.address}, function(results, status) {
                var error, marker;
                if (status == google.maps.GeocoderStatus.OK) {
                    map.center.longitude = results[0].geometry.location.B;
                    map.center.latitude = results[0].geometry.location.k;
                    var myLatlng = new google.maps.LatLng(map.center.latitude,map.center.longitude);
                    marker = new google.maps.Marker({position: myLatlng});
                    marker.setMap(map.gmapRef);
                } else {
                    error = status;
                }
                callback(error, marker);
            });
        }
    }

}]);