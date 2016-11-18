/**
 * Created by oguzhancolak on 20.10.2016.
 */
app.service('UpdateService', function($q, $localStorage, ProgressDialogService, $cordovaFileTransfer,
                                      $timeout, FileOpenService, DialogService) {
  this.download = function() {
    document.addEventListener('deviceready', function () {
      var url = $localStorage.AppInfos.URL;
      var targetPath = cordova.file.externalRootDirectory + "/Download/tkmobile.apk";
      var trustHosts = true;
      var options = {};

      ProgressDialogService.setProgressIndicator("Güncelleme İndiriliyor", "İndirme esnasında uygulamayı kapatmayınız." +
        " Güncelleme indirildikten sonra 'YÜKLE' butonuna basınız. Lütfen Bekleyiniz..", false);

      $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        .then(function(result) {
          FileOpenService.open(result);
        }, function(err) {
          DialogService.initAlertDialog("Ugulama indirilirken bir hata oluştu!", "Uygulama İndirme Hatası", "Uygulamadan Çık")
            .then(function() {
              ionic.Platform.exitApp();
            });
        }, function (progress) {
          $timeout(function () {
            var downloadProgress = parseInt((progress.loaded / progress.total) * 100);
            ProgressDialogService.setProgressPercent(downloadProgress);
          });
        });

    }, false);
  }
});
