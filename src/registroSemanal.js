import { createExagonal } from "./registrar.js";
import { infoSemanal } from "./data.js";
import { diaActual } from "./horas.js";

const contentSemana = document.querySelector(".content-semana");
const fragmen = document.createDocumentFragment();
const contentRegister = document.querySelector(".dasboar-register");
const main = document.querySelector(".main");

export let selecDia = "";

export function crearSemanas() {
  const semanas = ["D", "L", "M", "M", "J", "V", "S"];
  const semanasC = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
  ];
  
  let count = 0;

  for (const ele in infoSemanal) {
    const key = Object.keys(infoSemanal)
    const value = infoSemanal[ele].activate;
    const contentDay = document.createElement("div");
    contentDay.setAttribute(
      "class",
      `cards cardSEM${count} ${value ? "select" : ""} ${diaActual==key[count] ? "actual" : ""}`
    );
    contentDay.setAttribute("data-name", `${semanasC[count]}`);
    const diaSemana = document.createElement("p");
    diaSemana.textContent = semanas[count];
    diaSemana.setAttribute("class", "text-semana");
    diaSemana.setAttribute("data-name", `${semanasC[count]}`);

    contentDay.appendChild(diaSemana);
    fragmen.appendChild(contentDay);

    contentDay.addEventListener("click", (e) => mostrarRegitro(e));
    count++;
  }

  contentSemana.appendChild(fragmen);
}

function mostrarRegitro(e) {
  e.stopPropagation();
  selecDia = e.target.dataset.name.split(" ");
  selecDia=selecDia[0]

  main.style.visibility = "hidden";
  contentRegister.style.left = "50%";
  contentSemana.replaceChildren();
   createExagonal();


}
