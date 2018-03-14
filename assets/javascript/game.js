//GLOBAL VARIABLES


//Random number generator
var rng = Math.floor(Math.random() * 8);

//List of possible word choices
var wordList = ["HALBERD", "MESSER", "FALCHION", "OAKSHOTT", "PARTISAN", "RANSEUR", "LUCERNE", "POLLAXE"];

//Selected word as an array and as a string
var selectedWord = " ";
var selectedWordArray = [];

//Working word as an array and a string
var workingWord = " ";
var workingWordArray = [];
var workingWordArrayVerify = [];

//number of incorrect guesses as an integer, guess state as an integer, and guesses in an array
var guessNum = 0;
var guessState = 8;
var guessArray = []

// User input key as a capital
var keyPress = "";

// Image update string
var imgUpdate = "";




//OPERATIONS

// Clear Board
function clear () {
    // Reset selectedWord and array to empty.
    selectedWord = " ";
    selectedWordArray = [];
    // Reset workingWord and array to empty.
    workingWord = " ";
    workingWordArray = [];
    workingWordArrayVerify = [];
    // Reset guessNum, guessState to 0, and guessArray to empty
    guessNum = 0;
    guessState = 8;
    guessArray = []
    // Reset imageUpdate to default
    imgUpdate = "";
    // Apply default ImageUpdate in HTML
    document.getElementById("imgNum").src = "assets/images/placeholder0.png";
    // Apply workingWord to HTML
    document.getElementById("dBox").innerHTML = workingWord;
    // apply GuessArray to HTML
    document.getElementById("guessBox").innerHTML = guessArray.toString().replace(/,/g," ");
    // Restart the game
    start ();

};


// Start
function start() {
    // Set new selectedWord and Array
        selectedWord = wordList[rng]
            for (i = 0; i< selectedWord.length ; i++) {
                var pushChar = selectedWord.charAt(i);
                selectedWordArray.push(pushChar);
            };
    // Set workingWord, Array, and verify
            workingWord = selectedWord
            for (i = 0; i< selectedWord.length ; i++) {
                workingWordArray.push(" -");
            };
            workingWordArrayVerify.push(workingWordArray)          
    // Display workingWordArray in html
            document.getElementById("dBox").innerHTML = workingWordArray.toString().replace(/,/g," ");
};

// User Input
document.onkeyup = function(event){
    keyPress = event.key;
    keyPress = keyPress.toUpperCase();
    wordCompute ();
};



//Evaluate input
function wordCompute () {
    //Only keep valid inputs
    if(    keyPress === "A" || keyPress === "B" || keyPress === "C" || keyPress === "D" || 
    keyPress === "E" || keyPress === "F" || keyPress === "G" || keyPress === "H" || keyPress === "I"
    || keyPress === "J" || keyPress === "K" || keyPress === "L" || keyPress === "M" || keyPress === "N" ||
     keyPress === "O" || keyPress === "P" || keyPress === "Q" || keyPress === "R" || keyPress === "S" 
     || keyPress === "T" || keyPress === "U" || keyPress === "V" || keyPress === "W" || keyPress === "X"
     || keyPress === "Y" || keyPress === "Z"){
        //Enable loss condition by storing value of old array
        workingWordArrayVerify = workingWordArray.slice()
        //Compare user input to selectedWord
        for (var i = 0; i<selectedWord.length; i++){
            var letter = selectedWord.charAt(i);                 
            //If overlap and transfer to workingWord
                if (selectedWord[i] === keyPress) {
                    workingWordArray[i] = keyPress
                    workingWord = workingWordArray.toString().replace(/,/g," ");             
            //Display new workingWord in HTML
                    document.getElementById("dBox").innerHTML = workingWord;                                
            };

           
        };    
        console.log("Workingwordarray: " + workingWordArray.join(''))
            console.log("WorkingwordVerify "+workingWordArrayVerify.join(''))
        //compare workingWordArray to workingWordArrayVerif
        if (workingWordArray.join('') === workingWordArrayVerify.join('') ){
            //If they are the same, add one to guesses.
            guessNum++
            guessState--
            //Show remaining guesses in html
            document.getElementById("guessNum").innerHTML = guessState;
            //run loss function
            loss();
            //Update workingWordArrayVerif
            workingWordArrayVerify = workingWordArray.slice();
            //Concatinate imageUpdate string
            imgUpdate = "assets/images/placeholder"+guessNum+".png";
            //show imageUpdate string in HTML
            document.getElementById("imgNum").src = imgUpdate;
        }         
        //Add user input to guessArray
        guessArray.push(keyPress);
        //Display guessArray in html
        document.getElementById("guessBox").innerHTML = guessArray.toString().replace(/,/g," ");
        //Determine if a win has occured
        if(workingWordArray.toString() === selectedWordArray.toString()){
            win();
        };
    };
};
//Determine if loss
function loss () {
    //Compare number of guesses to 8.
    if (guessNum >= 8){
        //If 8, alert loss
       alert ("You ran out of guesses! Try again!")
        //run clear
        clear();
    };

};
//Determine if win
function win (){
    //alert win
    alert("Congratulations! Stickman lives... for today!")
    //run clear
    clear();
   
};
start ();
