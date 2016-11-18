/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('DistributionController', function($scope, Chats, SyncService, $rootScope, ionicSuperPopup) {

  $scope.data = {
    showDelete: false
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
    $scope.$apply();
  };

  SyncService.setDatabase();
  SyncService.sync();
  SyncService.startListening();

  $scope.items = [];

  $rootScope.$on("$pouchDB:change", function(event, data) {
    $scope.items.push(data.doc);
    $scope.$apply();
  });

  $rootScope.$on("$pouchDB:delete", function(event, data) {
    //delete $scope.items[data.doc._id];
    for(var i = 0; i < $scope.items.length; i++) {
      if($scope.items[i]._id == data.doc._id) {
        $scope.items.splice(i, 1);
        $scope.$apply();
      }
    }
  });

  $scope.toggleItem= function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };

  $scope.itemDetailPopup = function (itemData) {
    var text = "";
    for(var i = 0; i < itemData.WorkOrderDataInfo.length; i++) {
      //text = text + itemData.WorkOrderDataInfo[i].Label + " : ";
      if(itemData.WorkOrderDataInfo[i].Description == "")
        text = text + "-\r\n";
      else
        text = text + itemData.WorkOrderDataInfo[i].Description + "\r\n";
    }
    ionicSuperPopup.show({
        title: "Görev " + itemData.OrderIndex,
        text: text,
        imageUrl: "images/" + itemData.distType + ".png",
        showCancelButton: true,
        confirmButtonColor: "",
        confirmButtonText: "Göreve Başla",
        cancelButtonText: "İptal",
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function(isConfirm){
      /*if (isConfirm) {
        ionicSuperPopup.show("You did it!", "You totally just did something!", "success");
      } else {
        ionicSuperPopup.show("Cancelled", "Pew, you totally didn't do anything!", "error");
      }*/
    });
  };

});
