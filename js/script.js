
// $(window).load(function() {
// var options = { };
// $('[data-remodal-id=modal]').remodal(options).open();
// });
var $window = $(window);
var $pane = $('#pane1');

var currentScore =  [ ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""] ];

var randomIndex = Math.floor(Math.random() * 7);
var board = $("div.eachCircle");
var keepPlaying = true;

var count = 0;
var redScore = 0;
var blackScore = 0;

var noMove = '<div class="circle-clear"></div>';
var redMove = '<div class="circle-red"></div>';
var blackMove = '<div class="circle-black"></div>';

var moveSound = new Audio();
moveSound.src = "sounds/move.mp3";

var clearSound = new Audio();
clearSound.src = "sounds/clear.mp3";

var winSound = new Audio();
winSound.src = "sounds/win.mp3";

function whoseTurn(count){ 
    if (count % 2 === 0){
    console.log('whoseTurn returns red move');
    $("#dropPiece").css({"background-color": "#ff3300", "border-color": "#ff3300", "box-shadow-color": "#333333"});
    return "R";
    } else { 
    $("#dropPiece").css({"background-color": "#000000", "border-color": "#000000", "box-shadow-color": "#777777"}); 
    console.log('whoseTurn returns black move'); 
    return "B"; 
    }
}


function whichColumn(x){
  var y = 5;
  if (keepPlaying && document.getElementById('playervscpu').checked){
    do {
      console.log("cpu is checked");
      var dimensionChange = (7*y) + x;
      
      
          if (currentScore[y][x] === "" && whoseTurn(count)==="R"){
            var redPlayer = "R";
            board[dimensionChange].className = 'eachCircle circle-red';
            currentScore[y].splice(x, 1, 'R');
            getWinner(y,x,redPlayer);
            console.log("right before computer move");
            count++;
            computerMove(y,x,randomIndex,count);
            return true;
          }   else if (currentScore[y][x] === "" && whoseTurn(count)==="B"){
              var blackPlayer = "B";
              board[dimensionChange].className = 'eachCircle circle-black';
              currentScore[y].splice(x, 1, 'B');
              getWinner(y,x,blackPlayer);
              count++;
              return false
              } else {
              y--;
              }
            
    }
        while(y >= 0);

  } else if (keepPlaying) {
  do {
      var dimensionChange = (7*y) + x;
      
      
          if (currentScore[y][x] === "" && whoseTurn(count)==="R"){
            var redPlayer = "R";
            board[dimensionChange].className = 'eachCircle circle-red';
            currentScore[y].splice(x, 1, 'R');
            getWinner(y,x,redPlayer);
            count++;
            return true;
          }   else if (currentScore[y][x] === "" && whoseTurn(count)==="B"){
              var blackPlayer = "B";
              board[dimensionChange].className = 'eachCircle circle-black';
              currentScore[y].splice(x, 1, 'B');
              getWinner(y,x,blackPlayer);
              count++
              return false
              } else {
              y--;
              }
            
    }
  while(y >= 0);
  } else {
    return false;
  }
}



function getWinner(lastPieceY, lastPieceX, player) { 
  var needFour = 1, 
     i = 1;
  var winArray = [[lastPieceY,lastPieceX]];
     console.log(lastPieceY, lastPieceX);
   // // across
    while((lastPieceX - i) >= 0 && (currentScore[lastPieceY][lastPieceX - i]) === player ) {       
      winArray.push([lastPieceY,(lastPieceX - i)]);
      needFour++; 
      i++;       
      console.log('horiz loop 1');
    };
      i = 1;

    while(currentScore[lastPieceY][lastPieceX + i] === player && (lastPieceX + i) <= 6) {
      winArray.push([lastPieceY,(lastPieceX + i)]);
      needFour++; 
      i++; 
      console.log('horiz loop 2');
    };

      if (needFour >= 4) { 
      console.log(winArray);
      console.log("win horizontal");
      displayWinner(winArray);
      playerScore(player);
      keepPlaying = false;
      $("#dropPiece").draggable('disable');
      winSound.play();
      return true; 
      }


    //down
      needFour = 1;
     winArray = [[lastPieceY,lastPieceX]];

    while(((lastPieceY - i) >= 0)  && (currentScore[lastPieceY-i][lastPieceX] === player)) { 
      winArray.push([(lastPieceY-i),lastPieceX]);
      needFour++; 
      i++; 
      console.log('vert loop 1');
    };
      i = 1;
    
    while(((lastPieceY + i) <= 5) && (currentScore[lastPieceY+i][lastPieceX] === player)) {
      winArray.push([(lastPieceY+i),lastPieceX]);
      needFour++; 
      i++; 
      console.log('vert loop 2');
    };

      if (needFour >= 4) { 
      console.log("win vertical");
      displayWinner(winArray);
      playerScore(player);
      keepPlaying = false;
      $("#dropPiece").draggable('disable');
      winSound.play();
      return true; 
      }

//------------------------------>
// diagonal descending
    needFour = 1;
      winArray = [[lastPieceY,lastPieceX]];

    while((lastPieceY - i) >= 0 && (lastPieceX - i) >= 0  &&  currentScore[lastPieceY-i][lastPieceX-i] === player ) { 
      winArray.push([(lastPieceY-i),(lastPieceX-i)]);
      needFour++; 
      i++; 
      console.log('while loop 1');
    };
      i = 1;
    

    while((lastPieceY + i) <= 5 && (lastPieceX + i) <= 6  && currentScore[lastPieceY+i][lastPieceX+i] === player ) {
      winArray.push([(lastPieceY+i),(lastPieceX+i)]);
      needFour++; 
      i++; 
      console.log('while loop 2');
    };

      if (needFour >= 4) { 
      console.log("win diag descending");
      displayWinner(winArray);
      playerScore(player);
      keepPlaying = false;
      $("#dropPiece").draggable('disable');
      winSound.play();
      return true; 
      }

// diagonal ascending
    needFour = 1;
      winArray = [[lastPieceY,lastPieceX]];

    while((lastPieceY + i) <= 5 && (lastPieceX - i) >= 0  &&  currentScore[lastPieceY+i][lastPieceX-i] === player ) { 
      winArray.push([(lastPieceY+i),(lastPieceX-i)]);
      needFour++; 
      i++; 
      console.log('while loop 1');
    };
      i = 1;
    

    while((lastPieceY - i) >= 0 && (lastPieceX + i) <= 6  && currentScore[lastPieceY-i][lastPieceX+i] === player ) {
      winArray.push([(lastPieceY-i),(lastPieceX+i)]);
      needFour++; 
      i++; 
      console.log('while loop 2');
    };

      if (needFour >= 4) { 
      console.log("win diag ascending");
      displayWinner(winArray);
      playerScore(player);
      keepPlaying = false;
      $("#dropPiece").draggable('disable');
      winSound.play();
      return true; 
      }

   console.log("no winner yet");
   return false;
}



