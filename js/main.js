plugins.started(function() {
require([
	"plugins/interact-registry-frontend-app/js/content",
	"plugins/interact-registry-frontend-app/js/header",
	"backbone.differ"
], function(ContentView, HeaderView) {

	var MainView = Backbone.DiffView.extend({

		className: "main",
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
			this.header = new HeaderView({
				parent: this
			});
			this.content = new ContentView({
				parent: this
			});
			this.$el.append(this.header.$el);
			this.$el.append(this.content.$el);
		}


	}, {
		template: "main"
	});


	window.app = {
		main: (new MainView({}))
	};

	$("body").append(app.main.$el);

});
});