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

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Mostrar el mensaje de éxito o error
      document.getElementById("mensaje").innerHTML = xhr.responseText;
    }
  };

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

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Mostrar el mensaje de éxito o error
      document.getElementById("mensaje").innerHTML = xhr.responseText;
    }
  };

  var datos = "direccion=" + direccion + "&distrito=" + distrito + "&provincia=" + provincia + "&ciudad=" + ciudad +
              "&partida=" + partida + "&dnipro=" + dnipro + "&precio=" + precio + "&habitaciones=" + habitaciones + "&banos=" + banos + "&piso=" + piso + "&antiguedad=" + antiguedad +
              "&areaTotal=" + areaTotal + "&areaDisponible=" + areaDisponible + "&areaConstruida=" + areaConstruida;
  xhr.send(datos);
}