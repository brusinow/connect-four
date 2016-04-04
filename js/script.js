var currentScore =  [ ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""],
                      ["","","","","","",""] ];


var board = $("div.eachCircle");
var keepPlaying = true;

var count = 0;

var noMove = '<div class="circle-clear"></div>';
var redMove = '<div class="circle-red"></div>';
var blackMove = '<div class="circle-black"></div>';



$('#column-one-button').click(function(){
    var x = 0;
  whichColumn(x);
  count++;
});

$('#column-two-button').click(function(){
    var x = 1;
  whichColumn(x);
  count++;
});


$('#column-three-button').click(function(){
    var x = 2;
  whichColumn(x);
  count++;
});

$('#column-four-button').click(function(){
    var x = 3;
  whichColumn(x);
  count++;
});

$('#column-five-button').click(function(){
    var x = 4;
  whichColumn(x);
  count++;
});

$('#column-six-button').click(function(){
    var x = 5;
  whichColumn(x);
  count++;
});

$('#column-seven-button').click(function(){
    var x = 6;
  whichColumn(x);
  count++;
});


function whoseTurn(count){ 
    if (count % 2 === 0){
    console.log('whoseTurn returns red move');
    return "R";
    } else { 
    console.log('whoseTurn returns black move'); 
    return "B"; 
    }
}


function whichColumn(x){
  var y = 5;
  if (keepPlaying){
    do {
      var dimensionChange = (7*y) + x;
      
      if (currentScore[y][x] === "" && whoseTurn(count)==="R"){
        var redPlayer = "R";
        board[dimensionChange].className = 'eachCircle circle-red';
        currentScore[y].splice(x, 1, 'R');
        getWinner(y,x,redPlayer);
        return true;
      }   else if (currentScore[y][x] === "" && whoseTurn(count)==="B"){
          var blackPlayer = "B";
          board[dimensionChange].className = 'eachCircle circle-black';
          currentScore[y].splice(x, 1, 'B');
          getWinner(y,x,blackPlayer);
          return false
          } else {
          y--;
          }
    }
  while(y >= 0);
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
      keepPlaying = false;
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
      keepPlaying = false;
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
      keepPlaying = false;
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
      keepPlaying = false;
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










