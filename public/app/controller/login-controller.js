/**
 * Created by Zem on 2014-11-10.
 */
app.controller("LoginController", function($scope, $http, $location, SessionService){

    $scope.login = function(){
        $http.get('/user/auth', {
            params: {
                token: btoa($scope.username + ':'+$scope.password)
            }
        }).success(function(data){
            console.log(data);
            if(!data.error) {
                SessionService.setUser(data);
                $location.path('/home')
            }
        });
    }


});