let currentPage = 1;
let puntosPorRespuesta = {};

function showPage(pageNumber) {
    const pages = document.getElementsByClassName('page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    currentPage = pageNumber;
    pages[currentPage - 1].style.display = 'block';
}

function volverAtras() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function sumarPuntos(respuesta, puntos) {
    const div = document.getElementById('resultado');

    if (puntosPorRespuesta[respuesta]) {
       return puntosPorRespuesta[respuesta] += puntos;
    } else {
        puntosPorRespuesta[respuesta] = puntos;
    }
}

function obtenerPersonalidad2(puntos) {
    if (puntos >= 27) {
        return "Zorro, lleno de astucia y agilidad, destaca por su habilidad para resolver acertijos con destreza. Su espíritu juguetón lo lleva a encontrar diversión en cada desafío que enfrenta, demostrando una aguda inteligencia para superar obstáculos. Aunque muestra cautela en ocasiones y puede ser algo temeroso, su ingenio lo hace destacar en cualquier situación. Su encanto único y enigmático lo convierte en alguien admirado por su sabiduría y capacidad para resolver misterios.";
    } else if (puntos >= 23) {
        return "Perro lobo, este ser muestra una personalidad que aparenta ser solitaria, pero en realidad, es un protector dedicado de su manada. Su lealtad, valentía e inteligencia lo hacen destacar, convirtiéndolo en alguien excepcional. Siempre dispuesto a enfrentar desafíos, cautiva a quienes lo conocen con su profundo compromiso y misterioso encanto hacia los suyos.";
    } else if (puntos >= 19) {
        return "buho, este grupo de individuos se presenta como tranquilos y relajados, pero detrás de esa apariencia serena, poseen una astucia notable y una sorprendente capacidad para anticipar lo que está por venir. Siempre vigilantes y controladores, observan cuidadosamente todo lo que ocurre a su alrededor, demostrando un talento excepcional para leer las situaciones con precisión. Su habilidad para anticipar y adaptarse los hace ser seres verdaderamente enigmáticos y fascinantes.";
    } else if (puntos >= 15) {
        return "Erizo, un individuo cauteloso destaca por su astucia y serenidad. Siempre alerta y adaptándose a los cambios, resuelve desafíos con habilidad. Sus defensas son notables y su independencia, admirable. Aunque parece reservado, disfruta del tiempo con sus seres queridos. Un ser enigmático y excepcional que cautiva con su encanto único.";
    } else if (puntos >= 11) {
        return "Nutria, se muestra simpático y divertido, disfrutando del tiempo de calidad junto a su círculo cercano. Pero detrás de su apariencia amigable, se esconden mentes muy inteligentes. Con serenidad y sabiduría, resuelven conflictos con éxito y continúan disfrutando de la vida. Su habilidad para mantener la armonía y salir victoriosos los hace ser seres excepcionales y admirables.";
    } else {
        return "Ciervo, irradia elegancia y gracia en su presencia. Su mente astuta, corazón compasivo y carisma natural lo hacen encantador y respetado por los demás. Enfrenta los desafíos con valentía y muestra una resiliencia admirable ante la adversidad";
    }
}
function redirigirAResultados() {
    calcularPersonalidad(); // Calcula el resultado como lo hacías antes

    // Redirige a la página de resultados con los resultados del test como parámetro en la URL
    const urlParams = new URLSearchParams();
    for (const pregunta in puntosPorRespuesta) {
        urlParams.append(pregunta, puntosPorRespuesta[pregunta]);
    }
    const url = 'resultado.html?' + urlParams.toString();
    window.location.href= url // Abre una nueva ventana o pestaña con la página de resultados
}


function calcularPersonalidad() {
    const form = document.getElementById('personalityTest');
    const respuestas = form.elements;
    
    for (let i = 0; i < respuestas.length; i++) {
        const respuesta = respuestas[i];
        if (respuesta.type === 'radio' && respuesta.checked) {
            sumarPuntos(respuesta.name, Number(respuesta.value));
        }
    }

     const resultadoDiv = document.createElement('div');
     resultadoDiv.innerHTML =  ` <h1>Resultado del Test de Personalidad</h1>
    <h3>Tu personalidad resultante es:</h3>
    <p>${obtenerPersonalidad2(puntosPorRespuesta['pregunta1'] + puntosPorRespuesta['pregunta2'] + puntosPorRespuesta['pregunta3'] + puntosPorRespuesta['pregunta4'] + puntosPorRespuesta['pregunta5'] + puntosPorRespuesta['pregunta6'] + puntosPorRespuesta['pregunta7'] + puntosPorRespuesta['pregunta8'] + puntosPorRespuesta['pregunta9'] + puntosPorRespuesta['pregunta10'])}</p>`;
    
    document.body.appendChild(resultadoDiv);
}

// TRAIL MOUSE

document.addEventListener("DOMContentLoaded", () => {
    const trailContainer = document.querySelector(".trail-container");
    const numTrails = 30;
    const trailElements = [];
    let isMouseMoving = false;
  
    // Función para restablecer posición y opacidad de los elementos de estela
    function resetTrails() {
      trailElements.forEach((trail) => {
        trail.style.left = "-100px"; // Puedes cambiar esto a una posición fuera de la pantalla
        trail.style.top = "-100px"; // Puedes cambiar esto a una posición fuera de la pantalla
        trail.style.opacity = "0";
      });
      isMouseMoving = false;
    }
  
    for (let i = 0; i < numTrails; i++) {
      const trail = document.createElement("div");
      trail.classList.add("trail");
      trailContainer.appendChild(trail);
      trailElements.push(trail);
    }
  
    document.addEventListener("mousemove", (e) => {
      const x = e.pageX;
      const y = e.pageY;
  
      for (let i = numTrails - 1; i > 0; i--) {
        const prevTrail = trailElements[i - 1];
        const currentTrail = trailElements[i];
  
        currentTrail.style.left = prevTrail.style.left;
        currentTrail.style.top = prevTrail.style.top;
  
        const opacity = (i + 1) / numTrails;
        currentTrail.style.opacity = opacity.toString();
      }
  
      trailElements[0].style.left = x + "px";
      trailElements[0].style.top = y + "px";
      trailElements[0].style.opacity = "1";
  
      if (!isMouseMoving) {
        isMouseMoving = true;
        requestAnimationFrame(updateOpacity);
      }
    });
  
    // Función para actualizar gradualmente la opacidad hasta que desaparezca
    function updateOpacity() {
      let hasVisibleTrail = false;
      for (let i = 0; i < numTrails; i++) {
        const currentTrail = trailElements[i];
        const opacity = parseFloat(currentTrail.style.opacity);
        if (opacity > 0) {
          currentTrail.style.opacity = (opacity - 0.05).toString();
          hasVisibleTrail = true;
        }
      }
  
      if (hasVisibleTrail) {
        requestAnimationFrame(updateOpacity);
      } else {
        resetTrails();
      }
    }
  });
  
  


  // Mostrar u ocultar el botón de desplazamiento al hacer scroll
window.addEventListener("scroll", () => {
    const btn = document.querySelector(".scroll-to-top-btn");
    if (window.scrollY > 100) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  });
  
  // Hacer scroll hacia arriba cuando se hace clic en el botón de desplazamiento
  document.querySelector(".scroll-to-top-btn").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  


//   EMAIL FUNCIONAL EMAILJS

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_38mwo3h';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});