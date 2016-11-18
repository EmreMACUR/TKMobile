/**
 * Created by oguzhancolak on 8.11.2016.
 */
app.service('FileService', function($q, DialogService, $cordovaFile) {
    this.createDirFolder = function() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (window.cordova) {
        document.addEventListener('deviceready', function() {
          $cordovaFile.createDir(cordova.file.externalRootDirectory, "TKPhotoLibrary", false)
            .then(function (success) {
              // success
              deferred.resolve(true);
            }, function (error) {
              deferred.reject(false);
              DialogService.initAlertDialog('Sistem klasörlerine erişim sağlanamıyor. Lütfen yetkililerle iletişime geçiniz.',
                'Klasör Erişim Uyarısı', 'Uygulamadan Çık')
                .then(function() {
                  ionic.Platform.exitApp();
                })
            });
        }, false);
      }
      else
        deferred.reject(false);

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    };

    this.checkDirFolder = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (window.cordova) {
        document.addEventListener('deviceready', function() {
          $cordovaFile.checkDir(cordova.file.externalRootDirectory, "TKPhotoLibrary")
            .then(function (success) {
              // success
              deferred.resolve(success);
            }, function (error) {
              deferred.reject(false);
            });
        }, false);
      }
      else
        deferred.reject(false);

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      };
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      };
      return promise;
    }
});
