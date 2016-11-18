/**
 * Created by oguzhancolak on 20.10.2016.
 */

app.service('VersionControlService', function($q, $http, $localStorage, SERVER) {
  return {
    check: function() {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $localStorage.AppInfos = null;

      $http.get(SERVER.API + 'version')
        .success(function (data, status, headers, config) {
          if(data != null && data != "") {
            $localStorage.AppInfos = data;
            deferred.resolve(true);
          }
          else
            deferred.reject(false);
        })
        .error(function (data, status) {
          deferred.reject(false);
        });

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
