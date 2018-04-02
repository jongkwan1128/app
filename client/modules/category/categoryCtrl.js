angular.module('app').controller('categoryCtrl', function ($scope) {

    $scope.categoryList = [];
    for (let i = 0; i < 10; i++) {
        $scope.categoryList.push({name: 'item ' + i});
    }

    $scope.createCategory = function (category) {
        console.log(category)
    }
});