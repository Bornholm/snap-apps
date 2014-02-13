var myApp = angular.module('myApp', []);

myApp.factory('Data', function () {
    return { firstname: "Anonymous",
             lastname: "Noname",
             age: '10'};
});

function isNormalInteger(str) {
    var n = ~~Number(str);
    return String(n) === str && n >= 0;
}

// Controllers 
function IdentityCtrl($scope) {
    if ( isNormalInteger($scope.data.age) ) {
        $scope.data.age += 10
    }
};

// Handler Snap
function readyHandler(err, sb) {
    //sb.system.getNetworkAddresses(printAdress);
    //sb.users.getUserInfo(printUserInfo);
};


Snap.ready(readyHandler);
