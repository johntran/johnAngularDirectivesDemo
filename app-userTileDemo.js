/** Business-Specific Decorator Directive
 * To avoid the user tile directive
 * from being bloated. I separated
 * the user click controller function
 * and made it its own directive.
 * 
 * The more practical way of implementing this
 * would be to use ngClick or johnClick.
 */
var johnApp = angular.module('app');

johnApp.controller('userTileCtrl', function($scope) {
  $scope.user1 = {
    name: 'Luke',
    selected: false
  }
});

johnApp.directive('userTile', function() {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    templateUrl: 'viewPartial-userTile.html',
  }
});

johnApp.directive('userClickSelect', function() {
  return {
    link: function(scope, element, attributes) {
      element.on('click', function() {
        scope.user.selected = !scope.user.selected;
        scope.$apply();
      })
    }
  }
})