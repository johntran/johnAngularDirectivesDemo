// Creating my own watch.

var johnApp = angular.module('app');

johnApp.controller('watchCtrl', function($scope) {
  $scope.size = 150;
});

johnApp.directive('fontScale', function() {
  return {
    link: function(scope, element, attributes) {
      scope.$watch(attributes['fontScale'], function(newValue) {
        element.css('font-size', newValue + '%');
      })
    }
  }
});
