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

    .controller('RequestsCtrl', function($scope, Users, $http, $rootScope, $ionicLoading) {
        $scope.show = false;
        $scope.loading = $ionicLoading.show({
            content: 'Getting current location&hellip;',
            showBackdrop: false
        });
        $scope.users = Users.all();
        $rootScope.tasks = [];

        navigator.geolocation.getCurrentPosition(function (pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            $http({
                url: 'http://favourhood.org/api/task',
                method: "GET",
                params: {
                    'lat': lat,
                    'lng': lng,
                    'types': [] //
                }
            }).success(function(data){
                $rootScope.tasks = data;
                $scope.show = true;
                $ionicLoading.hide();
            });
        });

        $scope.$on(
            "$destroy",
            function() {
                $ionicLoading.hide();
            }
        );
    })

    .controller('RequestDetailsCtrl', function($scope, $stateParams, $rootScope, $state, $http) {
        var taskId = $stateParams.taskId;
        if(!$rootScope.tasks) {
            $state.go('tab.requests')
        }
        for(var i=0; i<$rootScope.tasks.length; ++i) {
            if($rootScope.tasks[i].id == taskId)
            {
                $scope.task = $rootScope.tasks[i];
            }
        }
        $scope.apply = function() {
            $http.post('http://favourhood.org/api/apply/' + $scope.task.id).success(function(){
                $state.go('tab.requests');
            });
        };
        $scope.cancel = function() {
            // TODO
        };
    })

    .controller('UserDetailsCtrl', function($scope, $stateParams, Tasks, Users) {
        //$scope.task = Tasks.get($stateParams.taskId);
        $scope.user = Users.get($stateParams.userId);
    })

    .controller('MyRequestsCtrl', function($scope, Users, Categories, $http, $state) {
        $scope.myTask = null;
        $scope.show = null;
        $scope.categories = Categories.all();

        $scope.delete = function() {
            $http.post('http://favourhood.org/api/task/delete').success(function(){
                $state.go($state.current, {}, {reload: true});
            });
        }
        $http.get('http://favourhood.org/api/task/my').success(function(data){
            if(data!='null') {
                $scope.show='edit';
                $scope.myTask = data;
                $scope.applied = [];
                $http.get('http://favourhood.org/api/applied').success(function(data){
                    $scope.applied = data;
                });
            } else {
                $scope.show='add';
                $scope.myTask = {
                    points: 1,
                    title: '',
                    details: '',
                    type: ''
                };
            }
        });
        $scope.add = function() {
            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.myTask.lat = pos.coords.latitude;
                $scope.myTask.lng = pos.coords.longitude;
                $scope.myTask.deadline = Date.now() + (3600 * 1000);
                $http.post('http://favourhood.org/api/task/delete').success(function(){
                    $http.post('http://favourhood.org/api/task', $scope.myTask).success(function(data) {
                        $state.go($state.current, {}, {reload: true});
                    });
                });
            }, function(err) { console.log(err); });
        }
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
    .controller('LeftSlideCtrl', function($scope, $ionicSideMenuDelegate, Categories) {
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
    .controller('RightSlideCtrl', function($scope, $ionicSideMenuDelegate, Badges, $rootScope) {
        $scope.badges = Badges.all();
    })
    .controller('LoginCtrl', function ($scope, $http, $rootScope, $state) {
        var ls = window.localStorage;
        if(ls.getItem('token')) {
            $scope.error = null;
            $http.defaults.headers.common['X-Token'] = JSON.parse(ls.getItem('token'));
            $rootScope.emailHash = JSON.parse(ls.getItem('emailHash'));
            $http.get('http://favourhood.org/api/points').success(function(data) {
                $rootScope.points = data.points;
            });
            $state.go('tab.map');
        }

        $scope.userdata = {
            email:'krzysztof.hasinski@gmail.com'
        };

        $scope.login = function() {
            $http.post('http://favourhood.org/api/login', $scope.userdata)
                .success(function(data) {
                    $http.defaults.headers.common['X-Token'] = data.login_token;
                    $rootScope.emailHash = data.email_hash;
                    ls.setItem('emailHash', JSON.stringify(data.email_hash));
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

