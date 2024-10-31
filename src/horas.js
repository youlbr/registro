const diaMES=document.querySelector('.diaMES')
const MES=document.querySelector('.mes')
const DIA=document.querySelector('.dia')
const horaTime=document.querySelector('.horaTime')


export function obtenerHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
}



export function toMilliseconds(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}

const fechaActual = new Date(); // Crea un objeto Date con la fecha y hora actuales
const diaAC = fechaActual.getDay(); // Obtiene el día de la semana como un número (0 a 6)
const diaN = fechaActual.getDate(); // Obtiene el día de la semana como un número (0 a 6)
const mes = fechaActual.getMonth() +1; // Obtiene el día de la semana como un número (0 a 6)

function actualizarHora() {
    const ahora = new Date();
    
    const horas = String(ahora.getHours()).padStart(2, '0'); // Asegura que tenga 2 dígitos
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    const horaCompleta = `${horas}:${minutos}:${segundos}`;
 return horaCompleta
}


const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];
const nombreDiaActual = diasSemana[diaAC];

const mesActaul=mesesDelAño[mes]

diaMES.textContent=diaN
MES.textContent=mesActaul
DIA.textContent=nombreDiaActual
setInterval(() => {
    
    horaTime.textContent=actualizarHora()
},1000);
export const diaActual=nombreDiaActual
