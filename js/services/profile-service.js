app.factory('profile', ['$https', function ($https) {
  return $https.get('https://ericadamski.herokuapp.com/portfolio/my-profile.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
