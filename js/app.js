var app = angular.module('MyPage', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .when('/contact', {
      controller: 'ContactController',
      templateUrl: 'views/contact.html'
    })
    .when('/resume', {
      controller: 'ResumeController',
      templateUrl: 'views/resume.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
