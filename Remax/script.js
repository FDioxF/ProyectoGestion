let sidebar = document.querySelector(".sidebar");
let closeAnt = document.querySelector("#ant");

// Cambio de barra lateral
closeAnt.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Cambio de section segun Opcion del menu  
function mostrarSeccion(numeroSeccion) {
    // Oculta todas las secciones
    var secciones = document.querySelectorAll('.home');
    secciones.forEach(function(seccion) {
        seccion.style.display = 'none';
    });

    // Muestra la sección seleccionada
    var seccionSeleccionada = document.getElementById(numeroSeccion);
    seccionSeleccionada.style.display = 'block';
}

function inicio() {
  var secciones = document.querySelectorAll('.home');
  secciones.forEach(function(seccion) {
      seccion.style.display = 'none';
  });
  var seccionSeleccionada = document.getElementById(1);
  seccionSeleccionada.style.display = 'block';
}

// Funcion que recibe el formulario de Registro de Cliente y lo envia a la consulta PHP
function regCli() {
  var dni = document.getElementById("dni").value;
  var nombre = document.getElementById("nombre").value;
  var direccion = document.getElementById("direccion").value;
  var distrito = document.getElementById("distrito").value;
  var provincia = document.getElementById("provincia").value;
  var ciudad = document.getElementById("ciudad").value;
  var telefono = document.getElementById("telefono").value;

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/regisCli.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var datos = "dni=" + dni + "&nombre=" + nombre + "&direccion=" + direccion +
              "&distrito=" + distrito + "&provincia=" + provincia + "&ciudad=" + ciudad +
              "&telefono=" + telefono;
  xhr.send(datos);
}

// Funcion que recibe el formulario de Registro de Porpiedad y lo envia a la consulta PHP
function regPro() {
  var direccion = document.getElementById("direccion").value;
  var distrito = document.getElementById("distrito").value;
  var provincia = document.getElementById("provincia").value;
  var ciudad = document.getElementById("ciudad").value;
  var partida = document.getElementById("partida").value;
  var dnipro = document.getElementById("dnipro").value;
  var precio = document.getElementById("precio").value;
  var habitaciones = document.getElementById("habitaciones").value;
  var banos = document.getElementById("banos").value;
  var piso = document.getElementById("piso").value;
  var antiguedad = document.getElementById("antiguedad").value;
  var areaTotal = document.getElementById("areaTotal").value;
  var areaDisponible = document.getElementById("areaDisponible").value;
  var areaConstruida = document.getElementById("areaConstruida").value;

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/regisPro.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  var datos = "direccion=" + direccion + "&distrito=" + distrito + "&provincia=" + provincia + "&ciudad=" + ciudad +
              "&partida=" + partida + "&dnipro=" + dnipro + "&precio=" + precio + "&habitaciones=" + habitaciones + "&banos=" + banos + "&piso=" + piso + "&antiguedad=" + antiguedad +
              "&areaTotal=" + areaTotal + "&areaDisponible=" + areaDisponible + "&areaConstruida=" + areaConstruida;
  xhr.send(datos);
}

function ordenarPorRecientes() {
  fetch('./php/ordenarPorRecientes.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorAntiguas() {
  fetch('./php/ordenarPorAntiguas.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorDistrito() {
  fetch('./php/ordenarPorDistrito.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorCiudad() {
  fetch('./php/ordenarPorCiudad.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorProvincia() {
  fetch('./php/ordenarPorProvincia.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorMayorPrecio() {
  fetch('./php/ordenarPorMayorPrecio.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function ordenarPorMenorPrecio() {
  fetch('./php/ordenarPorMenorPrecio.php')
      .then(response => response.json())
      .then(data => {
          const tablaPropiedades = document.getElementById('tablaPropiedades');
          
          // Verificar que el elemento exista antes de modificar su contenido
          if (tablaPropiedades) {
            // Limpiar filas existentes
            tablaPropiedades.innerHTML = "<tr><th>N°Partida</th><th>Direccion</th><th>Distrito</th><th>Ciudad</th><th>Provincia</th><th>Precio</th><th>N°Piso</th><th>N°Habitaciones</th><th>N°Baños</th><th>Area Total</th><th>Area Disponible</th><th>Area Construida</th></tr>";
            
            // Agregar nuevas filas
            data.forEach(propiedad => {
                const fila = `<tr><td>${propiedad.NPR}</td><td>${propiedad.DIR}</td><td>${propiedad.DIST}</td><td>${propiedad.CIU}</td><td>${propiedad.PROV}</td><td>${propiedad.PRC}</td><td>${propiedad.NPS}</td><td>${propiedad.NHB}</td><td>${propiedad.NBA}</td><td>${propiedad.ART}</td><td>${propiedad.ARD}</td><td>${propiedad.ARC}</td></tr>`;
                tablaPropiedades.innerHTML += fila;
            });
          } else {
            console.error('Elemento tablaPropiedades no encontrado.');
          }
      })
      .catch(error => {
          console.error('Error al obtener datos:', error);
          // Manejar los errores de manera adecuada, por ejemplo, mostrar un mensaje amigable para el usuario
      });
}

function filtro() {
  var seleccion = document.getElementById("filtro").value;

  // Condicional para llamar a funciones diferentes según la opción seleccionada
  if (seleccion === "Recientes") {
    ordenarPorRecientes();
  } else if (seleccion === "Antiguas") {
    ordenarPorAntiguas();
  } else if (seleccion === "Distrito") {
    ordenarPorDistrito();
  } else if (seleccion === "Ciudad") {
    ordenarPorCiudad();
  } else if (seleccion === "Provincia") {
    ordenarPorProvincia();
  } else if (seleccion === "Mayor Precio") {
    ordenarPorMayorPrecio();
  } else if (seleccion === "Menor Precio") {
    ordenarPorMenorPrecio();
  } else {
    ordenarPorRecientes();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  inicio();
  ordenarPorRecientes();
});