app.controller('MarkingController',
  ['$scope', 'marking', '$filter', 'Upload', function($scope, marking, $filter, Upload) {
    $scope.$watch('file', function (file) {
      $scope.upload($scope.file);
    });

    $scope.save = function () {
      Upload.upload({
        url: 'marking/uploads',
        method: 'POST',
        file: new File(angular.toJson(
          {
            "markingScheme": $scope.markingScheme,
            "students"     : (($scope.students === undefined) ? [] : $scope.students)
          }).split(), "my-marking.json", {type: "application/json", lastModified: Date.now})
      }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
      }).error(function (data, status, headers, config) {
          console.log('error status: ' + status);
      });
    };

    $scope.upload = function (file) {
      if ( !( file === undefined || file === null) )
      {
        Upload.upload({
          url: 'marking/uploads',
          method: 'POST',
          file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
            marking("/uploads/"+$scope.file.name)
              .success(function (data) {
                setupScheme(data);
            });
        }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
        });
      }
    };

    $scope.$watch('markingScheme', function(newVal, oldVal) {
      if ($scope.students === undefined) return;
      $scope.students.forEach( function (student) {
        DeepDiff.observableDiff(student.outline, angular.copy($scope.markingScheme), function (diff) {
          if (diff.kind === 'E')
          {
            if (diff.path.join('.').indexOf('comments') === -1 && diff.path.join('.').indexOf('got') === -1)
            {
              DeepDiff.applyChange(student.outline, angular.copy($scope.markingScheme), diff);
            }
          }
          else
          {
            DeepDiff.applyChange(student.outline, angular.copy($scope.markingScheme), diff);
          }
        });
      });
    }, true);

    $scope.markersName = 'Eric';

    $scope.toggleMarkingText = function () {
      $scope.showText = !$scope.showText;
      console.log($scope.markingToString());
    };

    $scope.markingToString = function () {
      var students = $scope.students;

      if ( students === undefined ) return '';

      var outputStr = '';

      // For Each Student
      students.forEach( function (student) {
        outputStr += student.name + '\n';
        // For Each Question
        student.outline.questions.forEach(
          function (question, index) {
            var questionStr = '';
            questionStr += 'Q' + (index + 1) + ' ' + question.got() + '/' + question.total() + '\n';
            // For Each Breakdown
            var breakdownStr = '';
            question.breakdown.forEach(
              function (breakdown) {
                breakdownStr += breakdown.got + '/' +
                  breakdown.total + ' - ' +
                  breakdown.description + '\n';
            });
            questionStr += breakdownStr + '\n';
            questionStr += question.comments + '\n';
            outputStr += questionStr + '\n';
        });
        outputStr += student.outline.got() + '/' +
          student.outline.total() + ' - ' + $scope.markersName + '\n\n';

        outputStr += '================================ \n\n';
      });
      return outputStr;
    };

    $scope.canCreateScheme = function () {
      if ( $scope.markingScheme === undefined ) return false;
      else
      {
        return $filter('filter')(
            $scope.markingScheme.questions,
              function (question) {
                return question.total() <= 0;
            }).length === 0;
      }
    };

    $scope.hasMarkingScheme     = false;
    $scope.canEditMarkingScheme = true;
    $scope.showText             = false;
    $scope.questionCount        = 0;

    $scope.editMarkingScheme = function () {
      $scope.canEditMarkingScheme = !$scope.canEditMarkingScheme;
      $scope.hasMarkingScheme = false;
    };

    $scope.createScheme = function () {
      $scope.canEditMarkingScheme = false;
      $scope.hasMarkingScheme = true;

      setupScheme({
        "markingScheme": $scope.markingScheme,
        "students"     : $scope.students
      });
    };

    var questionTotal = function () {
      return this.breakdown.map(function (value) {
        return value.total;
      }).reduce(function (prev, curr) {
        return prev + curr;
      });
    };

    var questionTotalGot = function () {
      return this.breakdown.map(function (value) {
        return value.got;
      }).reduce(function (prev, curr) {
        return prev + curr;
      });
    };

    var assignmentTotal = function () {
      return this.questions.map(function (value) {
        return value.total();
      }).reduce(function (prev, curr) {
        return prev + curr;
      });
    };

    var assignmentTotalGot = function () {
      return this.questions.map(function (value) {
        return value.got();
      }).reduce(function (prev, curr) {
        return prev + curr;
      });
    };

    var setupQuestions = function () {
      $scope.markingScheme.questions.map(
        function(question) {
          question.total    = questionTotal;
          question.got = questionTotalGot;
          return question;
      });
    };

    var setupScheme = function (schemeJson) {
      $scope.markingScheme = schemeJson.markingScheme;
      $scope.students      = schemeJson.students;

      $scope.markingScheme.total    = assignmentTotal;
      $scope.markingScheme.got = assignmentTotalGot;

      setupQuestions();
    };

    $scope.addQuestion = function() {
      if ( $scope.markingScheme === undefined )
        $scope.markingScheme = {
          "questions": [],
          "total": assignmentTotal,
          "got":   assignmentTotalGot
        };

      $scope.markingScheme.questions.push({
        "breakdown": [
          {
            "description": "",
            "total": 0,
            "got": 0
          }
        ],
        "comments": "",
        "total": questionTotal,
        "got":   questionTotalGot
      });

      $scope.questionCount ++;
      $scope.breakdownCount = 0;
    };

    $scope.addBreakdown = function () {
      var currentBreakdown =
        $scope.markingScheme.questions[$scope.questionCount - 1].breakdown;

      currentBreakdown.push({
        "description": "",
        "total": 0,
        "got": 0
      });

      $scope.breakdownCount ++;
    };

    $scope.addStudent = function(name) {
      if ( $scope.students === undefined ) $scope.students = [];
      var student = {
        "name": name,
        "outline": angular.copy($scope.markingScheme)
      };

      $scope.students.push(student);
      $scope.currentStudent = student;
      $scope.student = undefined;
    };
}]);
