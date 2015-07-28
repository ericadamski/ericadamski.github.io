app.factory('resume', ['$https', function ($https) {
  return $https.get('https://ericadamski.herokuapp.com/portfolio/my-resume.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
