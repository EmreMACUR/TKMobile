/**
 * Created by oguzhancolak on 20.10.2016.
 */
app.service('LoginService', function($q, $http, $localStorage, SERVER) {
  return {
    logging: function(username) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $localStorage.UserInfos = null;

      $http.post(SERVER.API + 'user',
        {
          'UserName': username,
          'DeviceId': $localStorage.uuid
        })
        .success(function (data, status, headers, config) {
          if(data != null && data != "") {
            $localStorage.UserInfos = data;
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
