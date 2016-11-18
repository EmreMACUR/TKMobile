/**
 * Created by oguzhancolak on 11.11.2016.
 */
app.service('CameraService', function($cordovaCamera) {

  this.openCamera = function(width, height, cameraDirection, saveToPhotoAlbum, allowEdit, quality) {
    var options = {
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: allowEdit,
      targetWidth: width,
      targetHeight: height,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: saveToPhotoAlbum,
      cameraDirection: cameraDirection,
      quality: quality
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      //image.src = "data:image/jpeg;base64," + imageData;  --> BASE64 DATA
      //image.src = imageURI; --> FILE LOCATION
      return imageData;
    }, function (error) {
      return false;
    });

    $cordovaCamera.cleanup();
  };

  this.openPerspectiveCamera = function () {
    // Perspective Correction Codes
  }

});
