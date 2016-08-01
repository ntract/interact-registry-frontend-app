define([
	"plugins/ntract-registry-frontend-app/js/search",
	"backbone.differ"
], function(SearchView) {

	var HeaderView = Backbone.DiffView.extend({

		className: "header",
		attributes: {
			"view-container": true
		},

		postInitialize: function(options) {
			this.render();
		},

		postRender: function(isFirstRender) {
			if (!isFirstRender) return;

			this.addChildren();
		},

		addChildren: function() {
			this.search = new SearchView({
				parent: this
			});
			this.$el.append(this.search.$el);
		}


	}, {
		template: "header"
	});

	return HeaderView;

});