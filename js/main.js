let inputs = document.querySelectorAll('input');
let button = document.querySelector('.btn button');

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let Matrice = {
    x: 0,
    y: 0,
    creation: function(attributClass) {
        let element = attributClass.split('-');
        this.x = parseInt(element[1]);
        this.y = parseInt(element[2]);
    },

    affiche: function() {
        return this.x + ', ' + this.y;
    },

    verifieValeur: function(input) {
        let resultat = true;

        if (input.value !== '') {
            for (let i = 0; i < 9; i++) {
                let ligne = document.querySelector('.case-' + this.x + '-' + i);
                if (ligne.getAttribute('class') !== 'case-' + this.x + '-' + this.y) {

                    if (ligne.value === input.value) {

                        resultat = false;
                    }
                }

            }

            for (let i = 0; i < 9; i++) {
                let colone = document.querySelector('.case-' + i + '-' + this.y);
                if (colone.getAttribute('class') !== 'case-' + this.x + '-' + this.y) {

                    if (colone.value === input.value) {
                        resultat = false;
                    }
                }

            }
        }

        return resultat;
    },

    ajouteValeurInitiale: function(inputs) {
        let nombreElementParDefaut = rand(30, 60);
        let index = 0;
        let indexUse = [];

        let champs = document.createElement('input');
        champs.setAttribute('type', 'text');
        champs.setAttribute('value', '0');

        while (index <  nombreElementParDefaut) {
            let indexInput = rand(0, 80);
            let isNotIn = true;


            for (let i = 0; i < indexUse.length; i++) {
                if (indexUse[i] == indexInput) {
                    isNotIn = false;
                }
            }


            if (isNotIn) {

                champs.setAttribute('class', inputs[indexInput].getAttribute('class'));
                this.creation(inputs[indexInput].getAttribute('class'));

                champs.value = rand(1, 9) + '';

                if (this.verifieValeur(champs)) {
                    inputs[indexInput].value = champs.value;
                    inputs[indexInput].style.backgroundColor = '#91ffd1';
                    inputs[indexInput].disabled = true;
                    indexUse.push(indexInput);
                    index++;
                }

            }


        }



    }
};


let matrice = Matrice;
matrice.creation('case-0-0');
matrice.ajouteValeurInitiale(inputs);

let valeur = (val) => {
    const tableau = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < tableau.length; i++) {
        if (val === tableau[i]) {
            return true;
        }
    }

    return false;
}

inputs.forEach((input) => {

    input.addEventListener('input', () => {

        if (valeur(input.value)) {
            matrice.creation(input.getAttribute('class'))

            if (matrice.verifieValeur(input)) {
                input.style.color = 'black';
            } else {
                input.style.color = 'red';
            }
        } else {

            input.value = '';
        }


    });

});

button.addEventListener('click', () => {
    matrice.creation('case-0-0');
    inputs.forEach((input) => {
        input.value = '';
        input.style.backgroundColor = '#fff';
        input.style.color = '#000';
        input.disabled = false;
    });
    matrice.ajouteValeurInitiale(inputs);
});