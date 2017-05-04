define(["backbone.differ"], function() {

	var SearchView = Backbone.DiffView.extend({

		className: "search",

		events: {
			"keyup input[type=search]": "onSearch"
		},

		postInitialize: function(options) {
			this.render();
		},

		onSearch: function(event) {

			var $input = $(event.currentTarget);
			var searchValue = $input.val();

			app.trigger("search:change", searchValue);

		}

	}, {
		template: "search"
	});

	return SearchView;

});