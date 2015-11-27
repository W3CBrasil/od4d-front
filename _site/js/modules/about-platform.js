define( function () {

	'use strict';

	var concepts = {},
		conceptsContainer = $('#js-about-platform');

	concepts = {

		init: function () {

			//First we need to see if the user already canceled the concepts section
			concepts.verifyVisibility();

		},

		verifyVisibility: function () {

			//Aqui ele vai ver no localstorage se o cara já deletou o módulo
			concepts.bindEvents();

		},

		bindEvents: function () {

			conceptsContainer.on('click', '.about-platform__close:first', function () {

				var _this = $(this);

				concepts.closeConcepts(_this);

			});

		},

		closeConcepts: function () {

			//Aqui deleta o esquema do localstorage

			console.log('vou deletar');

		}

	}

	if (conceptsContainer.length) {
		concepts.init();
	}

});