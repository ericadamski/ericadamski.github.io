var ngManage = angular.module('ngManage', []);

ngManage.service('fileManager', [function() {
  // use this to get and put files on the server
}]);

ngManage.directive('ngmContent', ['$compile', 'IdGenerator',
  function($compile, IdGenerator)
  {
    return {
      restrict: 'A',
      link: function(scope, element, attribute) {
        linkManageContent(scope, element, attribute, $compile, IdGenerator);
      }
  };
}]);

ngManage.factory('IdGenerator', [function() {
  var random = 0;
  return {
    get: function() {
      return random++;
    }
  };
}]);

var linkManageContent = function(scope,
  element,
  attribute,
  $compile,
  IdGenerator)
{
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  var repeatLoop = element.parent(),
      id         = IdGenerator.get();
  console.log(id);
  console.log(scope[attribute.ngmContent]);

  scope.removeClick = function (collection, index) {
    delete collection[Object.keys(collection)[index]];
  };

  // Add the plus button for new content creation.
  setupParent(repeatLoop.parent(), $compile, scope);

  // Wrap the content in editing buffer
  wrapContent(element, id, attribute.ngmContent, $compile, scope);

  // attach a model to edit with
  attachModal(element,
    attribute.ngmContent,
    id,
    scope[attribute.ngmContent],
    $compile,
    scope);
};

var setupParent = function (element, $compile, scope) {
  // check to see if the add has already been applied.
  if ($(element).children('div.add-content').length > 0) return;

  // it hasn't been applied
  $(element).append(
    compileAngular("<div class=\"add-content\"><button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&#43;</span></button></div>",
    $compile,
    scope)
  );
};

var generateForm = function (parent, name, model) {
  var inputs = "";
  Object.keys(model).map(function(key, index) {
    inputs += generateInput(key, parent + '.' + key, key, 'text');
  });
  return "<form name=\""+ name +"\" ng-submit=\"commitChanges()\">"+
    "<div class=\"form-group\">"+
      inputs+
    "</div>"+
    "<div class=\"modal-footer\">"+
      "<button class=\"btn btn-primary\" type=\"submit\" ng-disabled="+ ">"+
        "Done"+
      "</button>"+
    "</div>"+
  "</form>";
};

var generateInput = function (name, ngModel, placeholder, type) {
  return "<div class=\"input-group\"><label>"+ name.capitalize() +"</label><br><input type=\"" + type + "\" name=\"" + name + "\" ng-model=\"" + ngModel + "\" placeholder=\"" + placeholder + "\" required></div>";
};

var generateModal = function (parent, id, title, model) {
  return "<div class=\"modal fade\" id=\"" + id + "\" tabindex=\"-1\" role=\"dialog\">"+
    "<div class=\"modal-dialog\" role=\"document\">"+
      "<div class=\"modal-content\">"+
        "<div class=\"modal-header\">"+
          "<button type=\"button\" class=\"close\" data-dismiss=\"modal\"<span aria-hidden=\"true\">&times;</span></button>"+
          "<h4 class=\"modal-title\">" + title + "</h4>"+
        "</div>"+
        "<div class=\"modal-body\">"+
          generateForm(parent, title + "Form", model) +
        "</div>"+
      "</div>"+
    "</div>"+
  "</div>";
};

var attachModal = function (element, parent, id, model, $compile, scope) {
  // Go through the JSON object in model and create a modal with it and link it
  // to the scope.
  $(element)
    .append(
      compileAngular(generateModal(parent, id, "Edit", model),
        $compile,
        scope
      )
    );
};

var compileAngular = function (element, $compile, scope) {
  return $compile(angular.element(element))(scope);
}

var wrapContent = function (element, id, content, $compile, scope) {
  $(element)
    .prepend(
      compileAngular("<div class=\"editing-context\">"+
      "<button type=\"button\" class=\"close\" data-toggle=\"modal\" data-target=\"#"+ id +"\">"+
        "<span aria-hidden=\"true\" class=\"edit glyphicon glyphicon-pencil\"></span>"+
      "</button>"+
      "<button type=\"button\" class=\"close\" ng-click=\"removeClick("+
      content +"s, $index)\">"+
        "<span aria-hidden=\"true\">&times;</span>"+
      "</button>"+
    "</div>", $compile, scope));
};
