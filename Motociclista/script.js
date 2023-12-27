document.addEventListener("DOMContentLoaded", function() {
    const totalMotociclistas = 8;
    let motociclistasDisponibles = totalMotociclistas;
    let clickCount = 0; // Agrega el contador de clics
    
    function toggleAvailability(block) {
      if (block.classList.contains("available")) {
        block.classList.remove("available");
        motociclistasDisponibles++;
      } else {
        block.classList.add("available");
        motociclistasDisponibles--;
        // Incrementa el contador de clics aquí
        clickCount++;
      }
      // Llama a la función para verificar el contador de clics
      checkClickCount();
      updateBlockStatus();
    }

    // Función para verificar el contador de clics
    function checkClickCount() {
      // Verifica si el contador alcanzó 8 y detiene el contador
      if (clickCount === 8) {
        alert("¡Se alcanzaron 8 clics! Deteniendo la disponibilidad.");
        // Deshabilita los bloques para futuros clics
        const blocks = document.querySelectorAll(".time-block");
        blocks.forEach(block => {
          block.removeEventListener("click", handleClick);
        });
      }
    }
    
    function updateBlockStatus() {
      const blocks = document.querySelectorAll(".time-block");
      blocks.forEach(block => {
        if (!block.classList.contains("available") && motociclistasDisponibles === 0) {
          block.classList.add("unavailable");
          block.removeEventListener("click", handleClick);
        } else {
          block.classList.remove("unavailable");
          block.addEventListener("click", handleClick);
        }
      });
    }
  
    function handleClick() {
      toggleAvailability(this);
    }
  
    // Crear bloques de tiempo
    const startTime = 8 * 60; // 8:00 a.m. en minutos
    const endTime = 20 * 60; // 8:00 p.m. en minutos
    const interval = 30; // Intervalo en minutos
  
    for (let i = startTime; i < endTime; i += interval) {
      const block = document.createElement("div");
      block.className = "time-block";
      block.textContent = formatTime(i);
      block.addEventListener("click", handleClick);
      document.body.appendChild(block);
    }
  
    function formatTime(minutes) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    }
  
    updateBlockStatus();
  });
