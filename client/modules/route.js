angular.module('app').constant('routeName', {
    BASE: 'base',
    MAIN: 'main',
    LOGIN: 'login',
    USER: 'user',
    CATEGORY: 'category',
    JOURNALIZING: 'journalizing'
});

angular.module('app').config(function ($stateProvider, $urlRouterProvider, routeName) {
    $stateProvider.state({
        name: routeName.BASE,
        abstract: true,
        template: '<div ui-view=""></div>',
        controller: function ($state, $sessionStorage) {
            if ($sessionStorage.token) {
                $state.go(routeName.MAIN);
            } else {
                $state.go(routeName.LOGIN);
            }
        }
    });

    $stateProvider.state({
        name: routeName.LOGIN,
        url: '/login',
        parent: routeName.BASE,
        templateUrl: 'modules/login/login.html',
        controller: 'loginCtrl',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        }
    });

    $stateProvider.state({
        name: routeName.MAIN,
        url: '/',
        parent: routeName.BASE,
        templateUrl: 'modules/main/main.html',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'mainCtrl'
    });

    $stateProvider.state({
        name: routeName.USER,
        url: 'user',
        parent: routeName.MAIN,
        templateUrl: 'modules/user/user.html',
        resolve: {
            routeName: function (routeName) {
                return routeName;
            }
        },
        controller: 'userCtrl'
    });

    $stateProvider.state({
        name: routeName.CATEGORY,
        url: 'category',
        parent: routeName.MAIN,
        templateUrl: 'modules/category/category.html',
        resolve: {
            categoryList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('/category/list').then(function (d) {
                    defer.resolve(d.data.categoryList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'categoryCtrl'
    });

    $stateProvider.state({
        name: routeName.JOURNALIZING,
        url: 'journalizing',
        parent: routeName.MAIN,
        templateUrl: 'modules/journalizing/journalizing.html',
        resolve: {
            categoryList: function ($http, $q) {
                let defer = $q.defer();
                $http.get('/category/list').then(function (d) {
                    defer.resolve(d.data.categoryList);
                }, function (e) {
                    defer.reject(e);
                });
                return defer.promise;
            }
        },
        controller: 'journalizingCtrl'
    });
    //
    // $stateProvider
    //     .state({
    //         name: routeName.DEPARTMENT,
    //         url: 'department',
    //         abstract: true,
    //         parent: routeName.INDEX,
    //         template: '<div ui-view></div>'
    //     })
    //     .state({
    //         name: routeName.DEPARTMENT_LIST,
    //         url: '/list',
    //         parent: routeName.DEPARTMENT,
    //         templateUrl: 'modules/department/departmentList.html',
    //         controller: 'departmentListCtrl',
    //         resolve: {
    //             departmentList: function ($http) {
    //                 $http.get('/department/list').then(function(d) {
    //                     return d;
    //                 })
    //             }
    //         }
    //     })
    //     .state({
    //         name: routeName.DEPARTMENT_DETAIL,
    //         url: '/detail',
    //         parent: routeName.DEPARTMENT,
    //         templateUrl: 'modules/department/departmentDetail.html',
    //         controller: 'departmentDetailCtrl'
    //     });
    //
    // $stateProvider
    //     .state({
    //         name: routeName.PROJECT,
    //         url: 'project',
    //         abstract: true,
    //         parent: routeName.INDEX,
    //         template: '<div ui-view></div>'
    //     })
    //     .state({
    //         name: routeName.PROJECT_LIST,
    //         url: '/list',
    //         parent: routeName.PROJECT,
    //         templateUrl: 'modules/project/projectList.html',
    //         controller: 'projectListCtrl',
    //         resolve: {
    //             projectList: function ($http) {
    //                 $http.get('/project/list').then(function (d) {
    //                     return d;
    //                 });
    //             }
    //         }
    //     })
    //     .state({
    //         name: routeName.PROJECT_DETAIL,
    //         url: '/detail',
    //         parent: routeName.PROJECT,
    //         templateUrl: 'modules/project/projectDetail.html',
    //         controller: 'projectDetailCtrl'
    //     });
    //


    $urlRouterProvider.otherwise('/');
});