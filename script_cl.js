// mouvements possibles
const HAUT = "H";
const BAS = "B";
const DROITE = "D";
const GAUCHE = "G";

// nombre de cases par côtégit
var side = 4;

// changement de style css en fonction de "side"
document.documentElement.style.setProperty("--side", side);



// retient l'état courant du taquin
var current_state = [];
// position de la case vide
const empty_cell = {i: 0, j:0};

// Tableau qui reçoit l'image du jeu réussit
let winner = [];

// Tableau qui reçoit le chemin
let soluce = [];
let test_a = [];

// Initialisation de l'état courant
function setInitState () {
  current_state = [];     // on vide le {tableau
  var l = side;           // l = nombre de cases par côté
  for (var i = 0; i < l; i++) {
    current_state[i] = [];
    for (var j = 0; j < l; j++) {
      if (i == l-1 && j == l-1) {
        val = 0;
      } else {
        val = i*l + j + 1;
      }
      current_state[i][j] = val;
    }
  }
  empty_cell.i = side-1;
  empty_cell.j = side-1;
  winner = $.extend(true, [], current_state);
  //winner = current_state;
  return winner;
}


// execute les mouvements
function applyMove(state, ec, move) {
        // Si Bas sauf ligne 0 (i = 0)
        if (move == BAS && ec.i > 0) {
            let a = state [ec.i-1] [ec.j];
            state [ec.i] [ec.j] = a;
            state [ec.i-1] [ec.j] = 0;
            // state [ec.i].splice([ec.j] , 1 , a);
            // state [ec.i-1].splice([ec.j] , 1 , 0);
            ec.i = ec.i-1;
        // Si Haut sauf ligne 3 (i = 3)
        } else if (move == HAUT && ec.i < 3) {
            let a = state[ec.i+1][ec.j];
            //console.log(a);
            state [ec.i] [ec.j] = a;
            state [ec.i+1] [ec.j] = 0;
            //state [ec.i].splice([ec.j] , 1 , a);
            //state [ec.i+1].splice([ec.j] , 1 , 0);
            ec.i = ec.i+1;
        // Si Droite sauf Colonne 0 (j = 0)
        } else if (move == DROITE && ec.j > 0) {
            let a = state[ec.i][ec.j-1];
            //console.log(a);
            state [ec.i] [ec.j] = a;
            state [ec.i] [ec.j-1] = 0;
            // state [ec.i].splice([ec.j] , 1 , a);
            // state [ec.i].splice([ec.j-1] , 1 , 0);
            ec.j = ec.j-1;
        // Si Gauche sauf Colonne 3 (j = 3)
        } else if (move == GAUCHE && ec.j < 3) {
            let a = state[ec.i][ec.j+1];
            //console.log(a);
            state [ec.i][ec.j] = a;
            state [ec.i][ec.j+1] = 0;
            // state [ec.i].splice([ec.j] , 1 , a);
            // state [ec.i].splice([ec.j+1] , 1 , 0);
            ec.j = ec.j+1;
            
        }
   displayState(state);
}


// lien calcul ==> HTML
function displayState(tab) {
  $(".grid").empty();
  for (let i = 0; i < tab.length; i++) {
    for (let j = 0; j < tab[i].length; j++) {
      const elem = tab[i][j];
      if (elem) {
        const item = $(
          `<div data-i="${i}" data-j="${j}" class="item">${elem}</div>`
        );
        $(".grid").append(item);
      } else {
        $(".grid").append(`<div class="vide"></div>`);
      }
    }
  }
}




$(".check").click(function() {
  console.log("Is winning? ", checkWin(current_state));
  checkWin (actuel_state);
  // TODO: penser à implémenter la fonction checkWin
});

$(".reset").click(reset);

$(".shuffle").click(function() {
  console.log("trd")
  // pas le temps de faire le shuffle
  doRandomShuffle(current_state, empty_cell, soluce);
  displayState (current_state);
});

// Clic Solution
$(".solution").click(function() {
  console.log("Solution demandée par l'utilisateur·ice")
  findSolution(current_state, empty_cell, soluce);
});

