// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.$on('needLogin', function(){
        $state.go('login');
    })
  });
})
.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope', '$q', '$injector', function($rootScope, $q) {
        return {
            responseError: function(rejection) {
                if (rejection.status === 403) {
                    $rootScope.$emit('needLogin');
                }
                // otherwise, default behaviour
                return $q.reject(rejection);
            }
        };
    }])
}])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('tab.requests', {
      url: '/requests',
      views: {
        'tab-requests': {
          templateUrl: 'templates/tab-requests.html',
          controller: 'RequestsCtrl'
        }
      }
    })

    .state('tab.request-details', {
      url: '/requests/:taskId',
      views: {
        'tab-requests': {
          templateUrl: 'templates/request-details.html',
          controller: 'RequestDetailsCtrl'
        }
      }
    })

    .state('tab.user-details', {
      url: '/requests/:taskId/:userId',
      views: {
        'tab-my-requests': {
          templateUrl: 'templates/user-details.html',
          controller: 'UserDetailsCtrl'
        }
      }
    })

    .state('tab.my-requests', {
      url: '/my-requests',
      views: {
        'tab-my-requests': {
          templateUrl: 'templates/tab-my-requests.html',
          controller: 'MyRequestsCtrl'
        }
      }
    })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
      }
    )

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

