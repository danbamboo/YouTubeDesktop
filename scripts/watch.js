(function() {

  var videoId;
  var xhr = new XMLHttpRequest();

  function getQueriedValues(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1]};
    }
    return(false);
  };

  function drawElements() {
    document.getElementById("player-frame").src = "https://www.youtube.com/embed/" + videoId;
  }

  document.onreadystatechange = function () {
      videoId = getQueriedValues("v");
      APIKey = getQueriedValues("APIKey");
      //getVideoInfo();
      drawElements();
  };

})();
