
var currentHeading;
var hasCompass;
var compassHousing;

function onDeviceOrientationChange(event) {
    var accuracy;
    if (event.webkitCompassHeading !== undefined) {
      // Direction values are measured in degrees starting at due north and continuing clockwise around the compass.
      // Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on. A negative value indicates an invalid direction.
      currentHeading = (360 - event.webkitCompassHeading);
      accuracy = event.webkitCompassAccuracy;
    } else if (event.alpha != null) {
      // alpha returns the rotation of the device around the Z axis; that is, the number of degrees by which the device is being twisted
      // around the center of the screen
      // (support for android)
      currentHeading = (270 - event.alpha) * -1;
      accuracy = event.webkitCompassAccuracy;
    }

    if (accuracy < 11) {
      compassNeedleContext.fillStyle = "rgba(0, 205, 0, 0.9)";
    } else if (accuracy >= 15 && accuracy < 25) {
      compassNeedleContext.fillStyle = "rgba(255, 255, 0, 0.9)";
    } else if (accuracy > 24) {
      compassNeedleContext.fillStyle = "rgba(255, 0, 0, 0.9)";
    }
    compassNeedleContext.fill();

    if (renderingInterval == -1) {
      rotateNeedle();
    }
  }

  // Test if the device has a gyroscope.
// Instances of the DeviceOrientationEvent class are fired only when the device has a gyroscope and while the user is changing the orientation.
function hasGyroscope(event) {
    // dojo.disconnect(compassTestHandle);
    if (event.webkitCompassHeading !== undefined || event.alpha != null) {
        hasCompass = true;
    } else {
        hasCompass = false;
    }
    orientationChangeHandler();
}


// function orientationChangeHandler() {
//     // An event handler for device orientation events sent to the window.
//     orientationHandle = on(window, "deviceorientation", onDeviceOrientationChange);
//     // The setInterval() method calls rotateNeedle at specified intervals (in milliseconds).
//     renderingInterval = setInterval(rotateNeedle, 100);
//   }

function isWebKit () {return ( /WebKit/.test(navigator.userAgent) ) }

var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
var compassTestHandle             
// if (isWebKit()) {
//     hasCompass = false;
//     orientationChangeHandler();
//     alert("Your browser does not support WebKit.");
//     } else if (window.DeviceOrientationEvent) {
//     compassTestHandle = on(window, "deviceorientation", hasGyroscope);
//     } else {
//     hasCompass = false;
//     orientationChangeHandler();
// }

const orient = (orientationChanged) => {
    // window.addEventListener(orientationEvent, function () {
    //     orientationChanged();
    // }, false);

    function process(event){
        if (event.webkitCompassHeading !== undefined || event.alpha != null) {
            hasCompass = true
        }else{
            hasCompass = false
        }

        var accuracy;
        if (event.webkitCompassHeading !== undefined) {
            // Direction values are measured in degrees starting at due north and continuing clockwise around the compass.
            // Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on. A negative value indicates an invalid direction.
            currentHeading = (360 - event.webkitCompassHeading);
            accuracy = event.webkitCompassAccuracy;
        } else if (event.alpha != null) {
            // alpha returns the rotation of the device around the Z axis; that is, the number of degrees by which the device is being twisted
            // around the center of the screen
            // (support for android)
            currentHeading = (270 - event.alpha) * -1;
            accuracy = event.webkitCompassAccuracy;
        }

        orientationChanged(currentHeading, accuracy)

    }
    if (window.DeviceOrientationEvent){
        window.addEventListener("deviceorientation", process)
    }
}

export default orient