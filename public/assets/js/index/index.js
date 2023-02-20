$(document).ready(function () {

  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  
  $(".btn-delete-book").on("click", function (e) {
    e.preventDefault();

    if (window.confirm("¿Estás seguro que deseas eliminar este libro?")) {
      toastr["info"]("Se ha eliminado satisfcatoriamente.", "Notificación");

      setTimeout(() => {
        $(this).closest(".form-delete").submit();
      }, 1500);
    }
  });

  $(".btn-delete-category").on("click", function (e) {
    e.preventDefault();

    if (window.confirm("¿Estás seguro que deseas eliminar esta categoria?")) {
      toastr["info"]("Se ha eliminado satisfcatoriamente.", "Notificación");

      setTimeout(() => {
        $(this).closest(".form-delete").submit();
      }, 1500);
    }
  });

  $(".btn-delete-author").on("click", function (e) {
    e.preventDefault();

    if (window.confirm("¿Estás seguro que deseas eliminar este autor?")) {
      toastr["info"]("Se ha eliminado satisfcatoriamente.", "Notificación");

      setTimeout(() => {
        $(this).closest(".form-delete").submit();
      }, 1500);
    }
  });

  $(".btn-delete-editorial").on("click", function (e) {
    e.preventDefault();

    if (window.confirm("¿Estás seguro que deseas eliminar este editorial?")) {
      toastr["info"]("Se ha eliminado satisfcatoriamente.", "Notificación");

      setTimeout(() => {
        $(this).closest(".form-delete").submit();
      }, 1500);
    }
  });

  $(".send-details").on("click", function () {
    $(this).closest(".form-details").submit();
  });


});
