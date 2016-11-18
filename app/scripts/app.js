var app = angular.module('TKMobile', [
  'ionic',
  'starter.services',
  'ionic-material',
  'ngCordova',
  'ngStorage',
  'ion-digit-keyboard',
  'cera.ionicSuperPopup']);

app.run(function($ionicPlatform, ionicMaterialInk, ionicMaterialMotion, $rootScope, $cordovaDevice, $localStorage) {
  $localStorage.AppVersion = "1.0.0";

  $ionicPlatform.ready(function() {
    $ionicPlatform.isFullScreen = true;
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(false);
    }
    if (window.StatusBar) {
      //StatusBar.styleDefault();
      StatusBar.overlaysWebView(true);
      StatusBar.style(1);
    }

    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();

    function resetTabs() {
      $rootScope.isActiveDashboard = '';
      $rootScope.isActiveHome = '';
      $rootScope.isActiveSettings = '';
    }

    $rootScope.changeTab = function (tabName) {
      resetTabs();
      if(tabName == 'dash')
        $rootScope.isActiveDashboard = 'active';
      else if(tabName == 'dist')
        $rootScope.isActiveHome = 'active';
      else if(tabName == 'set')
        $rootScope.isActiveSettings = 'active';
    };

    $rootScope.changeTab('dist');
  });

  document.addEventListener("deviceready", function () {
    $localStorage.platform = $cordovaDevice.getPlatform();
    $localStorage.uuid = $cordovaDevice.getUUID();
    $localStorage.version = $cordovaDevice.getVersion();
    $localStorage.deviceType = '' + $cordovaDevice.getManufacturer() + ' ' + $cordovaDevice.getModel();
  }, false);

  $localStorage.isAndroid = ionic.Platform.isAndroid();
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('password', {
    url: '/password',
    templateUrl: 'templates/password.html',
    controller: 'PasswordController'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashboardController'
      }
    }
  })

  .state('tab.dist', {
      url: '/dist',
      views: {
        'tab-dist': {
          templateUrl: 'templates/tab-dist.html',
          controller: 'DistributionController'
        }
      }
    })
    .state('tab.dist-detail', {
      url: '/dist/:distId',
      views: {
        'tab-dist': {
          templateUrl: 'templates/tab-dist-detail.html',
          controller: 'DistributionDetailController'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsController'
      }
    }
  });

  //$urlRouterProvider.otherwise('/login');
  //$urlRouterProvider.otherwise('/password');
  $urlRouterProvider.otherwise('/tab/dist');
  $ionicConfigProvider.tabs.position('bottom');

})

.constant('$ionicLoadingConfig', {
  template: '<ion-spinner class="ionic-loading"></ion-spinner>',
  number: 2000
});
