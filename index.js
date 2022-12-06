/**************** PENDU *****************/

// TABLEAU DE LETTRES
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// AFFICHE LE CLAVIER SUR LA PAGE (en injectant chaque lettre dans l'element html .keypad)
for (let i = 0; i < letters.length; i++) {
    document.querySelector('.keypad').innerHTML += `<div class="letter btn btn-dark border col-2 fs-2">${letters[i]}</div>`;
}

// TABLEAU DE MOTS
const words = ['maison', 'fruit', 'arbre', 'ciel', 'terre', 'voiture', 'porte', 'bouteille', 'bureau', 'ecran', 'horloge', 'nuage', 'chocolat', 'pyramide', 'sable', 'eau', 'poisson', 'elephant', 'zebre', 'tigre', 'girafe', 'ballon', 'pantalon', 'livre', 'armoire', 'soleil', 'lune', 'etoile', 'wagon', 'train', 'puit', 'chaise', 'stylo', 'papier'];

// LE MOT A TROUVER (généré par la fonction randomWord)
const word = randomWord(words);

// CONSTRUIT LE MOT DISSIMULé (au même nombre de caractères que word)
let hiddenWord = '';
for (let i = 0; i < word.length; i++) {
    hiddenWord += '_';
}

// AFFICHE LE MOT DISSIMULé (dans l'element HTML screen)
const screen = document.querySelector('.screen');
screen.textContent = hiddenWord;

// COMPTE A REBOURS (fixé à 120 secondes)
let countDown = 120;

// AFFICHE MON COMPTEUR (dans l'element HTML count)
const count = document.querySelector('.count');
count.textContent = countDown;

// NOMBRE DE CHANCES AU DEPART
let luck = 10;

// AFFICHE LES CHANCES
document.querySelector('.luck').textContent = luck;

// QUAND ON CLIQUE SUR UNE LETTRE
document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('click', e => {

        // Si la lettre n'a pas déjà été cliqué (désactivé)
        if (!e.target.getAttribute("disabled")) {

            // Récupère la lettre
            let value = e.target.textContent

            // Si la lettre est présente dans le mot
            if (word.includes(value)) {
                // Alors cherche et remplace la lettre dans le mot caché
                for (let i = 0; i < word.length; i++) {
                    if (value === word[i]) {
                        hiddenWord = hiddenWord.substring(0, i) + value + hiddenWord.substring(i + 1);
                    }
                }
                // Et affiche le mot caché modifié
                screen.textContent = hiddenWord;
            } else {
                // si la lettre n'est pas présente, alors on retire 1 chance
                luck--;
                // Affiche les chances restantes
                document.querySelector('.luck').textContent = luck;
                // Retire 1 barre de vie
                document.querySelector('.life').lastElementChild.remove();
                // Fais apparaitre un élément du dessin
                document.querySelector('.drawing-' + luck).classList.remove("opacity-0");
            }

            // Si toutes les lettres ont été trouvé (gagné), alors éxecute la fonction win
            if (word === hiddenWord) {
                win();
            }

            // S'il ne reste plus de chance (perdu), alors éxecute la fonction loose
            if (luck < 1) {
                loose();
            }

            // la lettre est désactivée dans tous les cas car déjà cliqué (e.target = div)
            e.target.style.opacity = 0.5;
            e.target.setAttribute("disabled", "true");
        }
    })
})

// Fonction : à chaque seconde d'intervalle, retire 1 au compteur et l'affiche
const interval = setInterval(() => {
    count.textContent = (countDown--) - 1;
    // Si le compteur est à 0, alors c'est terminé
    if (countDown < 1) {
        loose();
        clearInterval(interval);
    }
}, 1000)


// Fonction qui séléctionne aléatoirement un mot dans le tableau words et le met en majuscule
function randomWord(words) {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

// Fonction qui affiche le mot complet puis une alerte 'Gagné!' et reactualise la page
function win() {
    screen.innerHTML = '<span style="color:greenyellow;">' + word + '</span>';
    alert('Gagné ! Vous avez trouvé le mot.');
    location.reload();
}

// Fonction qui affiche quand même le mot complet puis une alerte 'Perdu!' et reactualise la page
function loose() {
    screen.innerHTML = '<span style="color:red;">' + word + '</span>';
    alert('Perdu ! Le mot caché était : ' + word);
    location.reload();
}
