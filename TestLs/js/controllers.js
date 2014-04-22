var  testLs = angular.module('TestLs', []);
 
testLs.controller('imageList', function ($scope, Snap) {
    $scope.files = []
    var images_root = "./img"

    Snap.dir.lsImages(images_root, function(err, files){
        var result = arguments[1]; 
        result.forEach(function(entry) {
            $scope.$apply(function(){
                var obj = {'background-image': 'url("'+ images_root + '/' + entry + '")'}
                $scope.files.push(obj)
            });
        });
    });
});
