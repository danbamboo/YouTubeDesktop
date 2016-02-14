(function () {

      var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');

     function init() {
          document.getElementById("min-btn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.minimize();
          });

          document.getElementById("max-btn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               if(window.isMaximized()){
                 window.unmaximize();
                 document.getElementById("max-i").innerHTML = "crop_din";
               }
               else if(window.isMaximized() == false){
                 window.maximize();
                 document.getElementById("max-i").innerHTML = "crop_16_9";
               }
          });

          /*if(document.getElementById("max-btn")){
            document.getElementById("max-btn").addEventListener("click", function (e) {
                 var window = BrowserWindow.getFocusedWindow();
                 window.maximize();

            });
          }
          else if(document.getElementById("restore-btn")){
            document
          }*/

          document.getElementById("close-btn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.close();
          });
     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
          }
     };

})();
