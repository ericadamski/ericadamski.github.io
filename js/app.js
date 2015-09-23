var app = angular.module('MyPage', ['ngRoute', 'ngFileUpload', 'ngStorage', 'ngManage']);

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
    .when('/marking', {
      controller: 'MarkingController',
      templateUrl: 'views/marking.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
