
import { crearSemanas } from "./src/registroSemanal.js";
import { crearSemanasPrincipaL } from "./src/principal2.js";
import { progreso } from "./src/progres.js";
document.addEventListener("DOMContentLoaded", function() {
  //localStorage.removeItem("notas");
    progreso()
    crearSemanas()
    crearSemanasPrincipaL()
});