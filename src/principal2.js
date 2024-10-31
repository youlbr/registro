import { infoSemanal } from "./data.js";
import { obtenerHoraActual,toMilliseconds } from "./horas.js";
const semanaPrincipal = document.querySelector(".dasboar-semanal");
const fragmen = document.createDocumentFragment();
import { diaActual } from "./horas.js";

const value = infoSemanal[diaActual].activate;

export function crearSemanasPrincipaL() {
  let actual = infoSemanal[diaActual].hora;
  const keys =Object.keys( infoSemanal[diaActual].hora);
  const allExagono = [];
  let count = 0;
  
  for (const ele in actual) {
    let isCompleted = actual[ele].completed === null 
    ? '' 
    : (actual[ele].completed ? 'completed' : 'noCompleted');

    const unExagano = document.createElement("div");
    unExagano.setAttribute("class", `exa-conten card${count} ${isCompleted}`);
    unExagano.setAttribute("data-name", `${keys[count]}`);
    const hora = document.createElement("p");
    hora.textContent = `${count < 10 ? "0" : ""}${count}:00`;
    hora.setAttribute("class", "hora");
    if (value) {
      const img = document.createElement("img");
      img.setAttribute("src", `${actual[ele].value}`);
      img.setAttribute("class", "actions-img");
      unExagano.appendChild(img);
    }

    unExagano.appendChild(hora);
    fragmen.appendChild(unExagano);

    allExagono.push(unExagano); 
    const clickHandler = (e) => calificar(e, unExagano, allExagono, hora, clickHandler); 
    unExagano.addEventListener("click", clickHandler);
  count++;
}
semanaPrincipal.appendChild(fragmen);
}

function calificar(e,unExagano, allExagono, hora,clickHandler) {
  e.stopPropagation()
    unExagano.removeEventListener("click", clickHandler);


  const horaEstablecida = hora.textContent
  const horaActual = obtenerHoraActual(); 
   const horaEstablecidaMs = toMilliseconds(horaEstablecida) + (59 * 60 * 1000 + 59000);
   
   const horaActualMs = toMilliseconds(horaActual)<=3540000?86340043534502:toMilliseconds(horaActual)
   
   if (horaEstablecidaMs<horaActualMs && value) {
     if (!unExagano.children[2]) {
       allExagono.forEach((hex) => {
         hex.style.pointerEvents = "none";
         hex.style.opacity = 0.3;
       });
       unExagano.style.pointerEvents='none'
 

    const conten = document.createElement("div");
    conten.setAttribute("class", "contentCalification");
    conten.style.pointerEvents = "auto";
    const botonSucces = document.createElement("button");
    const botonFailed = document.createElement("button");
    botonSucces.textContent = "Succes";
    botonFailed.textContent = "Failed";
    conten.appendChild(botonFailed);
    conten.appendChild(botonSucces);
    unExagano.appendChild(conten);
    unExagano.style.opacity = 1;

    
    botonSucces.addEventListener("click", (e) => {
      e.stopPropagation();
      unExagano.style.backgroundImage = `url('../asset/fondoGreen.svg')`;

      allExagono.forEach((hex) => {
        hex.style.pointerEvents = "auto";
        hex.style.opacity = 1;
      });
      let clave= unExagano.dataset.name

      const conten = unExagano.querySelector(".contentCalification");
      conten.remove();
      
      infoSemanal[diaActual]['hora'][clave]['completed']=true

      localStorage.setItem("notas",JSON.stringify(infoSemanal));
      unExagano.addEventListener("click", clickHandler);
      
    });

    botonFailed.addEventListener("click", (e) => {
      e.stopPropagation();
      unExagano.style.backgroundImage = `url('../asset/fondoFailed.svg')`;
      allExagono.forEach((hex) => {
        hex.style.pointerEvents = "auto";
        hex.style.opacity = 1;
      });
      const conten = unExagano.querySelector(".contentCalification");
      conten.remove();
      let clave= unExagano.dataset.name

      infoSemanal[diaActual]['hora'][clave]['completed']=false
      localStorage.setItem("notas",JSON.stringify(infoSemanal));
      unExagano.addEventListener("click", clickHandler);
     });
  }
 }
}
