/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('SettingsController', function($scope, SyncSrvc, $rootScope) {
  $scope.settings = {
    enableWifi: true
  };

  $scope.callAdmin = function(){
    var number = '05074290210' ;
    window.location.href = 'tel:'+ number;
  };

  SyncSrvc.setDatabase();
  SyncSrvc.sync();
  SyncSrvc.startListening();

  $scope.items = {};

  $rootScope.$on("$pouchDB:change", function(event, data) {
    $scope.items[data.doc._id] = data.doc;
    $scope.$apply();
  });

  $rootScope.$on("$pouchDB:delete", function(event, data) {
    delete $scope.items[data.doc._id];
    $scope.$apply();
  });
});
