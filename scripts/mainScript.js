

//variable declarations
var imageX = '<img style="margin-left: 15px;" src="media/x.png">';
var imageO = '<img style="margin-left: 15px;" src="media/o.png">';
var clickCount = 0,
    elementCount = 0;
var XboxesClicked = [],
    OboxesClicked = [];
var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
var win = false;


// none AI (PVP)
docReady(function() {
    var tdElement = document.getElementsByTagName('td');
    var len = document.getElementsByTagName('td').length;

    for (var x = 0; x < len; x++) {

        tdElement[x].addEventListener("click", clickHandler);
        tdElement[x].addEventListener("click", movesTrack);

        tdElement[x].addEventListener("click", function() {
		
			if(!win) {
                
                if(clickCount % 2 != 0) {
                    
                    computer.executeMove(computer);
                }
                
				winCheck(XboxesClicked);
				winCheck(OboxesClicked);
			}
        });

        idAttach(tdElement[x]);
    }

});


//click helper function, we check clickCount var and decide which picture to apply O or X
var clickHandler = function() {

    if (!this.innerHTML) {

        if (clickCount % 2 != 0) {

            this.innerHTML = imageX;
        } else {

            this.innerHTML = imageO;
        }

        clickCount++;
    }
};


//id function for all td boxes
var idAttach = function(el) {

    el.id = elementCount;
    elementCount++;
};


//tracking moves function and pushing them to 2 arrays 1 for X one for O
var movesTrack = function() {

    if (this.innerHTML == imageX) {

        XboxesClicked.push(parseInt(this.id,10));
    } else if (this.innerHTML == imageO) {

        OboxesClicked.push(parseInt(this.id,10));
    }
};


//win function, checking O and X array with winCombinations array
var winCheck = function(checkedBoxes) {

    var counter = 0;
    var checkedBoxes = compatibleSet(checkedBoxes);// we need unique ID's in the provided array

    for (var x = 0; x < winCombinations.length; x++) {

        winCombinations[x].forEach(function(entry) {

            checkedBoxes.forEach(function(entryC) {

                if (entry == entryC) {

                    counter++;
                }
            });
        });

        if (counter == 3) {

            //using win function with css class attached to it
            winDecorator(winCombinations[x]);
            win = true;
            break;
        } else {

            counter = 0;
        }
    }
};


//restart button function, all arrays and variables to 0 and setInterval function
var gameRestart = function() {

    cleanBoard();
    clickCount = 0, elementCount = 0;
    XboxesClicked = [], OboxesClicked = [];
    win = false;
};


//add style to wining boxes
var winDecorator = function(winingCombination) {

    winingCombination.forEach(function(comb) {

        document.getElementById(comb).className = ' winClass';
    });
};


//custom Set() crossbrowser
var compatibleSet = function(array) {

    var cleanList = [];
    var bool = false;

    array.forEach(function(itemDup) {

        cleanList.forEach(function(noDup) {

            if (noDup == itemDup) {

                bool = true;
            }
        });

        if (!bool) {

            cleanList.push(itemDup);
        }

        bool = false;
    });

    return cleanList;
};


//cleaner for the field
var cleanBoard = function() {

    var elements = document.querySelectorAll('td');
    var push = [];

    for (var key in elements) {

        push.push(elements[key]);
    }

    push.forEach(function(a) {

        a.innerHTML = "";
        a.className = " ";
    });
};


//AI settup (randomMove - finished, attack and deffend - pending)
var computer = {

    availableMoves: function() {

        var ids = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        var recordMoves = [];
        recordMoves = recordMoves.concat(XboxesClicked, OboxesClicked);
        recordMoves = compatibleSet(recordMoves);

        return ids.filter(function(elAv) { //available moves, RETURN statement here

            var bools = true;
            recordMoves.forEach(function(elRec) { //recorded moves

                if (elAv === elRec) {

                    bools = false;
                }
            });

            return bools;
        });
    },
    attackMove: function() {

        return false;
    },
    deffendMove: function() {

        return false;
    },
    randomMove: function() {

        var clickCell = computer.availableMoves();

        var index = Math.floor(Math.random() * clickCell.length - 1) + 1;

        return clickCell[index];
    },
    executeMove: function(object) {

        var clickMove = object.attackMove() || object.deffendMove() || object.randomMove();

         if(clickMove != undefined) {
            document.getElementsByTagName('td')[clickMove].click();
        }
    }
};


