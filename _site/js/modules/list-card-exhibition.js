define( function () {

	var listCards = {},
		listCardsExhibitionContainer = $('#js-list-card-exhibition'),
		listCardWrapper = $('#js-list-card-wrapper'),
		options = {};

	listCards = {

		init: function () {

			//We need to find wich view is selected first
			listCards.findCurrentView();

			listCards.bindEvents();

		},

		findCurrentView: function () {

			listCardsExhibitionContainer.find('button').each(function () {

				if ($(this).attr('disabled')) {

					options.currentViewButton = $(this);

				}

			});

			//If we don't have any button disabled, we will disable the first one
			if (options.currentViewButton === undefined) {

				options.currentViewButton = listCardsExhibitionContainer.find('button:first');
				options.currentViewButton.prop('disabled', true);

			}

			//Add the view data do the list wrapper
			listCards.changeListView();

		},

		bindEvents: function () {

			listCardsExhibitionContainer.on('click', 'button', function () {

				listCards.toggleView($(this))

			});

		},

		toggleView: function (selectedButton) {

			//Re-enable the current disabled button
			options.currentViewButton.prop('disabled', false);

			//The current button is now the selected one
			options.currentViewButton = selectedButton;

			//Add the view data do the list wrapper
			listCards.changeListView();

			//Generates a new tabindex for keyboard navigation
			listCardWrapper.attr('tabindex', -1).focus();

		},

		changeListView: function () {

			listCardWrapper.attr('data-list-current-view', options.currentViewButton.data('list-view'));

			options.currentViewButton.prop('disabled', true);

		}

	}

	if (listCardsExhibitionContainer.length) {

		listCards.init();

	}

});