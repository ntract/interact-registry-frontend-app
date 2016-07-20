define(["backbone.differ"], function() {

	var SearchView = Backbone.DiffView.extend({

		className: "search",

		postInitialize: function(options) {
			this.render();
		}


	}, {
		template: "search"
	});

	return SearchView;

});