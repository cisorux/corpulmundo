var queries = setInterval(queryUser, 10000);
var solvencia = null; // Variable para guardar el estado de solvencia
// set a online status, last conection, permissions, selectedIPS,
function queryUser() {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: "./src/globalFunctions/query.php",
			dataType: "json",
			encode: true,
		})
			.done(function (data) {
				solvencia = data.success;
				// Obtener el valor almacenado en el localStorage
				const storedSuccess = localStorage.getItem("success");
				if (solvencia == false) {
					$(".modal").hide();
					clearInterval(queries);
					$("#modal-error").modal({
						show: true,
						keyboard: false,
						backdrop: "static",
					});
					document.getElementById("title-error").innerText = "Sesión interrumpida";
					document.getElementById("msg-error").innerHTML = data.errors.error;
					$("#modal-error").modal("show");
					setTimeout(() => {
						window.location.href = "sign-in.html";
					}, 1500);
					if (storedSuccess === 'success') {
                        localStorage.setItem('success', 'error');
                    }
				} else if (data.message) {
					document.getElementById("title-good").innerText = "Algo ha cambiado...";
					document.getElementById("msg-good").innerText = data.message;
					$("#modal-good").modal("show");
					setTimeout(() => {
						location.reload();
					}, 1500);
					if (storedSuccess === 'error') {
                        localStorage.setItem('success', 'success');
                    }
				}
				resolve(data);
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				document.getElementById("title-error").innerText = "Ha ocurrido un error";

				if (jqXHR.status === 0) {
					document.getElementById("msg-error").innerHTML = "Sin conexión: Verifica la red.";
				} else if (jqXHR.status == 404) {
					document.getElementById("msg-error").innerHTML = "Requested page not found [404]";
				} else if (jqXHR.status == 500) {
					document.getElementById("msg-error").innerHTML = "Internal Server Error [500].";
				} else if (textStatus === "parsererror") {
					document.getElementById("msg-error").innerHTML = "Requested JSON parse failed.";
				} else if (textStatus === "timeout") {
					document.getElementById("msg-error").innerHTML = "Time out error.";
				} else if (textStatus === "abort") {
					document.getElementById("msg-error").innerHTML = "Ajax request aborted.";
				} else {
					document.getElementById("msg-error").innerHTML = "Uncaught Error: " + jqXHR.responseText;
				}
				$("#modal-error").modal("show");
				reject(errorThrown);
			});
	});
}

document.addEventListener("DOMContentLoaded", function () {
	// Llamar a la función para realizar la solicitud Ajax y obtener el resultado
	queryUser()
		.then(function (data) {
			// Aquí puedes manejar el resultado de la solicitud Ajax, si es necesario
			console.log("Resultado de la solicitud Ajax:", data);
			if (data.success) {
				document.getElementById("pageLoading").setAttribute("hidden", "");

			} else {
				console.log("no se ha encontrado la sesión, al parecer.");
			}
			// Llamar a la función para ejecutar el código según el estado de solvencia
		})
		.catch(function (error) {
			// Aquí puedes manejar los errores de la solicitud Ajax, si es necesario
			console.log("Error en la solicitud Ajax:", error);

			// Llamar a la función para ejecutar el código según el estado de solvencia
		});
});
