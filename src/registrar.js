import { images } from "./imgURL.js";
import { crearSemanas } from "./registroSemanal.js";
import { infoSemanal } from "./data.js";
import { selecDia  } from "./registroSemanal.js";

const contenedorExagonos = document.querySelector(".content-exagonal");
const fragmen = document.createDocumentFragment();
const contentRegister = document.querySelector(".dasboar-register");
const nextConten = document.querySelector(".next");
const close = document.querySelector(".x");
const main = document.querySelector(".main");

export let select = false;
export function createExagonal() {
  const hexagons = [];
  close.addEventListener("click", closed);

  const actual = infoSemanal[selecDia].hora;

  let count = 0;
  const value = infoSemanal[selecDia].activate;

  for (const ele in actual) {
    const unExagano = document.createElement("div");
    unExagano.setAttribute("class", `exa-conten card${count}`);
    unExagano.style.backgroundImage = `url('./asset/fondoGris.svg')`;
    
    const hora = document.createElement("p");
    hora.textContent = `${count < 10 ? "0" : ""}${count}:00`;
    hora.setAttribute("class", "hora");
    hora.setAttribute("data-name", `hora${count}`);
    unExagano.appendChild(hora);
    fragmen.appendChild(unExagano);
    
    if(value){
      unExagano.style.backgroundImage = `url('./asset/fondo.svg')`;
      const img = document.createElement("img");
      img.setAttribute("src", `${actual[ele].value}`);
      img.setAttribute("class", "actions-img");
       unExagano.appendChild(img) 
    }

      nextConten.replaceChildren()
    hexagons.push(unExagano); // Guardar cada hexágono en el array
    count++;
    unExagano.addEventListener("click", () =>
      mostrarImg(unExagano, hexagons, hora)
    );
  }

  contenedorExagonos.appendChild(fragmen);
}

function closed() {
  contentRegister.style.left = "-50%";
  main.style.visibility = "visible";
  crearSemanas();
  const contentIMG = document.querySelector(".content-img");
  console.log(contentIMG);
  if (contentIMG) {
    contentIMG.remove();
  }
  contenedorExagonos.replaceChildren();
} 

function mostrarImg(unExagonSelec, hexagons, hora) {
  const next = document.querySelector(".nexus");
  if(next)next.remove()
  hexagons.forEach((hex) => (hex.style.pointerEvents = "none"));
  unExagonSelec.style.backgroundImage = `url('./asset/fondoSelect.svg')`;
  hora.style.color = "#000";
  hora.style.fontWeight = "700";
  const contenImg = document.createElement("section");
  contenImg.setAttribute("class", "content-img");

  for (let index = 0; index < images.length; index++) {
    const img = document.createElement("img");
    img.setAttribute("src", `${images[index].url}`);
    img.setAttribute("class", "actions-img");
    img.setAttribute("data-name",`${images[index].url}` );

    img.addEventListener("click", () =>
      addImageToHexagon(unExagonSelec, img, hora,contenImg)
    );

    contenImg.appendChild(img);
  }

  contentRegister.appendChild(contenImg);
}


function verificarHijos(hexagons) {
  for (const hexagon of hexagons) {
    if (hexagon.children.length !== 2) {
      return false; // Retorna falso si encuentra un hexágono con un número de hijos diferente de 2
    }
  }
  return true; // Todos los hexágonos tienen exactamente dos hijos
} 

// Función para agregar la imagen seleccionada al hexágono
function addImageToHexagon(unExagonSelec, img, hora,contenImg) {
  // Cambiar el fondo del hexágono a la imagen seleccionada
  unExagonSelec.style.backgroundImage = `url('./asset/fondo.svg')`;
  if (unExagonSelec.children[1]) {
    unExagonSelec.children[1].remove();//eliminado si exite la imgen
  }
  unExagonSelec.appendChild(img);
  hora.style.color = "white";
  infoSemanal[selecDia].hora[hora.dataset.name].value=img.dataset.name


     const hexagons = contenedorExagonos.querySelectorAll('.exa-conten');
    if (verificarHijos(hexagons)) {
      
        if(nextConten.children.length==0){
          console.log(nextConten.children.length==0)
          const next = document.createElement("button");
          next.textContent = "Terminar";
          nextConten.appendChild(next);
          next.setAttribute('class','nexus');
          next.addEventListener("click", () => {

            //aqui guardamos en local
            infoSemanal[selecDia].activate = true;
            contentRegister.style.left = "-50%";
            main.style.visibility = "visible";
            contenedorExagonos.replaceChildren();
            crearSemanas();
            localStorage.setItem("notas",JSON.stringify(infoSemanal));
            window.location.reload();
          });
        }
        
    }
     contenImg.remove(); // Eliminar el contenedor de imágenes
  

  // Rehabilitar la interacción con otros hexágonos
 
  hexagons.forEach((hex) => (hex.style.pointerEvents = "auto")); // Habilitar clics en los hexágonos
}
