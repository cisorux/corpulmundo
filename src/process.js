document.addEventListener("DOMContentLoaded", function () {
	const now = new Date(Date.now());
	const day = now.getDate();
	const month = now.getMonth() + 1;
	const year = now.getFullYear();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const fecha = day + "/" + month + "/" + year;
	const hora = hours + ":" + minutes + ":" + seconds;

	// Llamar a la función para realizar la solicitud Ajax y obtener el resultado
	queryUser()
		.then(function (data) {
			// Aquí puedes manejar el resultado de la solicitud Ajax, si es necesario

			// Llamar a la función para ejecutar el código según el estado de solvencia
			if (data.success) {
				document.getElementById("pageLoading").setAttribute("hidden", "");
				let table = $("#lista").DataTable({
					language: {
						decimal: "",
						emptyTable: "No hay información para esta tabla",
						info: "Mostrando _START_ a _END_ de _TOTAL_ asociados",
						infoEmpty: "Mostrando 0 asociados",
						infoFiltered: "(filtrado de _MAX_ asociados)",
						infoPostFix: "",
						thousands: ",",
						lengthMenu: "Mostrar _MENU_",
						loadingRecords: "Cargando...",
						processing: "",
						search: "Buscar:",
						zeroRecords: "No se han encontrado coincidencias",
						paginate: {
							first: "Primero",
							last: "Ultimo",
							next: "Siguiente",
							previous: "Anterior",
						},
						aria: {
							sortAscending: ": activate to sort column ascending",
							sortDescending: ": activate to sort column descending",
						},
						select: {
							rows: {
								_: "%d asociados seleccionados",
								0: "",
								1: "%d asociado seleccionado",
							},
						},
						buttons: {
							colvis: "Columnas",
							colvisRestore: "Por defecto",
						},
					},
					lengthMenu: [
						[10, 20, 40, 50, 100, -1],
						["10 registros", "20 registros", "40 registros", "50 registros", "100 registros", "Todo"],
					],
					dom: "Blfrtip",
					ordering: true,
					ajax: {
						url: "./src/getList.php",
						dataSrc: "",
					},
					columns: [
						{ data: "id" },
						{ data: "apellidos" },
						{ data: "nombres" },
						{ data: "identificacion" },
						{ data: "contacto" },
						{ data: "estado" },
						{
							data: "id",
							render: function (data, type) {
								// La función de renderizado puede aplicar lógica personalizada según el 'type'
								if (type === "display") {
									// Por ejemplo, aquí podrías retornar un enlace o botón basado en el 'data'
									return '<button class="badge bg-red" name="delAsoc" ondblclick="delAsoc(' + data + ')">Borrar</button><button class="badge bg-green" name="novAsoc" onclick="addNov(' + data + ')" data-bs-toggle="modal" data-bs-target="#modal-addNovelty">Novedad</button>';
								}
								// Para otros tipos de datos (sorting, filtering, etc.), mantén el valor original
								return data;
							},
						},
					],
					buttons: [
						{
							extend: "collection",
							text: "Opciones",
							buttons: [
								{
									extend: "excel",
									filename: "Corpulmundo " + fecha + "-" + hora,
									text: "Exportar a Excel",
								},
								{
									extend: "pdfHtml5",
									filename: "Corpulmundo " + fecha + "-" + hora,
									text: "Exportar a PDF",
									orientation: "landscape",
									pageSize: "LEGAL",
								},
							],
						},
					],
					paging: true,
					scrollX: true,
					pagingType: "numbers",
					processing: true,
					select: {
						style: "multi",
					},
					order: [0, "ASC"],
				});
			} else {
				console.log("no se ha encontrado la sesión, al parecer.");
			}
		})
		.catch(function (error) {
			// Aquí puedes manejar los errores de la solicitud Ajax, si es necesario
			console.log("Error en la solicitud Ajax:", error);

			// Llamar a la función para ejecutar el código según el estado de solvencia
		});

	// add contract
	$("#addAsoc").validate({
		rules: {
			apellidos: {
				required: true,
			},
			nombres: {
				required: true,
			},
			identificacion: {
				required: true,
			},
			contacto: {
				required: true,
			},
			fecha: {
				required: true,
			},
		},
		errorPlacement: function (label, element) {
			label.addClass("invalid-feedback");
		},
		highlight: function (element) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function (element) {
			$(element).removeClass("is-invalid");
		},
		submitHandler: function () {
			let formData = {
				apellidos: $("#apellidos").val(),
				nombres: $("#nombres").val(),
				identificacion: $("#identificacion").val(),
				contacto: $("#contacto").val(),
				fecha: $("#fecha").val(),
			};
			$.ajax({
				type: "POST",
				url: "./src/addAsoc.php",
				data: formData,
				dataType: "json",
				encode: true,
				beforeSend: function () {
					$("#register").attr("class", "disabled").attr("disabled", "disabled");
					$("body").attr("style", "cursor:wait");
					$("#registerForm").css("opacity", ".5");
				},
				success: function (data) {
					$("#register").attr("class", "btn btn-primary").removeAttr("disabled");
					$("body").attr("style", "cursor:default");
					$("#registerForm").css("opacity", "");
				},
			})
				.done(function (data) {
					if (data.success == false) {
						document.getElementById("title-error").innerText = "Ha ocurrido un error";
						document.getElementById("msg-error").innerText = data.errors.error;
						$("#modal-error").modal("show");
					} else {
						document.getElementById("title-good").innerText = "Nuevo asociado añadido";
						document.getElementById("msg-good").innerHTML = "Todo ha salido bien, el nuevo asociado aparecerá en la lista.";
						$("#modal-good").modal("show");
						setTimeout(() => {
							window.location.href = "./";
						}, 1500);
					}
				})
				.fail(function (jqXHR, textStatus, errorThrown) {
					document.getElementById("title-error").innerText = "Ha ocurrido un error";
					if (jqXHR.status === 0) {
						document.getElementById("msg-error").innerHTML = "Not connect: Verify Network.";
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
				});
		},
	});

	// Selecciona el grupo de radio con el nombre "color"
	let tipo = document.getElementsByName("tipo");
	console.log(tipo);

	// Itera sobre los elementos del grupo
	let tipoVal;
	for (const element of tipo) {
		if (element.checked) {
			tipoVal = element.value;
			break;
		}
	}
	for (const element of tipo) {
		element.addEventListener("change", function () {
			if (element.value == "EXPULSIÓN") {
				document.getElementById("expulsionObs").removeAttribute("hidden");
				document.getElementById("ubicacionObs").setAttribute("hidden", "");
				document.getElementById("anexoObs").setAttribute("hidden", "");
			} else if (element.value == "UBICACIÓN") {
				document.getElementById("expulsionObs").setAttribute("hidden", "");
				document.getElementById("ubicacionObs").removeAttribute("hidden");
				document.getElementById("anexoObs").setAttribute("hidden", "");
			} else if (element.value == "ANEXO") {
				document.getElementById("expulsionObs").setAttribute("hidden", "");
				document.getElementById("anexoObs").removeAttribute("hidden");
				document.getElementById("ubicacionObs").setAttribute("hidden", "");
			}
		});
	}
});
let contractTemp = [];
function addNov(idAsoc) {
	console.log(idAsoc);
}

function delAsoc(idAsoc){
	
}