function displayWinner(winArray){
  for (i=0; i<winArray.length; i++){
    var winSquare = (winArray[i][0] * 7)+winArray[i][1];
    board[winSquare].className += " flash";
    console.log("make an x");
  }
}
// start: function(event, ui){
//            $("#highlightPiece").hide(); 
//           }



 // revert : function(event, ui) {
              
 //              $(this).data("uiDraggable").originalPosition = {
 //                  top : 12,
 //                  left : 13
 //              },
 //              return !event;
          
 //          }


function checkWidth() {
        var windowsize = $window.width();
        if (windowsize <= 768) {
                  $(this).data("uiDraggable").originalPosition = {
                  top : -20,
                  left : 100
                  };
                }   
                else {
                  $(this).data("uiDraggable").originalPosition = {
                  top : 160,
                  left : -69
                  };
        }  
}


function checkWidthCSS() {
   var windowsize = $window.width();
        if (windowsize <= 768) {
         $('#dropPiece').css({'top':'-20px','left':'100px'});   
        }   
        else if (windowsize > 768) {
         $('#dropPiece').css({'top':'160px','left':'-69px'});   
        } 
}

$(function() {
    $("#dropPiece").draggable({
            drag: function (event, ui) {
               $("#arrow").removeClass( "imageflash" );
               console.log( "dragging" );
               }, 
               revert : function(event, ui) {
            // on older version of jQuery use "draggable"
            // $(this).data("draggable")
            // on 2.x versions of jQuery use "ui-draggable"
            // $(this).data("ui-draggable")
                checkWidth();
                
            // return boolean
              return !event;
            // that evaluate like this:
            // return event !== false ? false : true;
});

    $('#1-drop').droppable({
        tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 0;
                whichColumn(x);
              
                $("#arrow").addClass( "imageflash" );
               
                whoseTurn(count);

        }
    });
    $("#2-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 1;
                whichColumn(x);
              
                $("#arrow").addClass( "imageflash" );
             
                whoseTurn(count);
            }
    });
    $("#3-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 2;
                whichColumn(x);
                
                $("#arrow").addClass( "imageflash" );
               
                whoseTurn(count);
            }    
    });
    $("#4-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 3;
                whichColumn(x);
                
                $("#arrow").addClass( "imageflash" );
              
                whoseTurn(count);
            }    
    });
    $("#5-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 4;
                whichColumn(x);
                
                $("#arrow").addClass( "imageflash" );
              
                whoseTurn(count);
            }    
    });
    $("#6-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 5;
                whichColumn(x);
                
                $("#arrow").addClass( "imageflash" );
              
                whoseTurn(count);
            }    
    });
    $("#7-drop").droppable({
       tolerance: "pointer",
        activeClass: "active",
        hoverClass:  "hover",
            drop: function( event, ui ) {
                checkWidthCSS();
                moveSound.play();
                console.log("dropped");
                var x = 6;
                whichColumn(x);
                
                $("#arrow").addClass( "imageflash" );
          
                whoseTurn(count);
      }

    });
});


