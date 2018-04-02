angular.module('app').controller('loginCtrl', function ($scope, $http, $sessionStorage, $state, routeName) {

    console.log('accountCtrl');

    $scope.doLogin = function (user) {
        let params = {
            email: user.email,
            password: user.password
        };
        $http.post('/login', params).then(function (d) {
            if (d.data.success === true) {
                $sessionStorage['token'] = d.data.token;
                $sessionStorage['user'] = d.data.user;
                $state.go(routeName.MAIN);
            } else {
                console.log()
            }
        }, function (err) {
            console.error(err);
        });
    };

    // $scope.createAccount = function (user) {
    //     let params = {
    //         eNumber: user.eNumber,
    //         name: user.name,
    //         email: user.email,
    //         password: user.password
    //     };
    //
    //     $http.post('/account/signup', params).then(function (d) {
    //         // popup with info
    //         $scope.isLogin = true;
    //     }, function (err) {
    //         console.error(err);
    //     });
    // };
});