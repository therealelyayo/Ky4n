$(".delete_zombie").on("click", function (_) {
  const password = prompt("¿Contraseña?");
  const url =
    window.location.href.replace("get", "remove") + `&Password=${password}`;

  if (password != null) {
    $.ajax({
      url: url,
      type: "DELETE",

      success: function (data) {
        Swal.fire(
          "Eliminado",
          "Los datos fueron eliminados exitosmanete (Refresca la pagina)",
          "success"
        );
      },

      error: function (err) {
        Swal.fire("Error", "Los datos no fueron eliminados", "error");
      },

      fail: function (err) {
        Swal.fire(
          "Error",
          "Sucedio un error inesperado, revisa la consola",
          "error"
        );
      },
    });
  } else {
    Swal.fire("Error", "No se pudo eliminar los datos", "error");
  }
});
