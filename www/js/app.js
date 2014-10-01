// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('toollife', ['ionic', 'directives', 'auth-controllers', 'auth-services'])

.run(function($ionicPlatform) {

  console.log('Inicia cordova controllers');
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  console.log('Inicia config del state $stateProvider');
  $stateProvider

    .state('login',{
      url: "/login",      
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'           
    })

    .state('signup',{
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: "SignupCtrl"              
    })

    // ESTADOS UNA VEZ LOGUEADOS

    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.profile',{
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: "templates/tab-profile.html",          
          controller: "ProfileCtrl"          
        }
      }
    })

    .state('tab.diary',{
      url: '/diary',      
      views: {
        'tab-diary': {
          templateUrl: "templates/tab-diary.html",
          controller: "DiaryCtrl"         
        }
      }
    })

    .state('tab.add-event',{
      url: '/add-event',
      views: {
        'tab-diary': {
          templateUrl: "templates/add-event.html",
          controller: 'AddEventCtrl'          
        }
      }        
    })

    .state('tab.event-detail',{
      url: '/diary/event/:eventId',
      views: {
        'tab-diary': {
          templateUrl: "templates/event-detail.html",
          controller: 'EventDetailCtrl'          
        }
      }        
    })

    .state('tab.event-members',{
      url: '/diary/event/members/',
      views: {
        'tab-diary': {
          templateUrl: "templates/event-members.html",
          controller: 'EventMembersCtrl'          
        }
      }        
    })


    .state('tab.search',{
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: "templates/tab-search.html",
          controller: "SearchCtrl"        
        }
      }
    })

    .state('tab.user-detail',{
      url: '/search/:userId',
      views: {
        'tab-search': {
          templateUrl: "templates/user-detail.html",
          controller: "UserDetailCtrl"          
        }
      }
                     
    })

    .state('tab.contacts',{
      url: '/contacts',
      views: {
        'tab-profile': {
          templateUrl: "templates/tab-contacts.html",
          controller: "ContactsCtrl"     
        }
      }
    })

    .state('tab.settings',{
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: "templates/tab-settings.html",
          controller: "SettingsCtrl"     
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

