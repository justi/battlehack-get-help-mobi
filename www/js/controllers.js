angular.module('starter.controllers', [])

    .controller('SettingsCtrl', function($scope) {
    })

    .controller('RequestsCtrl', function($scope, Users) {
      $scope.users = Users.all();
    })

    .controller('RequestDetailsCtrl', function($scope, $stateParams, Users) {
      $scope.user = Users.get($stateParams.userId);
    })

    .controller('MyRequestsCtrl', function($scope) {
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
                    panControl: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [
                            google.maps.MapTypeId.ROADMAP,
                            google.maps.MapTypeId.HYBRID]
                    },
                    mapTypeId: 'hybrid'
                };
                var map = new google.maps.Map(document.getElementById("map"),
                    mapOptions);
                map.setTilt(45);
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    title: 'Starting point'
                });

                $scope.map = map;
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
                $scope.loading.hide();
            });
        };

        $scope.init();

        $scope.centerOnMe = function() {
            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            });
        };

    });
