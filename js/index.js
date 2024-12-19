document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("buscarText");
  let cardBody = document.getElementsByClassName("card")[0];
  let cardPersonaje = document.getElementsByClassName("album")[0];
  //creo este array para luego recorrerloy hacer las filtraciones
  let personajes = [];

  //mi función para cargar los datos del json
  async function cargarDatos() {
    try {
      const response = await fetch("/js/characterdb.json");
      if (!response.ok) {
        throw new Error(`Error al cargar los datos: ${response.statusText}`);
      }
      personajes = await response.json();
      mostrarPersonajes(personajes);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  //mi función para mostrar mis personajes
  function mostrarPersonajes(lista) {
    cardBody.innerHTML = "";
    lista.forEach(personaje => {
      cardBody.innerHTML += `   
        <article>
          <figure>
            <img src="${personaje.image}" alt="${personaje.name}">
            <figcaption>${personaje.name}</figcaption>
          </figure>
          <button id="btn-${personaje.id}" onclick="verPersonaje(${personaje.id})">Ver Personaje</button>
        </article>
      `;
    });
  }

  //aquí busco el personaje por su id y lo muestro en un section
  window.verPersonaje = function(id) {
    const personaje = personajes.find(personaje => personaje.id == id);
    cardPersonaje.innerHTML = `
     <figure>
          <img src="${personaje.image}" alt="">
          <figcaption>${personaje.name}</figcaption>
        </figure>
        <h2>Type: ${personaje.type}</h2>
        <h2>Range: ${personaje.range}</h2>
        <h2>Spells: ${personaje.spells}</h2>
        <button onclick="cerrarVentana()">Cerrar</button>
    `
    //en los estilos está none, aquí le pongo block al display
    cardPersonaje.style.display = "block";
  };

  //acá vuelvo a colocar en none el display 
  window.cerrarVentana = function(){
    cardPersonaje.style.display = "none";
  }

  //con este evento filtro los personajes por el nombre
  inputBuscar.addEventListener("input", () => {
    const texto = inputBuscar.value.toLowerCase();
    const personajesFiltrados = personajes.filter(personaje =>
      personaje.name.toLowerCase().includes(texto)
    );
    //aquí muestro los personajes que tengan dicho nombre
    mostrarPersonajes(personajesFiltrados);
  });

  //aquí vuelvo a cargar los datos iniciales
  cargarDatos();
});
