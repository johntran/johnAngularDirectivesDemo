// Re-implementing ng-click, a decorative directive.

angular.module('app').controller('johnClickCtrl', function($scope) {
  $scope.data = {
    message: "I haven't been clicked",
    clickCounter: 0
  };
  $scope.clickHandler = function(p) {
    p.message = "I have been clicked";
    p.clickCounter++;
  };
});

angular.module('app').directive('johnClick', function($parse) {
  return {
    link: function(scope, element, attributes) {
      var fn = $parse(attributes['johnClick']);
      element.on('click', function() {
        scope.$apply(function() {
          fn(scope);
        })
      })
    }
  }
})

