let kNev = document.getElementById("nev");
kNev.innerHTML = "Molnár Beatrix";
kNev.style.textAlign = "center";

let tNev = document.querySelector("title");
tNev.innerHTML = "Molnár Beatrix";
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
    let jobbKepek = jobb.querySelectorAll("img");

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

function partEllenorzes() {
    let balLista = bal.querySelectorAll("img");
    let jobbLista = jobb.querySelectorAll("img");

    let kecske = false;
    let kaposzta = false;
    let farkas = false;

    for (let i = 0; i < balLista.length; i++) {
        if (balLista[i].src.includes("kecske")) {
            kecske = true;
        }
        if (balLista[i].src.includes("kaposzta")) {
            kaposzta = true;
        }
        if (balLista[i].src.includes("farkas")) {
            farkas = true;
        }
    }

    if (balLista.length == 2 && kecske && kaposzta) {
        alert("A kecske megeszi a káposztát a bal parton!");
        location.reload();
    }
    if (balLista.length == 2 && farkas && kecske) {
        alert("A farkas megeszi a kecskét a bal parton!");
        location.reload();
    }

    kecske = false;
    kaposzta = false;
    farkas = false;

    for (let i = 0; i < jobbLista.length; i++) {
        if (jobbLista[i].src.includes("kecske")) {
            kecske = true;
        }
        if (jobbLista[i].src.includes("kaposzta")) {
            kaposzta = true;
        }
        if (jobbLista[i].src.includes("farkas")) {
            farkas = true;
        }
    }

    if (jobbLista.length == 2 && kecske && kaposzta) {
        alert("A kecske megeszi a káposztát a jobb parton!");
        location.reload();
    }
    if (jobbLista.length == 2 && farkas && kecske) {
        alert("A farkas megeszi a kecskét a jobb parton!");
        location.reload();
    }
}

function csonakMozgas() {
    const csonak = document.getElementById("csonak");
    const balGomb = document.getElementById("balra");
    const jobbGomb = document.getElementById("jobbra");

    balGomb.addEventListener("click", function () {
        csonak.style.left = "60px";
        csonakOldal = "bal";
        partEllenorzes();
    });

    jobbGomb.addEventListener("click", function () {
        csonak.style.left = "525px";
        csonakOldal = "jobb";
        partEllenorzes();
    });
}

function nyeresEllenorzes(){
    let jobbKepek = jobb.querySelectorAll(".kep");

    if(jobbKepek.length === 3){
        alert("Gratulálok! Sikeresen átvitted mindet!");
        location.reload();
    }
}