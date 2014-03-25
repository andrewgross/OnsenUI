(function(){
	'use strict';

	// for initialization hook.
	if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
		document.write('<ons-dummy-for-init></ons-dummy-for-init>');
	} else {
		var dom = document.createElement('ons-dummy-for-init');
		document.body.appendChild(dom);
	}

	angular.module('onsen.directives').run(function($compile, $rootScope) {
		ons.$compile = $compile;
		$rootScope.$on('$ons-ready', function() {
			ons.isReady = function() {
				return true;
			};
		});
	});

	// JS Global facade for Onsen UI.
	var ons = window.ons = {
		/**
		 * @return {Boolean}
		 */
		isReady : function() {
			return false;
		},

		/**
		 * @param {HTMLElement} dom
		 */
		compile : function(dom) {
			if (!ons.$compile) {
				throw new Error('ons.$compile() is not ready. Wait for initialization.');
			}

			if (!(dom instanceof HTMLElement)) {
				throw new Error('First argument must be an instance of HTMLElement.');
			}
			var scope = angular.element(dom).scope();
			if (!scope) {
				throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
			}
			ons.$compile(dom)(scope);
		},

		/**
		 * @param {Function} callback
		 */
		ready : function(callback) {
			if (ons.isReady()) {
				callback();
			} else {
				angular.module('onsen.directives').run(function($rootScope) {
					$rootScope.$on('$ons-ready', callback);
				});
			}
		}
	};

})();