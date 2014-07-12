angular.module('starter.controllers', [])

    .controller('SettingsCtrl', function($scope) {
        var ls = window.localStorage;

        if(!ls.getItem('settings')) {
            var baseSettings = {
                'categories': {
                    'Babysitting': true,
                    'Moving in/out': true,
                    'Groceries': true,
                    'Transport': true,
                    'Pet care': true,
                    'Emergency': true,
                    'BattleHack': true
                }
            }
            console.log(baseSettings);
            ls.setItem('settings', JSON.stringify(baseSettings));
        }

        $scope.settings = JSON.parse(ls.getItem('settings'));
        $scope.$watch('settings', function() {
            ls.setItem('settings', JSON.stringify($scope.settings));
        }, true);
        $scope.openWindow = function() {
            window.open('http://apache.org', '_blank', 'location=yes');
        };
    })

    .controller('RequestsCtrl', function($scope, Users) {
        $scope.users = Users.all();
    })

    .controller('RequestDetailsCtrl', function($scope, $stateParams, Users) {
        $scope.user = Users.get($stateParams.userId);
    })

    .controller('UserDetailsCtrl', function($scope, $stateParams, Tasks, Users) {
        //$scope.task = Tasks.get($stateParams.taskId);
        $scope.user = Users.get($stateParams.userId);
    })

    .controller('MyRequestsCtrl', function($scope, Users, Categories) {
        $scope.users = Users.all();
        $scope.categories = Categories.all();
        $scope.myTask = {
            points: 0,
            title: '',
            details: ''
        };
    })

    .controller('MapCtrl', function ($scope, $ionicLoading, $compile) {


        $scope.loading = $ionicLoading.show({
            content: 'Getting current location&hellip;',
            showBackdrop: false
        });

        $scope.init = function () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var myLatlng = new google.maps.LatLng(52.2684177, 20.9895862);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 18,
                    minZoom: 13,
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: false,
                    overviewMapControl: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.HYBRID]
                    },
                    mapTypeId: google.maps.MapTypeId.HYBRID
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);
                var me = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Starting point'
                });

                $scope.map = map;
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.map.setTilt(45);
                $ionicLoading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
                $ionicLoading.hide();
            });
        };

        $scope.init();
        $scope.$on(
            "$destroy",
            function() {
                $ionicLoading.hide();
            }
        );

    })
    .controller('ContentCtrl', function($scope, $ionicSideMenuDelegate, Categories) {
        var ls = window.localStorage;

        if(!ls.getItem('settings')) {
            var baseSettings = {
                'categories': {
                    'Babysitting': true,
                    'Moving in/out': true,
                    'Groceries': true,
                    'Transport': true,
                    'Pet care': true,
                    'Emergency': true,
                    'BattleHack': true
                }
            }
            ls.setItem('settings', JSON.stringify(baseSettings));
        }

        $scope.settings = JSON.parse(ls.getItem('settings'));
        $scope.$watch('settings', function() {
            ls.setItem('settings', JSON.stringify($scope.settings));
        }, true);
        $scope.categories = Categories.all();
    })
    .controller('LoginCtrl', function ($scope, $http, $rootScope, $state) {
        var ls = window.localStorage;
        if(ls.getItem('token')) {
            $scope.error = null;
            $http.defaults.headers.common['X-Token'] = JSON.parse(ls.getItem('token'));
            $http.get('http://favourhood.org/api/points').success(function(data) {
                $rootScope.points = data.points;
            });
            $state.go('tab.map');
        }

        $scope.userdata = {
            email:'krzysztof.hasinski@gmail.com'
        };
        $scope.error = null;
        $scope.test = function() { $state.go('tab-map'); }
        $scope.login = function() {
            $http.post('http://favourhood.org/api/login', $scope.userdata)
                .success(function(data) {
                    $scope.error = null;
                    $http.defaults.headers.common['X-Token'] = data.login_token;
                    ls.setItem('token', JSON.stringify(data.login_token));
                    $http.get('http://favourhood.org/api/points').success(function(data) {
                        $rootScope.points = data.points;
                    });
                    $state.go('tab.map');
                })
                .error(function() {
                    $scope.error = "Invalid username and/or password"
                });
        }
    })
;

