import { infoSemanal } from "./data.js";
import { diaActual } from "./horas.js";
const dia1 = document.getElementById("dia1");
const dia2 = document.getElementById("dia2");
const dia3 = document.getElementById("dia3");
const eles=document.querySelectorAll('.xcent')
const xCentaje1 = document.getElementById("porcentaje1");
const xCentaje2 = document.getElementById("porcentaje2");
const xCentaje3 = document.getElementById("porcentaje3");

export function progreso() {
  const keys = Object.keys(infoSemanal);

  let index = keys.indexOf(diaActual);

  const tresAnteriores = [
    keys[(index - 3 + keys.length) % keys.length],
    keys[(index - 2 + keys.length) % keys.length],
    keys[(index - 1 + keys.length) % keys.length],
  ];

  const[unoDIA,dosDIA,tresDIA]=tresAnteriores
  const totaldia1={}
  const totaldia2={}
  const totaldia3={}

  const centaje1=infoSemanal[unoDIA]['hora']
  const centaje2=infoSemanal[dosDIA]['hora']
  const centaje3=infoSemanal[tresDIA]['hora']
    for (const e in centaje1) {
        totaldia1[centaje1[e].completed]=(totaldia1[centaje1[e].completed] ||0)+1
        totaldia2[centaje2[e].completed]=(totaldia2[centaje2[e].completed] ||0)+1
        totaldia3[centaje3[e].completed]=(totaldia3[centaje3[e].completed] ||0)+1
       
    }




const div1=document.createElement('div')
div1.style.width=Math.floor((totaldia1.true||0)*100/24)+'%'
div1.style.backgroundColor='white'
eles[0].appendChild(div1)
dia1.textContent=unoDIA
xCentaje1.textContent=Math.floor((totaldia1.true||0)*100/24)+'%'

const div2=document.createElement('div')
div2.style.width=Math.floor((totaldia2.true||0)*100/24)+'%'
div2.style.backgroundColor='white'
eles[1].appendChild(div2)
dia2.textContent=dosDIA
xCentaje2.textContent=Math.floor((totaldia2.true||0)*100/24)+'%'

const div3=document.createElement('div')
div3.style.width=Math.floor((totaldia3.true||0)*100/24)+'%'
div3.style.backgroundColor='white'
eles[2].appendChild(div3)
dia3.textContent=tresDIA
xCentaje3.textContent=Math.floor((totaldia3.true||0)*100/24)+'%'




 

}
