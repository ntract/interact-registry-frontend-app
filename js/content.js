define(["backbone.differ"], function() {

	function escapeRegExp(text) {
	  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	}

	var ContentView = Backbone.DiffView.extend({

		className: "content",

		_packages: null,
		_currentSearchValue: "",

		postInitialize: function(options) {

			

			this.startUpdatePackageListener();

			this.listenTo(app, "search:change", this.onSearchChange);

			this.render();
		},

		startUpdatePackageListener: function() {

			_.bindAll(this, "updatePackages");
			this._intervalHandler = setInterval(this.updatePackages, 60000);
			this.updatePackages();
			
		},

		updatePackages: function() {
			
			$.get("/packages", _.bind(function(state, status, data) {

				this._packages = data.responseJSON;
				this.onSearchChange(this._currentSearchValue);

			}, this));

		},

		onSearchChange: function(value) {

			if (!this._packages) return;

			this._currentSearchValue = value;

			var reg = new RegExp(escapeRegExp(value), "i");

			var results = _.filter(this._packages, function(item) {

				return reg.test(item.name) || reg.test(item.url) || reg.test(item.hits+"");

			});

			results.sort(function(a,b) {
				return b.hits - a.hits;
			});

			this.renderResults(results);

		},

		renderResults: function(results) {

			this.model = this.model || {
				view: this
			};
			this.model.results = results;
			this.render();

		},

		getPageURL: function(url) {
			var reg = /\.git/g;
			return url.replace(reg, "");
		},

		remove: function() {

			clearInterval(this._intervalHandler);

			ContentView.prototype.remove.apply(this, arguments);
		}


	}, {
		template: "content"
	});

	return ContentView;

});
