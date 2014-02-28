var myApp = angular.module('myApp', []);

myApp.factory('Data', function () {
    return {};
});

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}

// Controllers 
function IdentityCtrl($scope) {
    $scope.data = {};
    if ( isNormalInteger($scope.data.age) ) {
        $scope.data.age + 10
    }
    Data = $scope.data 
};

// Handler Snap
function readyHandler(err, sb) {
    //sb.system.getNetworkAddresses(printAdress);
    //sb.users.getUserInfo(printUserInfo);
};


Snap.ready(readyHandler);
