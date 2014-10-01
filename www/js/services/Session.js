
// MODULE SESSION

angular.module('auth-services')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });