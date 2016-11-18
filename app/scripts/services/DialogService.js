/**
 * Created by oguzhancolak on 21.10.2016.
 */
app.service('DialogService', function($cordovaDialogs) {
  this.initAlertDialog = function(message, title, buttonName) {
    $cordovaDialogs.alert(message, title, buttonName);
  };

  this.initConfirmDialog = function(message, title, buttons) {
    $cordovaDialogs.confirm(message, title, buttons);
  };

  this.initPromptDialog = function(message, title, buttons, text) {
    $cordovaDialogs.prompt(message, title, buttons, text);
  };

  this.initTechnicalProblemAlert = function() {
    $cordovaDialogs.alert("Teknik bir hata oluştu. Lütfen tekrar deneyin.", "Teknik Hata", "Tamam");
  };

  this.initWifiProblemAlert = function() {
    $cordovaDialogs.alert("Wi-fi kapalı durumda. Lütfen Wi-fi açınız.", "Wifi Hatası", "Wi-fi Aç")
      .then(function() {
        // callback success
      });
  };
});
