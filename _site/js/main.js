/*global $, require, FastClick*/
(function () {

	'use strict';

    var PUBLIC = {},
        PRIVATE = {},
        currentLanguage = $('body').data('language'),
        facebookURL = 'http://connect.facebook.net/' + currentLanguage + '/all.js#xfbml=1&version=v2.0';

        //Get's the current window size
        window.screenSize = document.documentElement.clientWidth || window.innerWidth;
        window.isSmallScreen = window.screenSize <= 1024 ? true : false;
        window.isMobileScreen = window.screenSize < 768 ? true : false;

    PRIVATE.init = function () {

        //configure our requireJS paths
        window.configRequirePaths = function () {

            require.config({
                paths: {
                    'acessibleMenu': 'plugins/jquery-accessibleMegaMenu',
                    'trap': 'plugins/trap',
                    'twitterFetcher': 'plugins/twitterFetcher',
                    'salvattore': 'plugins/salvattore',
                    'salvattore': 'plugins/salvattore',
                    'pinterest': '//assets.pinterest.com/js/pinit',
                    'chartJS': 'plugins/chart.min',
                    'postCharts': 'modules/post-charts',
                    'skipLinks': 'modules/skip-links',
                    'navigation': 'modules/navigation',
                    'cards': 'modules/cards',
                    'facebookLikeBox': 'modules/facebook-like-box',
                    'linkedDataToggler': 'modules/linked-data-toggler',
                    'aboutPlatform': 'modules/about-platform',
                    'twitterList': 'modules/twitter-list',
                    'pinterestBoard': 'modules/pinterest-board',
                    'listCardExhibition': 'modules/list-card-exhibition',
                    'listDonutChart': 'modules/list-donut-chart',
                }
            });

        };

        PUBLIC.init();

    };

	PUBLIC.init = function () {

        window.configRequirePaths();

        PUBLIC.skipLinks();

        PUBLIC.navigation();

        PUBLIC.aboutPlatform();

        PUBLIC.cards();

        PUBLIC.linkedDataToggler();

        PUBLIC.listCardExhibition();

        PUBLIC.listDonutChart();

        PUBLIC.postCharts();

        //We only call social media on bigger screens
        if (!isMobileScreen) {
            PUBLIC.facebookLikeBox();

            PUBLIC.twitterList();

            PUBLIC.pinterestBoard();
        }

	};

    PUBLIC.skipLinks = function () {

        var skipLinksContainer = document.getElementById('js-skip-links');

        if (skipLinksContainer) {

            require(['skipLinks']);

        }

    };

    PUBLIC.navigation = function () {

        var navigationContainer = document.getElementById('js-navigation');

        if (navigationContainer) {

            require(['navigation']);

        }

    };

    PUBLIC.aboutPlatform = function () {

        var conceptsContainer = document.getElementById('js-about-platform');

        if (conceptsContainer) {
            require(['aboutPlatform']);
        }

    };

    PUBLIC.cards = function () {

        var cardsContainer = $('.article-cards__card:first');

        if (cardsContainer.length) {
            require(['cards', 'salvattore']);
        }

    };

    PUBLIC.linkedDataToggler = function () {

        var linkedDataTogglerContainer = document.getElementById('js-linked-data-toggler__toggler');

        if (linkedDataTogglerContainer) {
            require(['linkedDataToggler'])
        }

    };

    PUBLIC.facebookLikeBox = function () {

        var facebookLikeContainer = document.getElementById('js-facebook-like-box')

        if (facebookLikeContainer) {
            require([facebookURL, 'facebookLikeBox']);
        }

    };

    PUBLIC.twitterList = function () {

        var twitterListContainer = document.getElementById('js-twitter-list');

        if (twitterListContainer) {

            require(['twitterList']);

        }

    };

    PUBLIC.pinterestBoard = function () {

        var pinterestContainer = document.getElementById('js-pinterest-board');

        if (pinterestContainer) {

            require(['pinterestBoard']);

        }

    };

    PUBLIC.listCardExhibition = function () {

        var listCardExhibitionContainer = document.getElementById('js-list-card-exhibition');

        if (listCardExhibitionContainer) {

            require(['listCardExhibition']);

        }

    };

    PUBLIC.listDonutChart = function () {

        var donutChartContainer = $('.donut-chart:first');

        if (donutChartContainer.length) {

            require(['listDonutChart']);

        }

    };

    PUBLIC.postCharts = function () {

        var postChartsContainer = $('.line-chart-container:first');

        if (postChartsContainer.length) {
            require(['postCharts']);
        }

    }

    return PRIVATE.init();

})();