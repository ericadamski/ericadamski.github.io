app.controller('SEOController', [ '$scope', function ($scope) {
  $scope.seo = {
    description: '',
    og: {
      title: "Eric Adamski | Resumé",
      description: '',
      image: '',
      type: 'personal',
      url: 'http://ericadamski.github.io/',
    }
    facebook: {
      uid: ''
    },
    twitter: {
      summary: 'Eric Adamski | Resumé',
      url: 'http://ericadamski.github.io/',
      description: '',
      image: ''
    }
  };
}]);
