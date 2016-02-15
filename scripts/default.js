(function () {

      var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');
      var iframe = document.getElementById("main-frame");
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;


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

          document.getElementById("close-btn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.close();
          });
     };

     function setTitleShown() {
       var frameTitle = document.getElementById('main-frame').contentWindow.document.title;
       document.getElementById("titleShown").innerHTML = frameTitle;
       document.getElementById("sidebarTitle").innerHTML = frameTitle;
       document.title = "YouTubeDesktop -- " + frameTitle;
     };

     function addEventListeners(docTarget) {
       document.getElementById("enter-url__showhide").addEventListener("click", function (e) {
            fade("enter-url");
            fade("enter-url__obfuscator");
       });
       document.getElementById("enter-url__close").addEventListener("click", function (e) {
            fade("enter-url");
            fade("enter-url__obfuscator");
       });
       document.getElementById("enter-url__obfuscator").addEventListener("click", function (e) {
            fade("enter-url");
            fade("enter-url__obfuscator");
       });
       document.getElementById("nav-opendevtools").addEventListener("click", function (e) {
            BrowserWindow.getFocusedWindow().openDevTools();
       });
     }

     function fade(objectID) {
        object = document.getElementById(objectID);
        objectOpacity = object.style.opacity;
       if(objectOpacity == 0) {
         object.style.opacity = "1";
         object.style.pointerEvents = "auto";
       }
       else if(objectOpacity > 0) {
         object.style.opacity = "0";
         object.style.pointerEvents = "none";
       }
     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
               setTitleShown();
               var isInScene = false;
               addEventListeners(document);
               /*addEventListeners("innerDoc");*/
          }
     };

})();
