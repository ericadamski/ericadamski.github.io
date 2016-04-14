app.controller('HomeController', ['$scope', function($scope) {
    var videos = [
      '343647377',
      '343660890',
      '343806260'
    ];

    var rand = Math.floor(Math.random() * (videos.length - 1));

    console.log(rand);

    $scope.video = 'video/' + videos[rand] + '.mp4';
}]);
