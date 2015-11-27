define( function () {

	'use strict';

	var linkedData = {},
		vocabulary = {
			'on': 'on',
			'off': 'off'
		},
		cardListContainer = $('#js-article-cards__list'),
		linkedDataContainer = $('#js-linked-data-toggler__toggler'),
		linkedDataText = linkedDataContainer.find('.linked-data-toggler__toggler-text:first');

	linkedData = {

		init: function () {

			linkedData.bindEvents();

		},

		bindEvents: function () {

			linkedDataContainer.on('click', function () {

				linkedData.verifyStatus($(this));

			});

		},

		verifyStatus: function (data) {

			if (data.attr('data-linked-data-on') === 'true') {

				linkedData.unloadLinkedData(data);

				linkedDataText.text(vocabulary.off);

				data.attr('data-linked-data-on', false);

			} else {

				linkedData.loadLinkedData(data);

				linkedDataText.text(vocabulary.on);

				data.attr('data-linked-data-on', true);

			}

			linkedData.toggleData(data);

		},

		toggleData: function (data) {

			data.toggleClass('is-active');

		},

		unloadLinkedData: function () {

			$.ajax({
				url : 'js/ajax/linked-news.html',
				success : function (res) {

					cardListContainer.html(res);

				}

			});

		},

		loadLinkedData: function () {

			$.ajax({
				url : 'js/ajax/linked-data.html',
				success : function (res) {

					cardListContainer.html(res);

				}

			});

		}

	};

	if (linkedDataContainer.length) {

		linkedData.init();

	}

});