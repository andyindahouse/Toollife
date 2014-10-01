/**
*  Module
*
* Description
*/

var baseUrl = 'http://localhost:8080/';

angular.module('auth-services', [])

	.factory('Auth', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
		var user=null;
		console.log('Auth ejecutandose...')
		return {

			// AUTH SERVICES

			createUser: function(formData){

				var json = { local: formData
				};

				console.log(json);

				var deferred = $q.defer();				

				$http.post(baseUrl + 'auth/users', json)
				
					.success(function(res){
						console.log('signup services success...');
						user = res;
						window.localStorage.setItem('user', JSON.stringify(res));						
						console.log('signup services success...FINAL');
						console.log(res);						
						return deferred.resolve(res);
					})
					.error(function(err){
						console.log('signup services error...');
						console.log(err);
						return err;
					})
				console.log('final signup...')
				return deferred.promise;								
			},			

			login: function(formData){
				var deferred = $q.defer();				

				$http.post(baseUrl + 'auth/session', formData)
				
					.success(function(res){
						console.log('login services success...');
						user = res;
						window.localStorage.setItem('user', JSON.stringify(res));						
						console.log('login services success...FINAL');
						console.log(res);						
						return deferred.resolve(res);
					})
					.error(function(err){
						console.log('login services error...');
						console.log(err);
						return err;
					})
				console.log('final login...')
				return deferred.promise;			
			},

			logout: function(){
				user = null;
				window.localStorage.removeItem('user');
			},


			// SESSION SERVICES


			updateUser: function(userUp){

				//user = userUp;				
				return $http.get(baseUrl + 'auth/session')

					.success(function(userup){
						console.log('user actualizado');
						user = userup;
						console.log(user);
					})

					.error(function(err){
						console.log('user no -actualizado: ' + err);
					})

			},
						
			currentUser: function(){
				return user;
			},

			// USER SERVICES
			
			createEvent: function(formData){

				return $http.post(baseUrl + 'auth/events', formData);

				/*
				var deferred = $q.defer();				

				console.log(formData);

				$http.put(baseUrl + 'auth/events', formData)

					.success(function(res){
						console.log('createEvent services success...');						
						console.log('createEvent services success...FINAL');
						console.log(res);						
						return deferred.resolve(res);
					})
					.error(function(err){
						console.log('createEvent services error...');
						console.log(err);
						return err;
					})
				console.log('final createEvent...')
				return deferred.promise;*/
			},

			addMembers: function(data){
				return $http.put(baseUrl + 'auth/event/addmember', data);
			},

			getEvent: function(id){
				return $http.get(baseUrl + 'auth/event/'+ id);
			},

			getEvents: function(id){
				var deferred = $q.defer();

				$http.get(baseUrl + 'auth/events/'+ id)

					.success(function(res){
						console.log('getEvent services success...');						
						console.log(res);						
						return deferred.resolve(res);
					})
					.error(function(err){
						console.log('getEvent services error...');
						console.log(err);
						return err;
					})
				console.log('final createEvent...')
				return deferred.promise;
			},

			findByKey: function(key){
				return $http.get(baseUrl + 'search/users/'+ key);
			},

			getProfile: function(id){
				return $http.get(baseUrl + 'search/users/profile/'+ id);
			},

			addContact: function(adduser){				
				console.log(adduser);

				return $http.put(baseUrl + 'search/users/adduser/', adduser)

			}


		};
	}]);