/**
 * Created by oguzhancolak on 17.10.2016.
 */
app.controller('LoginController', function($scope, $localStorage, LoginService,
                                           $ionicLoading, VersionControlService,
                                           UpdateService, DialogService, $state,
                                           $cordovaCamera, PhotoLibraryService,
                                           FileService, CameraService) {
  $scope.form = {};
  $scope.username = "";
  $scope.appVersion = $localStorage.AppVersion;

  function getPhotoPaths() {
    PhotoLibraryService.getPhotoPaths().then(function (data) {
      if(!data)
        getPhotoPaths();
    });
  }

  function checkLibraryDir() {
    FileService.checkDirFolder().then(function (data) {
      if(data != false) {
        if(!data.isDirectory)
          createLibraryDir();
      }
      else
        createLibraryDir();
    }, function (error) {
      if(!error)
        createLibraryDir();
    })
  }

  function createLibraryDir() {
    FileService.createDirFolder().then(function (data) {
      if(data)
        getPhotoPaths();
    });
  }

  if($localStorage.isAndroid) {
    $ionicLoading.show();
    checkLibraryDir();
    VersionControlService.check().then(function(data) {
      $ionicLoading.hide();
      if(data) {
        if($localStorage.AppVersion != $localStorage.AppInfos.VersionNumber)
          UpdateService.download();
      }
      else {
        $ionicLoading.hide();
        DialogService.initAlertDialog('Lütfen hücresel veri ağının etkin olduğu yere geçin.', 'Versiyon Kontrol Uyarısı', 'Uygulamadan Çık')
          .then(function() {
            ionic.Platform.exitApp();
          })
      }
    }, function(err) {
      $ionicLoading.hide();
      DialogService.initAlertDialog('Hücresel veri ağınızın açık olduğundan emin olun.', 'Versiyon Kontrol Uyarısı', 'Uygulamadan Çık')
        .then(function() {
          ionic.Platform.exitApp();
        })
    });
  }

  $scope.login = function(username) {
    if(username != "" && username != null && username != undefined) {
      $ionicLoading.show();
      LoginService.logging(username).then(function(data) {
        $ionicLoading.hide();
        if(data)
          $state.go('password');
        else {
          $ionicLoading.hide();
          DialogService.initAlertDialog('Lütfen kullanıcı bilgilerinizi kontrol ediniz.', 'Giriş başarısız', 'Tamam');
        }
      }, function(err) {
        $ionicLoading.hide();
        DialogService.initAlertDialog('Lütfen kullanıcı bilgilerinizi kontrol ediniz. Hücresel veri ağınızın açık olduğundan emin olun.',
          'Giriş başarısız!', 'Tamam');
      });
    }
    else
      DialogService.initAlertDialog('Lütfen kullanıcı adı alanını boş bırakmayınız.', 'Kullanıcı Girişi', 'Tamam');
  };
});