$('#clearbutton').click(function(){
  clearSound.play();
  for(var y = 0; y < 6; y++) {
    for(var x = 0; x < 7; x++) {
    currentScore[y][x]="";
  }
    }

  for (var i=0; i<board.length;i++) {
  board[i].className = "eachCircle circle-clear";
  }
   count = 0;      
   whoseTurn(count); 
   keepPlaying = true; 
   $("#dropPiece").draggable('enable');     
});



$("#clearScore").click(function(){
    redScore = 0;
    blackScore = 0; 
    $("#redScoreValue").text("0");
    $("#blackScoreValue").text("0");
});




function playerScore(player){
  if (player === 'R'){
    console.log("scoreboard should add Red");
    redScore++;
    $("#redScoreValue").text(redScore);
  }
  else if (player === 'B'){
    console.log("scoreboard should add Black");
    blackScore++;
    $("#blackScoreValue").text(blackScore);
  } else {
    console.log("scoreboard failing");
    return false;
  }
}

function computerMove(lastPieceY,lastPieceX,randomIndex,count) {
  if (count % 2 === 1) {
   
var playerCount = 1,
playerBestArray = [lastPieceX];
 
     i = 1;
   // // across
    while((lastPieceX - i) >= 0 && (currentScore[lastPieceY][lastPieceX - i]) === "R" ) {       
      playerBestArray.push(lastPieceX - i);
      playerCount++; 
      i++;       
    };
      i = 1;

    while(currentScore[lastPieceY][lastPieceX + i] === "R" && (lastPieceX + i) <= 6) {
      playerBestArray.push(lastPieceX + i);
      playerCount++; 
      i++; 
      console.log('horiz loop 2');
    };

      if (playerCount >= 3) { 
      playerBestArray = playerBestArray.sort(function(a, b){return a-b});
        if (playerBestArray[2] <= 5){
      var x = playerBestArray[2]+1;
        } else if (playerBestArray[0] >= 1){
          var x = playerBestArray[0]-1; 
          }
          whichColumn(x);
          count++;
      return true; 
      }


    //down
    playerCount = 1;
    playerBestArray = [lastPieceX];

    while(((lastPieceY - i) >= 0)  && (currentScore[lastPieceY-i][lastPieceX] === "R")) { 
      playerBestArray.push(lastPieceX);
      playerCount++; 
      i++; 
      console.log('vert loop 1');
    };
      i = 1;
    
    while(((lastPieceY + i) <= 5) && (currentScore[lastPieceY+i][lastPieceX] === "R")) {
      playerBestArray.push(lastPieceX);
      playerCount++; 
      i++; 
      console.log('vert loop 2');
    };

     if (playerCount >= 3) { 
      var x = playerBestArray[0];
      whichColumn(x);
      count++;
      return true
      }

//------------------------------>
// diagonal descending
    playerCount = 1;
    playerBestArray = [lastPieceX];

    while((lastPieceY - i) >= 0 && (lastPieceX - i) >= 0  &&  currentScore[lastPieceY-i][lastPieceX-i] === "R" ) { 
      playerBestArray.push([lastPieceX - i]);
      playerCount++; 
      i++; 
      console.log('while loop 1');
    };
      i = 1;
    

    while((lastPieceY + i) <= 5 && (lastPieceX + i) <= 6  && currentScore[lastPieceY+i][lastPieceX+i] === "R" ) {
      playerBestArray.push([lastPieceX + i]);
      playerCount++; 
      i++; 
      console.log('while loop 2');
    };

      if (playerCount >= 3) { 
      playerBestArray = playerBestArray.sort(function(a, b){return a-b});
        if (playerBestArray[2] <= 5){
          var x = playerBestArray[2]+1;
        } else if (playerBestArray[0] >= 1){
          var x = playerBestArray[0]-1; 
          }
        whichColumn(x);
        count++;
      return true; 
      }

// diagonal ascending
    playerCount = 1;
      winArray = [lastPieceX];

    while((lastPieceY + i) <= 5 && (lastPieceX - i) >= 0  &&  currentScore[lastPieceY+i][lastPieceX-i] === "R" ) { 
      playerBestArray.push([lastPieceX - i]);
      playerCount++; 
      i++; 
      console.log('while loop 1');
    };
      i = 1;
    

    while((lastPieceY - i) >= 0 && (lastPieceX + i) <= 6  && currentScore[lastPieceY-i][lastPieceX+i] === "R" ) {
      playerBestArray.push([lastPieceX + i]);
      playerCount++; 
      i++; 
      console.log('while loop 2');
    };

      if (playerCount >= 3) { 
        playerBestArray = playerBestArray.sort(function(a, b){return a-b});
        if (playerBestArray[2] <= 5){
        var x = playerBestArray[2]+1;
        } else if (playerBestArray[0] >= 1){
          var x = playerBestArray[0]-1; 
          }
          whichColumn(x);
          count++;
      return true; 
      }
      var randomIndex = Math.floor(Math.random() * 7);
      whichColumn(randomIndex);
      count++;
   console.log("no 3's yet");
   return false;
}
}





























$("#2PlayerButton").click(function(){
   $("#2player").prop("checked", true)   
});

$("#playerVsCpuButton").click(function(){
   $("#playervscpu").prop("checked", true)   
});








