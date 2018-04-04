angular.module('app').controller('journalizingCtrl', function ($scope, $http, categoryList, journalizingList) {
    $scope.categoryList = categoryList;
    $scope.journalizingList = journalizingList;
    $scope.optionList = [
        {
            id: 0,
            name: true
        },
        {
            id: 1,
            name: false
        }
    ];

    let setDefault = function () {
        $scope.journalizing = {};
        $scope.journalizing.option = true;
        $scope.journalizing.category = $scope.categoryList[0]._id;
        $scope.journalizing.datetime = new Date();
    };

    setDefault();

    let getJournalizingList = function () {
        $http.get('/journalizing/list').then(function (d) {
            $scope.journalizingList = d.data.journalizingList;
        });
    };

    $scope.addJournalizing = function () {
        console.log($scope.journalizing);
        if (!$scope.journalizing.datetime) {
            return;
        }
        if (!$scope.journalizing.option) {
            return;
        }
        if (!$scope.journalizing.category) {
            return;
        }
        if (!$scope.journalizing.amount) {
            return;
        }

        let params = {
            datetime: $scope.journalizing.datetime,
            option: $scope.journalizing.option,
            category: $scope.journalizing.category,
            amount: $scope.journalizing.amount,
            description: $scope.journalizing.description
        };

        $http.post('/journalizing', params).then(function (d) {
            setDefault();
            getJournalizingList();
        });

    };

    $scope.removeJorunalizing = function (item) {
        $http.delete('/journalizing?id=' + item._id).then(function (d) {
            getJournalizingList();
        });
    };


})

    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('YYYY-MM-DD');
        };
    });

