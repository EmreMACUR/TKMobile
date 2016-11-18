/**
 * Created by oguzhancolak on 20.10.2016.
 */
app.service('ProgressDialogService', function () {
  this.setProgressIndicator = function(title, message, cancelable) {
    cordova.plugin.pDialog.init({
      theme: 'TRADITIONAL',
      title: title,
      message : message,
      progressStyle: 'HORIZONTAL'
    })
      .setProgress(0)
      .setCancelable(cancelable);
  };

  this.setProgressPercent = function (per) {
    cordova.plugin.pDialog.setProgress(per);
  };

  this.setProgressDismiss = function () {
    cordova.plugin.pDialog.dismiss();
  }
});
