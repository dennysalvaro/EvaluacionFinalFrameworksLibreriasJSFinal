//punto 1  “Match Game” debe cambiar de color indefinidamente
function TituloColor(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				TituloColor('h1.main-titulo');
			},
			queue: true
		});
}


// Punto 2. Se deben generar los dulces aleatoriamente en el tablero, llenándolo todo al principio del juego.
function conseguirAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// obtener filas o columnas de dulces
function darArregloCaramelo(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var ColumnasCaramelos = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return ColumnasCaramelos;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}

// arreglos de filas
function filasCaramelos(index) {
	var candyRow = darArregloCaramelo('rows', index);
	return candyRow;
}

// arreglos de colunmnas
function ColumnasCaramelos(index) {
	var candyColumn = darArregloCaramelo('columns');
	return candyColumn[index];
}

//Punto3. Verificar si hay como mínimo tres dulces del mismo tipo en línea: deben desaparecer
function validacionColumna() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var posicionCaramelo = [];
		var extraPosicionCaramelo = [];
		var candyColumn = ColumnasCaramelos(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (posicionCaramelo.length >= 3) {
					gap = true;
				} else {
					posicionCaramelo = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionCaramelo.push(i - 1);
					} else {
						extraPosicionCaramelo.push(i - 1);
					}
				}
				if (!gap) {
					posicionCaramelo.push(i);
				} else {
					extraPosicionCaramelo.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraPosicionCaramelo.length > 2) {
			posicionCaramelo = $.merge(posicionCaramelo, extraPosicionCaramelo);
		}
		if (posicionCaramelo.length <= 2) {
			posicionCaramelo = [];
		}
		candyCount = posicionCaramelo.length;
		if (candyCount >= 3) {
			deleteColumnCandy(posicionCaramelo, candyColumn);
			setScore(candyCount);
		}
	}
}
function deleteColumnCandy(posicionCaramelo, candyColumn) {
	for (var i = 0; i < posicionCaramelo.length; i++) {
		candyColumn.eq(posicionCaramelo[i]).addClass('delete');
	}
}

//Verificar si hay como mínimo tres dulces en la fila
function validacionColumna() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var posicionCaramelo = [];
		var extraPosicionCaramelo = [];
		var candyRow = filasCaramelos(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (posicionCaramelo.length >= 3) {
					gap = true;
				} else {
					posicionCaramelo = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						posicionCaramelo.push(i - 1);
					} else {
						extraPosicionCaramelo.push(i - 1);
					}
				}
				if (!gap) {
					posicionCaramelo.push(i);
				} else {
					extraPosicionCaramelo.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraPosicionCaramelo.length > 2) {
			posicionCaramelo = $.merge(posicionCaramelo, extraPosicionCaramelo);
		}
		if (posicionCaramelo.length <= 2) {
			posicionCaramelo = [];
		}
		candyCount = posicionCaramelo.length;
		if (candyCount >= 3) {
			deleteHorizontal(posicionCaramelo, candyRow);
			setScore(candyCount);
		}
	}
}
function deleteHorizontal(posicionCaramelo, candyRow) {
	for (var i = 0; i < posicionCaramelo.length; i++) {
		candyRow[posicionCaramelo[i]].addClass('delete');
	}
}

//contador para mostrar puntuacion
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

//colocar los elementos caramelo en el tablero
function revisarTablero() {
	llenarTablero();
}

function llenarTablero() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = conseguirAleatorio(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}

// Por si hay dulces por borrar
function setValidations() {
	validacionColumna();
	validacionColumna();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		animacionBorrarCaramelo();
	}
}

//punto 7. La interacción del usuario con el elemento dulce debe ser de drag & drop.
//Hacer los movimientos entre caramelos
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}


//para que cuando se mueva el caramelo sea solido
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

//cuando se mueve el carmelo, los reemplaza
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		revisarTablero();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			ActualizarMovimiento();
		}
	}, 500);

}
function revisarTableroPromise(result) {
	if (result) {
		revisarTablero();
	}
}
//puntuación por cantidad de elementos en linea
function ActualizarMovimiento() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

//delete de los elementos por default
function animacionBorrarCaramelo() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				borrarCaramelo()
					.then(revisarTableroPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

//para llenar los espacios con elementos
function showPromiseError(error) {
	console.log(error);
}

function borrarCaramelo() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}


//punto 4 y 6. Boton reiniciar y temporizador
//cambie mediante animaciones el aspecto de la página eliminando el tablero de juego
// boton cambie Iniciar / reiniciar - final del Juego
function finJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');

}

// Cuando inicia el juego
function iniciarJuego() {

	TituloColor('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		revisarTablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finJuego
		})
	});
}

// Prepara el juego
$(function() {
	iniciarJuego();
});
