/**
 * Created by oguzhancolak on 8.11.2016.
 */
app.service('PhotoLibraryService', function($q, $ionicPlatform, DialogService) {
  return {
    getPhotoPaths: function() {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var filePath = "", fileArray = [];

      if (window.cordova) {
        document.addEventListener('deviceready', function() {
          window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, onFileSystemSuccess, fail);

          function onFileSystemSuccess(fileSystem) {
            filePath = cordova.file.externalRootDirectory;
            var directoryReader = fileSystem.createReader();
            directoryReader.readEntries(function (entries) {
              var i;
              for (i = 0; i < entries.length; i++) {
                if (entries[i].name === "Pictures") {
                  var dcimReader = entries[i].createReader();
                  dcimReader.readEntries(onGetDCIM, fail);
                  break; // remove this to traverse through all the folders and files
                }
              }
            }, function () {
              deferred.reject(false);
              DialogService.initAlertDialog('Sistem fotoğraflarına erişim sağlanamıyor. Lütfen yetkililerle iletişime geçiniz.',
                'Fotoğraf Kütüphane Uyarısı', 'Uygulamadan Çık')
                .then(function() {
                  ionic.Platform.exitApp();
                })
            });
          }

          function onGetDCIM(entries) {
            var fileName = "", file = "", i;
            for (i = 0; i < entries.length; i++) {
              if (entries[i].name === "100MEDIA") {
                var mediaReader = entries[i].createReader();
                mediaReader.readEntries(onGetFileNames, fail);
                break; // remove this to traverse through all the folders and files
              }
              fileName = entries[i].name;
              file = filePath + fileName;
              fileArray.push(file);
              if(fileArray.length == entries.length) {
                alert(JSON.stringify(fileArray));
                deferred.resolve(true);
              }
            }
          }

          function onGetFileNames(entries) {
            var i;
            for (i = 0; i < entries.length; i++) {
              if (/\.(jpe?g|png|gif|bmp)$/i.test(entries[i].name)) {
                //app.mediaFiles.push(entries[i]);
              }
            }
          }

          function fail(err) {
            deferred.reject(false);
            DialogService.initAlertDialog('Sistem klasörüne erişim sağlanamıyor. Lütfen yetkililerle iletişime geçiniz.',
              'Sistem Uyarısı', 'Uygulamadan Çık')
              .then(function() {
                ionic.Platform.exitApp();
              })
          }
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
  }
});
