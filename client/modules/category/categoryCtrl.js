angular.module('app').controller('categoryCtrl', function ($scope, $http, categoryList) {

    $scope.categoryList = [];
    if (!_.isEmpty(categoryList)) {
        $scope.categoryList = angular.copy(categoryList);
    }

    $scope.backUpData = {};

    let doBackUpData = function (item, index) {
        $scope.backUpData = angular.copy(item);
        $scope.backUpData.index = index;
    };
    //
    // let reloadBackUpData = function (item) {
    //     item.name = $scope.backUpData.name;
    //     item.description = $scope.backUpData.description;
    // };

    $scope.setEmpty = function () {
        $scope.category.name = null;
        $scope.category.description = null;
    };

    let getCategoryList = function () {
        $http.get('/category/list').then(function (d) {
            $scope.categoryList = d.data.categoryList;
        });
    };

    $scope.addCategory = function () {
        if ($scope.category.name) {
            let params = {
                name: $scope.category.name,
                description: $scope.category.description
            };

            $http.post('/category', params).then(function (d) {
                $scope.setEmpty();
                getCategoryList();
            });
            // $scope.categoryList.push({
            //     name: $scope.category.name,
            //     description: $scope.category.description
            // });
        } else {
            // error popup
        }
    };

    $scope.updateCategory = function (category) {
        if (category.name) {
            let params = {
                id: category._id,
                name: category.name,
                description: category.description
            };

            $http.put('/category?id' + category._id, params).then(function (d) {
                $scope.backUpData = {};
                getCategoryList();
            });
        }
    };

    $scope.removeCategory = function (category) {
        $http.delete('/category?id=' + category._id).then(function (d) {
            getCategoryList();
        });
    };


let editingIndex = '';
    $scope.editCategory = function (index) {
        let category = $scope.categoryList[index];
        $scope.cancelEditCategory(editingIndex);
        editingIndex = index;
        $scope.backUpData = {
            name: category.name,
            description: category.description
        };
        category.editable = true;
    };

    $scope.cancelEditCategory = function (index) {
        let category = $scope.categoryList[index];
        if (!category) {
            return;
        }
        category.name = $scope.backUpData.name;
        category.description = $scope.backUpData.description;
        category.editable = false;
        $scope.backUpData = {};
        editingIndex = '';
    };
});