$(function () {
	"use strict";
        var queries = setInterval(queryUser, 10000);
        // set a online status, last conection, permissions, selectedIPS,
        function queryUser() {
          $.ajax({
            type: "POST",
            url: "./src/globalFunctions/authQuery.php",
            dataType: "json",
            encode: true,
          })
            .done(function (data) {
              if (data.message) {
                document.getElementById("title-good").innerText =
                  "Hemos encontrado una sesión anterior...";
                document.getElementById("msg-good").innerText = data.message;
                $("#modal-good").modal("show");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
              }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              document.getElementById("title-error").innerText =
                "Ha ocurrido un error";
              if (jqXHR.status === 0) {
                document.getElementById("msg-error").innerHTML =
                  "Sin conexión: Verifica la red.";
              } else if (jqXHR.status == 404) {
                document.getElementById("msg-error").innerHTML =
                  "Requested page not found [404]";
              } else if (jqXHR.status == 500) {
                document.getElementById("msg-error").innerHTML =
                  "Internal Server Error [500].";
              } else if (textStatus === "parsererror") {
                document.getElementById("msg-error").innerHTML =
                  "Requested JSON parse failed.";
              } else if (textStatus === "timeout") {
                document.getElementById("msg-error").innerHTML = "Time out error.";
              } else if (textStatus === "abort") {
                document.getElementById("msg-error").innerHTML =
                  "Ajax request aborted.";
              } else {
                document.getElementById("msg-error").innerHTML =
                  "Uncaught Error: " + jqXHR.responseText;
              }
              $("#modal-error").modal("show");
            });
        }
        queryUser();
      // login

	$("#loginForm").validate({
		rules: {
			username: {
				required: true,
				minlength: 3,
			},
			password: {
				required: true,
				minlength: 4,
			},
		},
		messages: {
			username: {
				required: "Por favor, ingresa un usuario",
				minlength: "Debes ingresar por lo menos 3 caracteres",
			},
			password: {
				required: "Ingresa una contraseña",
				minlength: "Las contraseñas seguras tienen 5 caracteres o más",
			},
		},
		errorPlacement: function (label, element) {
			label.addClass("invalid-feedback");
			label.insertAfter(element);
		},
		success: function (label, element) {
			label.addClass("valid-feedback");
			label.insertAfter(element);
		},
		highlight: function (element) {
			$(element).addClass("is-invalid").removeClass("is-valid");
		},
		unhighlight: function (element) {
			$(element).addClass("is-valid").removeClass("is-invalid");
		},
		submitHandler: function () {
			$("button").prop("disabled", false);
			$(".form-group").removeClass("has-error");
			$(".help-block").remove();
			var formData = {
				username: $("#username").val(),
				password: $("#password").val(),
				remember: $("input#remember").prop("checked"),
			};
			$.ajax({
				type: "POST",
				url: "./src/login.php",
				data: formData,
				dataType: "json",
				encode: true,
				beforeSend: function () {
					//aqui usas el id de tus elementos para bloquearlos antes de hacer submit
					$("#login").attr("class", "disabled").attr("disabled", "disabled");
					$("body").attr("style", "cursor:wait");
					$("#loginForm").css("opacity", ".5");
				},
				success: function (data) {
					//luego de los resultados vuelve los elementos a su estado normal
					$("#login").attr("class", "btn btn-primary").removeAttr("disabled");
					$("body").attr("style", "cursor:default");
					$("#loginForm").css("opacity", "");
				},
			})
				.done(function (data) {
                    console.log(data);
					if (data.success == false) {
						document.getElementById("title-error").innerText = "Error";
						if (data.errors.username) {
							document.getElementById("msg-error").innerText = "El usuario es incorrecto";
						}
						if (data.errors.password) {
							document.getElementById("msg-error").innerText = "La contraseña es incorrecta.";
							$("#password").addClass("is-invalid").removeClass("is-valid");
						}
						$("#modal-error").modal("show");
					} else {
						document.getElementById("title-good").innerText = "Inicio de sesión";
						document.getElementById("msg-good").innerHTML = "Bienvenido <p>Te estamos reedireccionando</p>";
						$("#modal-good").modal("show");
						$("#login").attr("class", "disabled").attr("disabled", "disabled");
						$("body").attr("style", "cursor:wait");
						setTimeout(() => {
							window.location.href = "./index.html";
						}, 1500);
					}
				})
				.fail(function (data) {
					$("error-msg").html('<div class="alert alert-danger">Could not reach server, please try again later.</div>');
				});

		},
	});
});
