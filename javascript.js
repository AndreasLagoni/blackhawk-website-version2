// Get the modal
var modal = document.getElementById('indexModal');

// Get the button that opens the modal
var btn = document.getElementById("buttonModal");
// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style = "display: block;";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
function copyIpfunction() {
    /* Get the text field */
    var copyText = document.getElementById("connectIp");
  
    /* Select the text field */
    copyText.select();
  
    /* Copy the text inside the text field */
    document.execCommand("copy");
  }
var socket = io();

socket.on("connect", function() {
  socket.on("updateServerDetails", function(server) {
    updateServerInfo(server);
  });
  socket.on("updateLeaderboard", function(leaderboard) {
    updateLeaderboard(leaderboard);
  });
  socket.on("updateServerStatus", function(isOnline) {
    updateServerStatus(isOnline);
  });
});

// Get the container element
var btnContainer = document.getElementById("leaderboardbutton");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// IS SERVER ONLINE OR OFFLINE
function updateServerStatus(isOnline) {
  if (isOnline == true) {
    $("#online").css({ display: "block" });
    $("#offline").css({ display: "none" });
  } else {
    $("#offline").css({ display: "block" });
    $("#online").css({ display: "none" });
  }
}

//UPDATE INFO ABOUT THE SERVER
function updateServerInfo(server) {
  $("#servername").text(server.name);
  $("#lastmapwipe").text(
    moment(server.last_wipe_date).format("dddd, MMMM Do YYYY, h:mm:ss a, Z")
  );
  $("#nextmapwipe").text(
    moment(server.last_wipe_date)
      .add(server.map_wipe_interval, "days")
      .format("dddd, MMMM Do YYYY, h:mm:ss a, Z")
  );
  $("#onlineplayers").text(server.online_count + "/" + server.max_players);
  $("#ipserver").text(server.server_ip + ":" + server.server_port);
}

// UPDATE THE LEADERBOARD
function updateLeaderboard(leaderboard) {
  for (
    var highscoreIndex = 0;
    highscoreIndex < leaderboard.length;
    highscoreIndex++
  ) {
    var player = leaderboard[highscoreIndex];
    $("#number" + (highscoreIndex + 1))
      .find("#name")
      .text(player.name);
    $("#number" + (highscoreIndex + 1))
      .find("#kills")
      .text(player.kill_count);
    $("#number" + (highscoreIndex + 1))
      .find("#death")
      .text(player.death_count);
    if (player.death_count == 0) {
      $("#number" + (highscoreIndex + 1))
        .find("#killdeath")
        .text(player.kill_count);
    } else {
      $("#number" + (highscoreIndex + 1))
        .find("#killdeath")
        .text(Math.round((player.kill_count / player.death_count) * 10) / 10);
    }
  }
  //remove remaining divs
  if (leaderboard.length < 10) {
    for (
      var removeIndex = leaderboard.length;
      removeIndex < 10;
      removeIndex++
    ) {
      $("#number" + (removeIndex + 1)).remove();
    }
  }
}
