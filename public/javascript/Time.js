function Hora() {
  const date = new Date();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();
  const full = `${hora}:${minutos}:${segundos}`;
  document.getElementById("fecha").innerHTML = full;
}

setInterval(Hora, 1000);
