define(['acessibleMenu', 'trap'], function () {

	'use strict';

	var navigation = {},
		navigationContainer = $('#js-navigation'),
		navigationButton = $('#js-navigation-toogler'),
		documentHooks = $('html, body'),
		options = {
			menuIsOpen: false
		},
		screenSize = document.documentElement.clientWidth || window.innerWidth,
		isSmallScreen = screenSize <= 1024 ? true : false;

	navigation = {

		init: function () {

			if (isSmallScreen) {

				navigation.bindEvents();

			} else {

				navigation.loadAcessibleNavigation();

			}

		},

		loadAcessibleNavigation: function () {

			navigationContainer.accessibleMegaMenu({
				openClass: "is-open"
			});

		},

		bindEvents: function () {

			navigationButton.on('click', function () {

				navigation.verifyMenuButton();

			});

			//Closes the menu window with the keyboard 'escape' key
	        $(document).keyup(function (evt) {

	            if (evt.keyCode === 27 && options.menuIsOpen) {

	                navigation.closeMenu();

	            }

	        });

	        navigationContainer.on('click', '.navigation-list__anchor', function (evt) {

				var _this = $(this);

				if (!_this.data('external')) {

                    evt.preventDefault();

                }

	        	navigation.expandMenuItens(_this);


	        });

		},

		verifyMenuButton: function () {

			if (options.menuIsOpen) {

				navigation.closeMenu();

			} else {

				navigation.openMenu();

			}

		},

		closeMenu: function () {

			navigationButton.removeClass('is-open');
			navigationContainer.removeClass('is-open');

			options.menuIsOpen = false;

			$(document.body).off('click.openMenu');

			//Change the expanded aria attribute
			navigationButton.attr('aria-expanded', 'false');

            //Get the focus back to the menu button
            navigationButton.focus();

		},

		openMenu: function () {

			navigationButton.addClass('is-open');
			navigationContainer.addClass('is-open');

			options.menuIsOpen = true;

			//Change the expanded aria attribute
			navigationButton.attr('aria-expanded', 'true');

			//Trap the focus inside de list the anchor
			navigationContainer.trap();

			//Bind an event to close the menu when the user clicks outside of it
			navigation.outsideClickCloseMenu();

		},

		expandMenuItens: function (selectedMenuItem) {

			selectedMenuItem.toggleClass('is-expanded');

			selectedMenuItem.next('.navigation-sub-list:first').toggleClass('is-expanded');

		},

        outsideClickCloseMenu : function () {

            //We need the setTimeout to bind the event to body after the transitions and DOM manipulation
            setTimeout(function () {

                $(document.body).on('click.openMenu', function (evt) {

                    if ($(evt.target).is(navigationContainer) && options.menuIsOpen) {

                        navigation.closeMenu();

                    }

                });

            }, 0);

        }

	};

	if (navigationContainer.length) {

		navigation.init();

	}

});