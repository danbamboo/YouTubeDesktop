(function () {

      const remote = require('remote');
      const electron = require('electron');
      const BrowserWindow = remote.require('browser-window');
      const shell = require('electron').shell;
      const fs = require('fs');
      const iframep = document.getElementById("main-frame");
      const innerDoc = iframep.contentWindow;


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
       document.getElementById("titleShown").innerHTML = "Desktop -- " + frameTitle;
       document.getElementById("sidebarTitle").innerHTML = frameTitle;
       document.title = frameTitle;
     };

     function addEventListeners() {
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
       /*nav*/
       document.getElementById("nav-opendevtools").addEventListener("click", function (e) {
            BrowserWindow.getFocusedWindow().openDevTools();
            document.getElementById("sidebar").className = "mdl-layout__drawer";
            document.getElementsByClassName("mdl-layout__obfuscator")[0].className = "mdl-layout__obfuscator";
       });
       document.getElementById("nav-dashboard").addEventListener("click", function () {
         document.getElementById("main-frame").src = "pages/dashboard.html";
         document.getElementById("sidebar").className = "mdl-layout__drawer";
         document.getElementsByClassName("mdl-layout__obfuscator")[0].className = "mdl-layout__obfuscator";
       });
       document.getElementById("nav-about").addEventListener("click", function () {
         shell.openExternal("https://rittbys.github.io/YouTubeDesktop");
         document.getElementById("sidebar").className = "mdl-layout__drawer";
         document.getElementsByClassName("mdl-layout__obfuscator")[0].className = "mdl-layout__obfuscator";
       });
       /*end of nav*/
       document.getElementById("submit-url").onclick = function (e) {

            var configContents = JSON.parse(fs.readFileSync("./local_config/config.json"));
            var APIKey = configContents.APIKey;

            var enteredValue = document.getElementById("enter-url__input").value;
            var regex = /(?:\<a href\=\")?(?:https?\:\/\/)?(?:www\.|m\.)?youtube\.com\/watch.*?[?&]v=([\w\-]+)/gmi;
            var altRegex = /(?:\<a href\-\")?(?:https?\:\/\/)?(?:www\.|m\.)?youtu\.be\/([\w\-]+)/gmi;
            var value = regex.exec(enteredValue);
            var altValue = altRegex.exec(enteredValue);
            if(value) {
              document.getElementById("main-frame").src = "pages/watch.html?v=" + value[1] + "&APIKey=" + APIKey;
              fade("enter-url");
              fade("enter-url__obfuscator");
            } else if(altValue) {
              document.getElementById("main-frame").src = "pages/watch.html?v=" + altValue[1] + "&APIKey=" + APIKey;
              fade("enter-url");
              fade("enter-url__obfuscator");
            } else {
              document.getElementById("main-frame").src = "pages/watch.html?v=" + enteredValue + "&APIKey=" + APIKey;
              fade("enter-url");
              fade("enter-url__obfuscator");
            }

       };
       window.addEventListener("resize", function () {
         console.log("resized");
         getSetPageHeight();
       });
       document.getElementById("main-frame").addEventListener("load", function () {
         console.log("loaded")
         setTitleShown();
         getSetPageHeight();
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

     function getSetPageHeight() {
       pageHeight = document.body.clientHeight - document.getElementById("title-bar").clientHeight;
       document.getElementById("main-frame").style.height = pageHeight + "px";
       document.getElementById("main-frame").contentWindow.document.getElementById("sub-content-holder").style.height = pageHeight - 6 + "px";
     }

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
               //setTitleShown();
               var isInScene = false;
               addEventListeners(document);
               /*addEventListeners("innerDoc");*/
          }
     };

})();
