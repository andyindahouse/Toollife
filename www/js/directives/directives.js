

/**
*  Module
*
* Description
*/
angular.module('directives', [])

	.directive('counter', ['', function(){
		// Runs during compile 
		//	template: "<button class="button button-block button-stable" ng-click="addContact()" value='Agregar como contacto'/>",			

		return {
			restrict: E,			
			template: "<h1>{{counter2}}</h1>"
		};
	}]);