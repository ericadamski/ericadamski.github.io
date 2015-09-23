app.controller('MarkingController',
  ['$scope', 'marking', '$filter', 'Upload', function($scope, marking, $filter, Upload) {

    $scope.hasMarkingScheme     = false;
    $scope.canEditMarkingScheme = true;
    $scope.showText             = false;
    $scope.fileName             = undefined;
    $scope.markersName          = undefined;
    $scope.uploading            = false;
    $scope.saving               = false;
    $scope.hasSaved             = false;
    $scope.filePath             = 'my-marking';

    $scope.$watch('fileName', function() {
      $scope.hasSaved = false;
      $scope.filePath = ($scope.fileName + ' ' + $scope.markersName).replace(/\s+/g, '-').toLowerCase();
    });

    $scope.$watch('markersName', function() {
      $scope.hasSaved = false;
      $scope.filePath = ($scope.fileName + ' ' + $scope.markersName).replace(/\s+/g, '-').toLowerCase();
    });

    $scope.$watch('file', function (file) {
      $scope.upload($scope.file);
    });

    var getStudentByName = function(name) {
      var stu = undefined;
      $scope.students.forEach(function(student){
        if (student.name === name)
          stu = student;
      });
      return stu;
    };

    $scope.average = function() {
      if ( $scope.students === undefined || $scope.students.length < 1 ) return 0;

      return $scope.students.map(function(student){
        return student.outline.got();
      }).reduce(function(prev, curr) {
        return prev + curr;
      }) / $scope.students.length;
    };

    $scope.setCurrentStudent = function(name) {
      $scope.currentStudent = getStudentByName(name);
    };

    $scope.save = function () {
      Upload.upload({
        url: 'marking/uploads',
        method: 'POST',
        file: new File(angular.toJson(
          {
            "markingScheme": $scope.markingScheme,
            "students"     : (($scope.students === undefined) ? [] : $scope.students)
          }).split(), $scope.filePath + ".json", {type: "application/json", lastModified: Date.now})
      }).progress(function (evt) {
        $scope.saving = true;
        var circle = new ProgressBar.Circle('#save-progress', {
          color: '#fff',
          trailColor: '#20B684',
          strokeWidth: 8,
          easing: 'easeInOut'
        });
        circle.animate(evt.loaded / evt.total);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
      }).success(function (data, status, headers, config) {
        $scope.hasSaved = true;
        $scope.saving   = false;
        $('#save-ok').transition({display: "initial", color: "#20B684"}, 100);
        setTimeout(function () {
          $('#save-ok')
            .transition({opacity: 0})
            .transition({display: "none"});
        }, 1500);
        console.log(' file ' + config.file.name + 'uploaded. Response: ' + data);
      }).error(function (data, status, headers, config) {
        $scope.saving = false;
        $('#save-error').transition({display: "initial", color: "#ff5555"}, 100);
        setTimeout(function () {
          $('#save-error')
            .transition({opacity: 0})
            .transition({display: "none"});
        }, 1500);
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
          $scope.uploading = true;
          var circle = new ProgressBar.Circle('#import-progress', {
            color: '#fff',
            trailColor: '#20B684',
            strokeWidth: 8,
            easing: 'easeInOut'
          });

          circle.animate(evt.loaded / evt.total);
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          $('#import-ok').transition({display: "initial", color: "#20B684"}, 100);
          setTimeout(function () {
            $('#import-ok')
              .transition({opacity: 0})
              .transition({display: "none"});
          }, 1500);
          $scope.uploading = false;
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          marking("/uploads/"+$scope.file.name)
            .success(function (data) {
              setupScheme(data);
          });
        }).error(function (data, status, headers, config) {
          $('#import-error').transition({display: "initial", color: "#ff5555"}, 100);
          setTimeout(function () {
            $('#import-error')
              .transition({opacity: 0})
              .transition({display: "none"});
          }, 1500);
          $scope.uploading = false;
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

    $scope.toggleMarkingText = function () {
      $scope.showText = !$scope.showText;
      console.log($scope.markingToString());
    };

    $scope.studentToString = function (student) {
      var outputStr = '';

      if (student === undefined)
        student = $scope.currentStudent;

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

      return outputStr;
    };

    $scope.markingToString = function () {
      var students = $scope.students;

      if ( students === undefined ) return '';

      var outputStr = '';

      // For Each Student
      students.forEach( function (student) {
        outputStr += $scope.studentToString(student);
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
                return question.total() < 1;
            }).length === 0;
      }
    };

    $scope.editMarkingScheme = function () {
      $scope.canEditMarkingScheme = !$scope.canEditMarkingScheme;
      $scope.hasMarkingScheme = false;
    };

    $scope.createScheme = function () {
      setupScheme({
        "markingScheme": $scope.markingScheme,
        "students"     : (($scope.students === undefined) ? [] : $scope.students)
      });
    };

    var questionTotal = function () {
      if ( this.breakdown === undefined || this.breakdown.length < 1 ) return 0;
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
      if (this.questions === undefined || this.questions.length < 1) return 0;
      return this.questions.map(function (value) {
        return value.total();
      }).reduce(function (prev, curr) {
        return prev + curr;
      });
    };

    var assignmentTotalGot = function () {
      if (this.questions === undefined || this.questions.length < 1) return 0;
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
          question.got      = questionTotalGot;
          return question;
      });
    };

    var setupScheme = function (schemeJson) {
      $scope.markingScheme = schemeJson.markingScheme;
      $scope.students      = schemeJson.students;

      $scope.markingScheme.total  = assignmentTotal;
      $scope.markingScheme.got    = assignmentTotalGot;

      setupQuestions();

      if ( $scope.currentStudent === undefined && $scope.students.length > 0 )
        $scope.currentStudent = $scope.students[0];

      $scope.canEditMarkingScheme = false;
      $scope.hasMarkingScheme = true;
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

    $scope.removeQuestion = function (number) {
      $scope.markingScheme.questions.splice(number, 1);
    };

    $scope.removeBreakdown = function (question, number) {
      $scope.markingScheme.questions[question].breakdown.splice(number,1);
    };

    $scope.addBreakdown = function (question) {
      var currentBreakdown =
        $scope.markingScheme.questions[question].breakdown;

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

      $scope.save();
    };
}]);
