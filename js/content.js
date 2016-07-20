define(["backbone.differ"], function() {

	var ContentView = Backbone.DiffView.extend({

		className: "content",

		postInitialize: function(options) {
			this.render();
		}


	}, {
		template: "content"
	});

	return ContentView;

});
