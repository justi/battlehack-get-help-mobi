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

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {


    $scope.loading = $ionicLoading.show({
        content: 'Getting current location&hellip;',
        showBackdrop: false
    });

  $scope.centerOnMe = function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });

        $scope.map = map;
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
        $scope.loading.hide();
    });
  };

  $scope.centerOnMe();

});
