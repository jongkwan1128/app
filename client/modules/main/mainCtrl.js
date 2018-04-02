angular.module('app').controller('mainCtrl', function ($scope, $state, $http, $sessionStorage, routeName) {
    $scope.routeName = routeName;

    if ($sessionStorage.user) {
        $scope.user = $sessionStorage.user;
    }

    $scope.doLogout = function (user) {
        let token;
        if ($sessionStorage.token) {
            token = $sessionStorage.token;
            $http.get('/logout?token='+ token).then(function (d) {
                console.log(d);
                delete $sessionStorage.token;
                delete $sessionStorage.user;
                $state.go(routeName.LOGIN);
            });
        }
    };
});