/**
 * Created by oguzhancolak on 18.10.2016.
 */
app.controller('PasswordController', function($scope, $localStorage, $state, DialogService) {

  $scope.userInfos = $localStorage.UserInfos;
  $scope.password = "";
  $scope.canErase = false;
  $scope.pinDotVisible = {};
  $scope.success = null;

  $scope.keyboardSettings = {
    showLetters: true,
    theme: 'stable',

    action: function(number) {
      if ($scope.password.length < 4) {
        $scope.password += number;
        $scope.pinDotVisible[$scope.password.length] = true;
        $scope.canErase = true;
        $scope.success = null;
      }
    },

    leftButton: {
      html: '<i class="icon ion-ios-close-outline"></i>',
      action: function() {
        $scope.password = '';
        $scope.pinDotVisible = {};
        $scope.canErase = false;
        $scope.success = null;
      },
      style: {
        color: '#fff',
        bgColor: 'transparent',
        activeBgColor: 'rgba(0, 0, 0, 0.50)',
        borderColor: 'transparent'
      }
    },

    rightButton: {
      html: '<i class="icon ion-log-in opacity-8"></i>',
      action: function() {
        if ($scope.userInfos.Password == $scope.password) {
          $scope.success = true;
          $state.go('tab.dist');

        } else {
          DialogService.initAlertDialog('Lütfen SMS ile ' + $scope.userInfos.GsmNo + ' numarasına gelen şifrenizi kontrol ediniz.', 'Giriş başarısız', 'Tamam');
          $scope.success = false;
          $scope.password = '';
          $scope.canErase = false;
          $scope.pinDotVisible = {};
        }
      },
      style: {
        color: '#fff',
        bgColor: 'transparent',
        activeBgColor: 'rgba(0, 0, 0, 0.50)',
        borderColor: 'transparent'
      }
    }
  };

  $scope.doErase = function() {
    $scope.pinDotVisible[$scope.password.length] = false;
    $scope.password = $scope.password.slice(0, -1);
    if ($scope.password.length == 0) $scope.canErase = false;
  };

  $scope.showKeyboard = function() {
    $scope.keyboardVisible = true;
  };

  $scope.hideKeyboard = function() {
    $scope.keyboardVisible = false;
  };

  $scope.showKeyboard();
});
