// Video Demo showcases decorative directives

angular.module('app').controller('videoCtrl', function($scope) {
  $scope.handlePause = function(e) {
    console.log(e);
    console.log('paused');
  }
});

angular.module('app').directive('eventPause', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      var fn = $parse(attributes['eventPause']);
      element.on('pause', function(event) {
        scope.$apply(function() {
          fn(scope, {
            evt: event
          });
        })
      })

    }
  }
});


angular.module('app').directive('spacebarSupport', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      $('body').on('keypress', function(event) {
        var videoElement = element[0]
        if (event.keyCode === 32) {
          if (videoElement.paused) {
            videoElement.play();
          } else {
            videoElement.pause();
          }
        }
      })
    }
  }
});