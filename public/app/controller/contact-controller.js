/**
 * Created by Johannes on 18/01/2015.
 */
app.controller('ContactController', function($scope, $routeParams,  $location, MapService) {

    $scope.map = {
        center: {
            latitude: 58.537587,
            longitude: 15.036868
        },
        zoom: 15,
        gmapRef: {},
        markers: []
    };


    $scope.init = function(){

        MapService.getGoogleMap(function(map){
            $scope.map.gmapRef = map;

            MapService.addMarkOnMap($scope.map.center,$scope.map, function(error, marker) {

            });
        });

    }


    $scope.init();
});