define( function () {

	'use strict';

	var cards = {},
		cardsContainer = $('.article-cards__list');

	cards = {

		init: function () {

			cards.bindEvents();

		},

		bindEvents: function () {

			cardsContainer.on('click', '.article-cards__connections-toggler', function () {

				cards.toggleCard($(this));

			});

		},

		toggleCard: function (card) {

			card.parent('.article-cards__card:first').toggleClass('is-flipped');

		}

	};


	if (cardsContainer.length) {
		cards.init();
	}


});