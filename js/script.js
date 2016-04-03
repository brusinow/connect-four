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
  console.log("column one click");
  whichColumn(x);
  count++;
});

$('#column-two-button').click(function(){
    var x = 1;
  console.log("column two click");
  whichColumn(x);
  count++;
});


$('#column-three-button').click(function(){
    var x = 2;
  console.log("column one click");
  whichColumn(x);
  count++;
});

$('#column-four-button').click(function(){
    var x = 3;
  console.log("column one click");
  whichColumn(x);
  count++;
});

$('#column-five-button').click(function(){
    var x = 4;
  console.log("column one click");
  whichColumn(x);
  count++;
});

$('#column-six-button').click(function(){
    var x = 5;
  console.log("column one click");
  whichColumn(x);
  count++;
});

$('#column-seven-button').click(function(){
    var x = 6;
  console.log("column one click");
  whichColumn(x);
  count++;
});

// var countItemsTruthy = function(currentScore){
//   for(var y = 0; y < currentScore.length; y++){
//     for(var x = 0; x < currentScore[y].length; x++){
//         if (currentScore[y][x]){
//           count++;
//         }  
//     }    
//   }       console.log(count);
//           return count;
// }




//   for (i = 0; currentScore.length >= i; i++) {
//     if (currentScore[i]) {
//       count++;
//     }
//   }
//   return count;
//   console.log(count);
// }







var whoseTurn = function(){ 
    if (count % 2 === 0){
    console.log('whoseTurn returns red move');
    return "R";
  } else { 
    console.log('whoseTurn returns black move'); 
    return "B"; 
    }
}

// var makeMove = function(y, x, count){}
//   var currentBox = board[count-1];
//   var thisMoveOutcome = currentScore[i][j];
//     if (0)



//   currentBox.click(function(){
//     if (currentBox.html === noMove && keepPlaying)
//       currentBox.html = whoseTurn(count);
//       currentScore.splice(i, 1, currentBox.innerText);




  // });


// for (var i = 0; i < board.length; i++){
//   makeMove(i);
// }


// function running(win) {
//   var win = getWinner(result);
//   if (win) {
//     keepPlaying = false;
//     document.getElementById('whose-turn').textContent = 'We have a winner!';
//     console.log('operation should stop');
//   } else {
//     console.log('keep playing...')
//     keepPlaying = true;
//   }
// }



// var getWinner = function(){}



      






var whichColumn = function(x){
    // console.log("x is "+ x);
    var y = 5;
  do {
      var dimensionChange = (7*y) + x;
      console.log("y at top is "+ y)
    if (currentScore[y][x] === "" && whoseTurn()==="R"){
      board[dimensionChange].className = 'eachCircle circle-red';
      currentScore[y].splice(x, 1, 'R');
      console.log(currentScore);
      console.log('red');
      getWinner(y,x);
      return true;
    } else if (currentScore[y][x] === "" && whoseTurn()==="B"){
      board[dimensionChange].className = 'eachCircle circle-black';
      currentScore[y].splice(x, 1, 'B');
     
      console.log(currentScore);
      console.log('black');
      getWinner(y,x);
      return false
      } else {
        y--;
        console.log("didn't hit");
        console.log(y + " at bottom");
        }
      // console.log("x is "+ x);
  }
  while(y > 0);
}



function getWinner(lastPieceY, lastPieceX) {
   // check length in each direction
    var needFour = 1, 
     i = 1;
   // across
   while(currentScore[lastPieceY][lastPieceX - i] === whoseTurn() && (lastPieceX - i) >= 0 ) { 
      needFour++; i++; 
      console.log('while loop 1');
  };
      i = 1;

   while(currentScore[lastPieceY][lastPieceX + i] === whoseTurn() && (lastPieceX + i) <= 7) {
    needFour++; i++; 
      console.log('while loop 2');
  };

   if (needFour >= 4) { 
    console.log("win horizontal");
    return true; 
  }

  //  // left to right
  //  needFour = 1;
  //  while( (currentScore[ lastPiece.x - i][ lastPiece.y ] === whoseTurn) && ((lastPiece.x - i) >= 0) ) { l += 1; i += 1; };
  //  i = 1;
  //  while( (currentScore[ lastPiece.x + i][ lastPiece.y ] === whoseTurn) && ((lastPiece.x + i) <= 5) ) { l += 1; i += 1; };
  //  if ( l >= 4 ) { 
  //   console.log("win horizontal");
  //   return true; 
  // }

   // same for top left to bottom right and bottom left to top right
   // . . .

   // if we got no hit until here, there is no row of 4
   console.log("no winner yet");
   console.log("needFour is now "+needFour)
   count++;
   return false;
}