// Fonction Solution
function findSolution(curr_state, emp_cell, sole) {
    for(var i = 0, len = sole.length; i < len; ++i) {
      applyMove(curr_state, emp_cell, sole[i]);
    }
    sole = [];
    soluce = sole;
    //setInitState();
    //displayState (current_state);
    return (soluce);
}


// Pour augmenter / diminuer la taille d'un côté.
$(".plus").click(function() {
  document.documentElement.style.setProperty("--side", ++side);
  reset();
  console.log("Plus grand")
});

$(".minus").click(function() {
  document.documentElement.style.setProperty("--side", --side);
  reset();
  console.log("Plus petit")
});

// Clic Shuffle
$(".shuffle").click(function () {
    //reset();
    doRandomShuffle(current_state, empty_cell, soluce);
    displayState(current_state);
    //soluce = [];
});

// Fonction shuffle
function doRandomShuffle(current_state, e_cell, soluce) {
  let altern = 173;
  for (let k = 0; k < altern; k++) {
      let random = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      if (random === 1 && e_cell.i < 3) {
          applyMove(current_state, e_cell, "H");
          test_a.push("B");
          soluce.unshift("B");
      } else if (random === 2 && e_cell.i > 0) {
          applyMove(current_state, e_cell, "B");
          test_a.push("H");
          soluce.unshift("H");
      } else if (random === 3 && e_cell.j > 0) {
          applyMove(current_state, e_cell, "D");
          test_a.push("G");
          soluce.unshift("G");
      } else if (random === 4 && e_cell.j < 3) {
          applyMove(current_state, e_cell, "G");
          test_a.push("D");
          soluce.unshift("D");
      } else {

      }
  }
  console.log("normal: " + test_a);
  console.log("inverse: " + soluce);
  return (soluce);

}

// Ici on gere l'ajout dynamique de .item 
$(".grid").on('click', '.item', function(){
  console.log("J'existe et resisterai à ma mort dans un reset/ shuffle ",   
      "Valeur:", $(this).html(),
      "Position i:", $(this).attr("data-i"),
      "Position j:", $(this).attr("data-j")
  )
}); 

// Avec le code ci-dessous, j'ai des problèmes à chaque reset car les item sont 
// supprimés.
// Pas de gestion dynamique de .item 
// $(".item").click(function(){
//   console.log("Je n'existe que jusqu'à ma mort dans un reset/ shuffle")   
//


// Une jolie fenetre est prévue pour quand on gagne
var modal = document.getElementById("myModal");

// Pour fermer la fenetre avec un "X"
var span = document.getElementsByClassName("close")[0];

// Pour afficher la fenetre quand on a gagné, appeler cette fonction
function displayWin () {
  modal.style.display = "block";
}

// Quand on clique sur <span> (x), on ferme
span.onclick = function() {
  modal.style.display = "none";
}

// On ferme aussi si on clique n'importe où
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Pour récupérer l'appui sur les flèches du clavier
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == 38) {
      soluce.unshift("B");
      // up arrow
      applyMove (current_state, empty_cell, HAUT);
    }
    else if (e.keyCode == 40) {
      soluce.unshift("H");
      applyMove (current_state, empty_cell, BAS);
    }
    else if (e.keyCode == 37) {
      soluce.unshift("D");
       // left arrow
      applyMove (current_state, empty_cell, GAUCHE);
    }
    else if (e.keyCode == 39) {
      soluce.unshift("G");
       // right arrow
      applyMove (current_state, empty_cell, DROITE);
    }
  displayState(current_state);
  if (checkWin(current_state)) {
    displayWin();
  }
}


function checkWin (actuel_state) {
    if (JSON.stringify(winner) != JSON.stringify(actuel_state)) {
        console.log("Sorry, you loose !");
        console.log("CurrentState: " + JSON.stringify(actuel_state));
        console.log("Winner: " + JSON.stringify(winner));
        return (false);

    } else {
        console.log("Congratulation, you win !");
        console.log("CurrentState: " + JSON.stringify(actuel_state));
        console.log("Winner: " + JSON.stringify(winner));
        return (true);
    }
  //console.log("checkwin");

}


function reset () {
    soluce = [];
    setInitState();
    displayState (current_state);
    return (soluce);
}

// Affichage initial : on fait un reset
reset();

//winner = setInitState();
