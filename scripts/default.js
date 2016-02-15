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

     function setTitleShown() {
       var frameTitle = document.getElementById('main-frame').contentWindow.document.title;
       document.getElementById("titleShown").innerHTML = frameTitle;
       document.getElementById("sidebarTitle").innerHTML = frameTitle;
       document.title = "YouTubeDesktop -- " + frameTitle;
     };

     function addEventListeners(docTarget) {
       docTarget.getElementById("enter-url__showhide").addEventListener("click", function (e) {
            fade("enter-url");
            /*fade("enter-url-background");*/
       });
       /*docTarget.getElementById("enter-url-background").addEventListener("click", function(e) {
            fade("enter-url");
            fade("enter-url-background");
       });*/
     }

     function fade(objectID) {
        object = document.getElementById(objectID);
        objectStyle = window.getComputedStyle(object);
        objectOpacity = objectStyle.getPropertyValue('opacity');
       if(objectOpacity > 0) {object.isInScene = true}
       else if(objectOpacity <= 0) {object.isInScene = false};
       /*if(object.isInScene) {
         object.className += " fadeIn";
         object.isInScene = true;
       }
       else if(object.isInScene != true) {
         object.className -= " fadeIn";
         object.isInScene = false;
       }*/
       if(object.isInScene != true) {
         object.className += " fadeIn";
         object.isInScene = true;
       }
       else if(object.isInScene) {
         object.className = object.className.replace( /(?:^|\s)fadeIn(?!\S)/ , '');
         object.isInScene = false;
       };
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
