/**
 * Created by Zem on 2014-11-10.
 */
app.controller("AdminController", function($scope, $http){

    $scope.editItem = function(item){
        resetNewItem();
        $scope.newItem = item;
    }

    $scope.createItem = function(){
        var item = $scope.newItem;
        item.imgsrc = $scope.itemCroppedImage;
        $http.post('/item/save',{
            item: item
        }).success(function(data){
            updateItemList(data);
        });
        resetNewItem();
    }

    function updateItemList(item){
        var found;
        $scope.items.forEach(function(i){
            if(item._id === i._id){
                i.img = item.img;
                found = true;
            }
        });
        if(!found){
            $scope.items.push(item);
        }
    }

    $scope.init = function(){
        $scope.items = [];
        resetNewItem();
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        $http.get('/item/list').success(function(items){
            $scope.items = items;
        });
    }

    function resetNewItem(){
        $scope.itemCroppedImage='';
        $scope.newItem = {};
    }

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.itemImage=evt.target.result;
            });
        };
        reader.readAsDataURL(file);
    };

    $scope.init();
});