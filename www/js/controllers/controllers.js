angular.module('auth-controllers', [])

	// AUTH CONTROLLERS

	.controller('LoginCtrl',['$scope', '$state','Auth', function($scope, $state, Auth){

		console.log('LoginCtrl ejecutandose...');
		$scope.formData = {email: '', password: ''};

		$scope.login = function(formData){

			console.log('función login ejecutandose...');

			Auth.login(formData).then(function(data, err, other){
				console.log(data);
				if(data)
					$state.go('tab.profile');
				else
					console.log('EERRORORORORORORORO');
			}).finally(function(data){
				console.log('finally');

			});
		};
		
	}])

	.controller('SignupCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
			
		console.log('SignupCtrl ejecutandose...');

		$scope.createUser = function(formData){
			console.log('funcion createUser ejecutandose...');

			Auth.createUser(formData).then(function(data){
				console.log(data);
				if(data)
					$state.go('tab.profile');
				else
					console.log('EERRORORORORORORORO');
			});

		}


	}])

	// APP CONTROLLERS

	// DIARY AND EVENTS

	.controller('DiaryCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		console.log('DiaryCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();			
			console.log('Eventos actuales:'+user.events);
			$scope.events = user.events;

		} 

	}])

	.controller('EventDetailCtrl', ['$scope', '$state', 'Auth', '$stateParams', '$rootScope', function($scope, $state, Auth, $stateParams, $rootScope){
		
		console.log('EventDetailCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser(),
				eventdetail;

			console.log($stateParams.eventId);

			Auth.getEvent($stateParams.eventId)			

				.success(function(res){
					console.log('EventDetailCtrl ctrl success...');					
					eventdetail = res;
					$scope.event = eventdetail;
					$rootScope.evento = eventdetail;
				})
				.error(function(err){
						console.log('EventDetailCtrl ctrl error...');
						console.log(err);
				})

		} 

	}])


	.controller('EventMembersCtrl', ['$scope', '$state', 'Auth', '$ionicPopup', '$rootScope', function($scope, $state, Auth, $ionicPopup, $rootScope){
		
		console.log('EventMembersCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			console.log($rootScope.evento);
			var user = Auth.currentUser()				
				evento = $rootScope.evento;


				$scope.members = evento.members;



			$scope.addMember = function(){

				$scope.data = {};
				var myPopup = $ionicPopup.show({
				    template: '<input type="text" ng-model="data.username">',
				    title: 'Añadir participante',
				    subTitle: 'Introduce el username del usuario',
				    scope: $scope,
				    buttons: [
				      { text: 'Cancelar' },
				      {
				        text: '<b>Guardar</b>',
				        type: 'button-calm',
				        onTap: function(e) {
				          if (!$scope.data.username) {
				            //don't allow the user to close unless he enters wifi password
				            e.preventDefault();				            
				          } else {
				            return $scope.data.username;
				          }
				        }
				      },
				    ]
				  });

				  myPopup.then(function(res) {
    				console.log('Tapped!', res);
    				console.log(evento);
    				//Necesitamos acceder al RootScope de arriba... XD
    				var addmember = {
    					'username': res,
    					'event': {
    						'_id': evento._id,
							'title': evento.title,		
							'place': evento.place,
							'date': evento.date,
							'pic': evento.pic
    					}
    					
    				};

    				console.log(addmember);

    				Auth.addMembers(addmember)

    					.success(function(event){
    						$scope.members = event.members;
    						console.log(event);
    					})

    					.error(function(err){
    						console.log(err);

    					})



  				});




				
			}




		} 

	}])


	.controller('AddEventCtrl', ['$scope', '$state', 'Auth', '$rootScope', function($scope, $state, Auth, $rootScope){
		
		console.log('AddEventCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();

			$scope.createEvent = function(formData){				
				console.log('funcion createEvent ejecutandose...');

				console.log(formData);

				Auth.createEvent(formData)

				
					.success(function(){
						console.log('createEvent ctrl success...');
						//Puede dar problemas si se ejecuta el cambio de estado antes de 
						//actualizar el usuario.
						Auth.updateUser().then(function(data){
							$state.go('tab.diary');
						});						
						/*Auth.getEvents(user._id).then(function(data){
							console.log('createEventServices ctrl success...');

							if(data){								
								user.events = data;
								console.log(Auth.currentUser());
								$state.go('tab.diary');
							} else
								console.log('Error al recuperar eventos.');
								$state.go('tab.diary');

						})*/
					})

					.error(function(){
						console.log('Error al crear evento.');
					})

				
				/*

				.then(function(data){
					console.log(data);
					if(data){
						Auth.getEvents(user._id).then(function(data){

							if(data){								
								user.events = data;
								Auth.updateUser(user);							
								console.log(Auth.currentUser());
								$state.go('tab.diary');
							} else
								console.log('Error al recuperar eventos.');
								$state.go('tab.diary');

						})
						
					}
					else
						console.log('EERRORORORORORORORO');
				});*/

			}

		}		

	}])	

	// SEARCH AND USERS DETAILS

	.controller('SearchCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		console.log('SearchCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();
			//Aqui meteriamos la logica		
			
			$scope.results = null;


			$scope.findByKey = function(){

				Auth.findByKey($scope.key)

				.success(function(res){
						console.log('finByKey ctrl success...');

						$scope.results = [{
							"type": "users", // de momento metida a pelo...
							"name": res.local.username,
							"_id": res._id,
							"subname": res.local.state,
							"pic": res.local.pic
						}]						
				})
				.error(function(err){
						console.log('findByKey ctrl error...');
						$scope.results = [{
							"name": "No hay resultados",
							"_id": 0,
							"subname": err,
							"pic": "ionic.png"
						}]
				})
			}
		}
	}])

	
	.controller('UserDetailCtrl', ['$scope', '$state','$stateParams', 'Auth', function($scope, $state, $stateParams, Auth){
		
		console.log('UserDetailCtrl ejecutandose...');
		console.log(Auth.currentUser());
		
		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser(),
				userdetail;

			$scope.counter2=0;			
			console.log($stateParams.userId);
			
			Auth.getProfile($stateParams.userId)

			.success(function(res){
					console.log('UserDetailCtrl ctrl success...');					
					userdetail = res;
					$scope.userdetail = userdetail.local;
					$scope.events = userdetail.events;									
			})
			.error(function(err){
					console.log('UserDetailCtrl getProfile ctrl error...');
					console.log(err);
			})

			$scope.tpm = function(){
      			$scope.counter2++;
   			};

			$scope.addContact = function(){

				console.log(userdetail);

				Auth.addContact({
					_id: userdetail._id,
					username: userdetail.local.username,
					state: userdetail.local.state,
					pic: userdetail.local.pic,
					email: userdetail.local.email
				})

					.success(function(res){
						console.log('UserDetailCtrl addContact ctrl success...');
						console.log(res);
						Auth.updateUser();
					})
					.error(function(res){
						console.log('UserDetailCtrl addContact ctrl error...');
						console.log(err);

					})
			}

		} 

	}])

	

	.controller('ContactsCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		console.log('ContactsCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();

			console.log(user.contacts);

			$scope.contacts = user.contacts;




			$scope.search = function(){

				var username = $scope.searchUser;
				console.log('buscando...' + username);

				//Auth.search()

				/*
				Auth.search(username).then(function(data){

								if(data){
									user.events=data;
									Auth.updateUser(user);
									console.log(Auth.currentUser());
									$state.go('tab.diary');
								} else {
									console.log('Error al recuperar eventos.');
									$state.go('tab.diary');
								}
				})*/
			}
		}
	}])

	// PROFILE AND SETTINGS

	.controller('ProfileCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		console.log('ProfileCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();			
			$scope.username = user.local.username;
			$scope.state = user.local.state;
			$scope.pic = user.local.pic;
			$scope.numFriends = user.contacts.length;
		} 

	}])

	.controller('SettingsCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){
		
		console.log('SettingsCtrl ejecutandose...');
		console.log(Auth.currentUser());

		if(Auth.currentUser() == null){
			$state.go('login');
			return;
		} else {
			var user = Auth.currentUser();			
			$scope.email = user.local.email;

		} 

	}]);