define(function () {

	'use strict';

	var facebookLike = {},
		likeContainer = $('#js-facebook-like-box');

	facebookLike = {

		init : function () {

			facebookLike.loadLikeBox();

		},

		loadLikeBox : function () {

			likeContainer.html('<div class="fb-page" data-href="https://www.facebook.com/opendata4dev" data-width="300" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/opendata4dev"><a href="https://www.facebook.com/opendata4dev">opendata4dev</a></blockquote></div></div>')

		}

	};

	if (likeContainer.length) {

		facebookLike.init();

	}

});