angular.module('app').controller('journalizingCtrl', function ($scope, categoryList) {
    $scope.categoryList = categoryList;
    $scope.optionList = [
        {
            id: 0,
            name: 'a'
        },
        {
            id: 1,
            name: 's'
        }
    ];

    $scope.journalizing = {};
    $scope.journalizing.option = '0';


    $scope.addJournalizing = function () {
        console.log($scope.journalizing);
    };


});