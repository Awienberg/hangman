//'use strict'
window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of words
  var chosenCategory;     // Selected catagory
  var getHint;           // Word getHint
  var word;              // Selected word
  var guess;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives;             // Lives
  var counter;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements shown on website
  var showLives = document.getElementById('mylives');
  var showCategory = document.getElementById('category');
  var getHint = document.getElementById('hint');
  var showClue = document.getElementById('clue');

  // create alphabet list 
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      categoryName.innerHTML = 'The Category Is Animals';
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = 'The Category Is Movies';
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = 'The Category Is Food';
    }
  }

  // Create words
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_"; //Creates the _ instead of letters
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives left
   comments = function () {
    showLives.innerHTML = 'You have ' + lives + ' lives left';
    if (lives < 1) {
      showLives.innerHTML = 'Game Over';
      showLives.setAttribute('style', 'color: red');
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = 'You Win!';
        showLives.setAttribute('style', 'color: #87C232');
      }
    }
  }

  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute('class', 'active');
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var answer = (word.indexOf(geuss));
      if (answer === -1) {
        lives -= 1;
        comments();
      } else {
        comments();
      }
    }
  }

  // Play the Game, chooses a random word in a random Category
  play = function () {
    categories = [
        ['monkey', 'elephant', 'sloth', 'zebra', 'donkey', 'axolotl', 'tyranosaurus'], //Category 1
        ['aliens', 'jurassic-park', 'harry-potter', 'back-to-the-future', 'turtles'], //Category 2
        ['sushi', 'pizza', 'lasagna', 'sandwich', 'burger'] //Category 3
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)]; //Choose random word
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)]; //Choose random Category
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
  }

  play();
  
  //Get a hint for the word, from the chosen Category
  hint.onclick = function() {

      hints = [
        ['likes bananas', 'trunk', 'cute and lazy', 'black with white stripes, or white with black stripes?', 'jackass', 'aquatic salamander', 'jurassic park'],
        ['predator', 'clever girl', 'wizards', "88 miles pr. hour", 'cowabunga!'],
        ['wrapped in seaweed', 'tomato sauce and cheese', 'garfield', 'get back in the kitchen and make me a..', '.. and fries']
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: " +  hints [categoryIndex][hintIndex];
  };

  //Reset or play again
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showLives.setAttribute('style', 'color: #fff');
    showLives.setAttribute('style', 'color: #fff');
    showClue.innerHTML = "Clue: ";
    
    play();
  }
}