
// MODULE AUTH

angular.module('toollife')

  .factory('Auth', ['$http', function($http){
    return {

      login: function(formData){
        return $http.post('http://192.168.1.1:8080/auth/session', formData);
      }

    }
    
  }]);