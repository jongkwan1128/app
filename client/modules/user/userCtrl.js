angular.module('app').controller('userCtrl', function ($scope, $http) {


    $scope.creatUser = function (user) {
        console.log(user)
        let params = {
            email: user.email,
            password: user.password,
            name: user.name
        };

        $http.post('/user', params).then(function (d) {
            console.log(d)
        }, function (e) {
            console.error(e);
        })
    }
});