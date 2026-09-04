// Fecha objetivo: 22/11/2026 a las 00:00:00
// Mes en JavaScript es 0-indexado, por lo que noviembre es el mes 10.
const countDownDate = new Date(2026, 10, 22, 0, 0, 0).getTime();

const x = setInterval(function() {

  const now = new Date().getTime();

  // Distancia entre hoy y la fecha objetivo
  const distance = countDownDate - now;

  // Cálculos de tiempo para días, horas, minutos y segundos
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Mostrar el resultado
  document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

  // Si la cuenta regresiva terminó, mostrar un mensaje
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "<div class='time-box' style='width: 100%;'><span style='font-size: 2rem;'>¡EL EVENTO HA COMENZADO!</span></div>";
  }
}, 1000);
