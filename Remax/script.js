let sidebar = document.querySelector(".sidebar");
let closeAnt = document.querySelector("#ant");

// Cambio de barra lateral
closeAnt.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
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

function obtenerDatosYMostrarTabla() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var datos = JSON.parse(this.responseText);
          var tabla = document.getElementById("tablaDatos");
          tabla.innerHTML = "<tr><th>ID</th><th>Nombre</th><th>Descripción</th></tr>";

          datos.forEach(function (fila) {
              var filaHTML = "<tr><td>" + fila.id + "</td><td>" + fila.nombre + "</td><td>" + fila.descripcion + "</td></tr>";
              tabla.innerHTML += filaHTML;
          });
      }
  };

  xhr.open("GET", "obtenerDatos.php", true);
  xhr.send();
}

