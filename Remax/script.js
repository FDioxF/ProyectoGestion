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

//Consulta Cliente con Dni
function consultarClientes() {
  // Obtener el valor del DNI del formulario
  const dni = document.getElementById("dni").value;

  // Realizar una solicitud AJAX al servidor para ejecutar la consulta
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Manejar la respuesta del servidor
          const resultados = JSON.parse(xhr.responseText);
          mostrarResultados(resultados);
      }
  };

  // Configurar la solicitud AJAX
  xhr.open("GET", `conRemax.php?dni=${dni}`, true);
  xhr.send();
}

function mostrarResultados(resultados) {
  // Obtener el contenedor de resultados
  const resultadosContainer = document.getElementById("resultados");

  // Limpiar el contenedor de resultados
  resultadosContainer.innerHTML = "";

  // Mostrar los resultados en el contenedor
  resultados.forEach(function (cliente) {
      const clienteInfo = document.createElement("div");
      clienteInfo.textContent = `Nombre: ${cliente.NOM}`;
      resultadosContainer.appendChild(clienteInfo);
  });
}

//Registrar Cliente
function registrarCliente() {
  // Obtener los valores del formulario
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;

  // Realizar una solicitud AJAX al servidor para ejecutar la inserción
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          // Manejar la respuesta del servidor
          alert(xhr.responseText); // Puedes manejar la respuesta de acuerdo a tus necesidades
      }
  };

  // Configurar la solicitud AJAX
  xhr.open("POST", "insertarCliente.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  // Enviar los datos del formulario al servidor
  const data = `dni=${dni}&nombre=${nombre}&direccion=${direccion}`;
  xhr.send(data);
}