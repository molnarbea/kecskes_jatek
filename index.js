let kNev = document.getElementById("nev");
kNev.innerHTML = "Molnár Beatrix";
kNev.style.textAlign = "center";

document.title = "Molnár Beatrix"

const csonakLista = [];
 
let csonak = document.getElementById("csonak");
let jobb = document.getElementById("jobb");
let bal = document.getElementById("bal");

let kElemek = document.querySelectorAll("img");

let csonakOldal = "bal";

egerMozgas();
balrolJobbra();
csonakMozgas();


//jó kódok

function egerMozgas(){
    kElemek = document.querySelectorAll(".kep");
    for (let index = 0; index < kElemek.length; index++) {
        kElemek[index].addEventListener("mouseover", function (event) {
            event.target.classList.add("kiemelt");
        });
        kElemek[index].addEventListener("mouseout", function (event) {
            event.target.classList.remove("kiemelt");
        });
    }
}  

function balrolJobbra() {
    let balKepek = bal.querySelectorAll(".kep");

    for (let index = 0; index < balKepek.length; index++) {
        balKepek[index].onclick = function (event) {
            if(csonakOldal !== "bal"){
                alert("Nincs itt a csónak");
                return;
            }
                
            if (csonakEllenorzes()){
                let kep = event.target;

                csonakLista.push(kep.src);
                console.log(csonakLista);

                document.getElementById("rakomany").appendChild(kep);
                egerMozgas();

                kep.onclick = function () {
                    csonakLista.pop();
                    if(csonakOldal === "bal"){
                        bal.appendChild(kep);
                    }else{
                        jobb.appendChild(kep);
                    }
                    egerMozgas();
                    balrolJobbra();
                    jobbrolBalra();
                    nyeresEllenorzes()
                };
            };
        };
    }
}

function jobbrolBalra() {
    let jobbKepek = jobb.querySelectorAll(".kep");

    for (let index = 0; index < jobbKepek.length; index++) {
        jobbKepek[index].onclick = function (event) {
            if(csonakOldal !== "jobb"){
                alert("Nincs itt a csónak");
                return;
            }

            if (csonakEllenorzes()){
                let kep = event.target;

                csonakLista.push(kep.src);
                console.log(csonakLista);

                document.getElementById("rakomany").appendChild(kep);
                egerMozgas();

                kep.onclick = function () {
                    csonakLista.pop();
                    if(csonakOldal === "bal"){
                        bal.appendChild(kep);
                    }else{
                        jobb.appendChild(kep);
                    }
                    egerMozgas();
                    balrolJobbra();
                    jobbrolBalra();
                    nyeresEllenorzes()
                };
            }
        };
    }
}

function csonakEllenorzes() {
    if (csonakLista.length == 1) {
        alert("Már van a csónakban valami!");
        return false;
    }
    return true;
}

function partEllenorzes(oldal) {
    if (csonakLista.length === 0) {
        return;
    }
    let lista;

    if (oldal === "bal") {
        lista = bal.querySelector("p").querySelectorAll(".kep");
    } else {
        lista = jobb.querySelector("p").querySelectorAll(".kep");
    }

    let kecske = false;
    let kaposzta = false;
    let farkas = false;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].alt === "kecske") {
            kecske = true;
        }
        if (lista[i].alt === "kaposzta") {
            kaposzta = true;
        }
        if (lista[i].alt === "farkas") {
            farkas = true;
        }
    }

    if (kecske && kaposzta) {
        alert("A kecske megeszi a káposztát!");
        location.reload();
    }

    if (kecske && farkas) {
        alert("A farkas megeszi a kecskét!");
        location.reload();
    }
}

function csonakMozgas() {
    const csonak = document.getElementById("csonak");
    const balGomb = document.getElementById("balra");
    const jobbGomb = document.getElementById("jobbra");

    balGomb.addEventListener("click", function () {
        if (csonakOldal === "jobb") {
            partEllenorzes("jobb");
            csonak.style.left = "60px";
            csonakOldal = "bal";
        }
    });

    jobbGomb.addEventListener("click", function () {
        if (csonakOldal === "bal") {
            partEllenorzes("bal");
            csonak.style.left = "525px";
            csonakOldal = "jobb";
        }
    });
}

function nyeresEllenorzes(){
    let jobbKepek = jobb.querySelectorAll(".kep");

    if(jobbKepek.length === 3){
        alert("Gratulálok! Sikeresen átvitted mindet!");
        location.reload();
    }
}