const url = "http://localhost:3000";
async function mostrarUsuarios() {
    try {
      const response = await fetch(`${url}/users/`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los registros");
      }
  
      const usuarios = await response.json();
      console.log(usuarios);
  
      usuarios.usuarios.forEach((usuario) => {
        let nuevo =
          '<tr>  <td scope="col" id="id_usuario">' +
          usuario.id +
          '</td><td scope="col" id="nombre">' +
          usuario.nombre +
          '</td><td scope="col" id="apellido">' +
          usuario.apellido +
          '</td><td scope="col" id="correo">' +
          usuario.correo ;
  
        document.querySelector("#root").insertAdjacentHTML("beforeend", nuevo);
      });
    } catch (error) {
      console.log(error);
    }
  }
  mostrarUsuarios();
  
  // Actualizar user
  
  const inputId = document.querySelector("#id-user");
  const inputNombre = document.querySelector("#nombre");
  const inputApellido = document.querySelector("#apellido");
  const inputEmail = document.querySelector("#correo");
  const form = document.querySelector("#form-edit-user");  
  
  form.addEventListener("submit", validarFormulario);
  
  async function validarFormulario(evt) {
    evt.preventDefault();
  
    if (
      inputId.value === "" ||
      inputNombre.value === "" ||
      inputApellido.value === "" ||
      inputEmail.value === ""
    ) {
      return;
    }
  
    const usuarioNuevo = await editar(
      inputId.value,
      inputNombre.value,
      inputApellido.value,
      inputEmail.value
    );
    console.log(usuarioNuevo);
  
    if (!usuarioNuevo.error) {
      console.log("Usuario editado correctamente");
      location.reload();
    } else {
      console.log("Error al editar el usuario:", usuarioNuevo.error);
    }
  }
  
  async function editar(id, nombre, apellido, correo) {
    try {
      const body = { nombre, apellido, correo };
      console.log("Datos a enviar:", body);
  
      const res = await fetch(`${url}/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        throw new Error("Error al actualizar el usuario");
      }
  
      const json = await res.json();
      console.log(json);
  
      return json;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      return { error: error.message };
    }
  }
  
  // Crear
  
  const inputNombreC = document.querySelector("#c-nombre");
  const inputApellidoC = document.querySelector("#c-apellido");
  const inputEmailC = document.querySelector("#c-correo");
  const formC = document.querySelector("#form-create-user");
  
  formC.addEventListener("submit", validarFormularioC);
  
  
  
  async function validarFormularioC(evt) {
    evt.preventDefault();
    console.log(evt);
  
    if (
      inputNombreC.value === "" ||
      inputApellidoC.value === "" ||
      inputEmailC.value === ""
    ) {
      return;
    }
  
    const usuarioNuevoC = await registrar(
      inputNombreC.value,
      inputApellidoC.value,
      inputEmailC.value
    );
    console.log(usuarioNuevoC);
  
    if(!usuarioNuevoC.error){
      location.reload();
    }
  }
  
  async function registrar(nombre, apellido, correo) {
    const body = { nombre, apellido, correo };
    const res = await fetch(`${url}/users/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
  
    const json = await res.json();
  
    return json;
  }
  
  
  // Eliminar user
  
  const inputIdD = document.querySelector("#e-id-user");
  const formD = document.querySelector("#form-delete-user");
  
  formD.addEventListener("submit", validarFormularioE);
  
  async function validarFormularioE(evt) {
    evt.preventDefault();
  
    if (
      inputIdD.value === ""
    ) {
      return;
    }
  
    const usuarioEliminado = await eliminar(
      inputIdD.value
    );
    console.log(usuarioEliminado);
  
    if (!usuarioEliminado.error) {
      console.log("Usuario eliminado correctamente");
      location.reload();
    } else {
      console.log("Error al eliminar el usuario:", usuarioEliminado.error);
    }
  }
  
  async function eliminar(id) {
    try {
      const res = await fetch(`${url}/users/${id}`, {    
        method: "DELETE"
      });
  
      if (!res.ok) {
        throw new Error("Error al eliminar el usuario");
      }
  
      const json = await res.json();
      console.log(json);
  
      return json;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      return { error: error.message };
    }
  }
  