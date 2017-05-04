require([
	"plugins/ntract-registry-frontend-app/js/content",
	"plugins/ntract-registry-frontend-app/js/header",
	"backbone.differ",
	"backbone.controller"
], function(ContentView, HeaderView) {

	plugins.started(function() {
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


		var App = Backbone.Controller.extend({

			initialize: function() {

				this.main = new MainView({});
				$("body").append(this.main.$el);
				
			}

		});

		window.app = new App();

		

	});
});