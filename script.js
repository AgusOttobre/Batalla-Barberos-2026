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

// ─────────────────────────────────────────────
//  FORMULARIO DE INSCRIPCIÓN
// ─────────────────────────────────────────────

// Reemplazá "TU_ID_DE_FORMSPREE" con el ID que obtenés al crear el formulario en https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeqkyda";

// Número de WhatsApp destino (código país Argentina: 54, sin el 0 ni el 15)
const WHATSAPP_NUMBER = "5491163619600";

async function enviarFormulario(event) {
  event.preventDefault();

  const btn    = document.getElementById("btnEnviar");
  const status = document.getElementById("form-status");

  // Leer datos del formulario
  const nombre   = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email    = document.getElementById("email").value.trim();
  const edad     = document.getElementById("edad").value.trim();

  // Deshabilitar botón mientras se envía
  btn.disabled = true;
  btn.textContent = "Enviando...";
  status.className = "form-status";
  status.textContent = "";

  // ── 1. Enviar email vía Formspree ──────────────
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ nombre, telefono, email, edad })
    });

    if (response.ok) {
      // ── 2. Abrir WhatsApp con los datos ───────────
      const mensaje =
        `🔔 *Nueva inscripción - Batalla de Barberos 2026*%0A` +
        `👤 *Nombre:* ${nombre}%0A` +
        `📞 *Teléfono:* ${telefono}%0A` +
        `📧 *Email:* ${email}%0A` +
        `🎂 *Edad:* ${edad} años`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, "_blank");

      // Mensaje de éxito
      status.className = "form-status success";
      status.textContent = "✅ ¡Datos enviados correctamente! También se abrió WhatsApp para confirmar.";

      // Limpiar formulario
      document.getElementById("inscripcionForm").reset();
    } else {
      throw new Error("Error en el servidor");
    }
  } catch (error) {
    status.className = "form-status error";
    status.textContent = "❌ Hubo un error al enviar. Intentá de nuevo o contactanos por WhatsApp.";
  }

  // Rehabilitar botón
  btn.disabled = false;
  btn.textContent = "Enviar mis datos";
}
