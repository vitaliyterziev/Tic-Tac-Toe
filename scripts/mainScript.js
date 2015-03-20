

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
var interval = null;
 

// none AI (PVP)
$(document).ready(function() {

    $('td').each(idAttach);
    $("td").on("click", clickHandler);
    $("td").on("click", movesTrack);

    interval = setInterval(function() {

        winCheck(XboxesClicked);
        winCheck(OboxesClicked);
    }, 500);
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
}


//id function for all td boxes
var idAttach = function() {

    this.id = elementCount;
    elementCount++;
}


//tracking moves function and pushing them to 2 arrays 1 for X one for O
var movesTrack = function() {

    if (this.innerHTML == imageX) {

        XboxesClicked.push(parseInt(this.id));
    } else if (this.innerHTML == imageO) {

        OboxesClicked.push(parseInt(this.id));
    }
}


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
            clearInterval(interval);
            winDecorator(winCombinations[x]);
            break;
        } else {

            counter = 0;
        }
    }
}


//restart button function, all arrays and variables to 0 and setInterval function
var gameRestart = function() {

    cleanBoard();
    clickCount = 0, elementCount = 0;
    XboxesClicked = [], OboxesClicked = [];

    interval = setInterval(function() {

        winCheck(XboxesClicked);
        winCheck(OboxesClicked);
    }, 500);
}


//add style to wining boxes
var winDecorator = function(winingCombination) {

    winingCombination.forEach(function(comb) {

        document.getElementById(comb).className = ' winClass';
    });
}


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
}


//cleaner for the field
var cleanBoard = function() {

    var elements = document.querySelectorAll('td');
    var push = [];

    for (var key in elements) {

        push.push(elements[key])
    };

    push.forEach(function(a) {

        a.innerHTML = "";
        a.className = " ";
    });
}


//AI Must lie here, one module with couple of functions
