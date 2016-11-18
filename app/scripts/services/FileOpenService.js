/**
 * Created by oguzhancolak on 20.10.2016.
 */
app.service('FileOpenService', function($q, $cordovaFileOpener2, ProgressDialogService, $ionicLoading, DialogService) {
  this.open = function(fileData) {
    $ionicLoading.show();
    $cordovaFileOpener2.open(
      fileData.nativeURL,
      'application/vnd.android.package-archive'
    ).then(function() {
      $ionicLoading.hide();
      isInstalled();
    }, function(err) {
      $ionicLoading.hide();
      DialogService.initAlertDialog("Uygulama açılırken bir hata oluştu!", "Uygulama Açma Hatası", "Uygulamadan Çık")
        .then(function() {
          ionic.Platform.exitApp();
        });
    });
  };

  var isInstalled = function () {
    $ionicLoading.show();
    $cordovaFileOpener2.appIsInstalled('io.telekurye.tkmobile').then(function(res) {
      $ionicLoading.hide();
      if (res.status === 0) {
        ProgressDialogService.setProgressDismiss();
        DialogService.initAlertDialog('Uygulama yüklenirken bir hata oluştu!', "Uygulama Yükleme Hatası", "Uygulamadan Çık")
          .then(function() {
            ionic.Platform.exitApp();
          });

      } else {
        ProgressDialogService.setProgressDismiss();
        ionic.Platform.exitApp();
      }
    });
  };
});
