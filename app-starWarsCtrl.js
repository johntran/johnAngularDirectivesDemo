/** Star Wars Demo Showcasing: 
 * Component Directives
 * Templates
 * Controllers in Directives
 * Using '@' to bind directive scope by DOM Attribute. Used for literal strings.
 * Using '=' to bind directive scope to parent scope. Used for objects.
 * Using '&' to bind directive scope to a function. Used to pass functions.
 * Inherited Scope: See 'collapsed' variable for userInfoCard and address.
 * Decorative Directive: State Display, allows to change colors based on parameters given
 */

angular.module('app').controller('starWarsCtrl', function($scope) {
  $scope.user1 = {
      name: 'Luke Skywalker',
      address: {
        street: 'PO Box 123',
        city: 'Secret Rebel Base',
        planet: 'Yavin 4'
      },
      friends: [
        'Han',
        'Leia',
        'Chewbacca'
      ],
      level: 0
    },
    $scope.user2 = {
      name: 'Han Solo',
      address: {
        street: 'PO Box 123',
        city: 'Mos Eisley',
        planet: 'Tattoine'
      },
      friends: [
        'Luke',
        'Leia',
        'Chewbacca'
      ],
      level: 1
    }
});


angular.module('app').directive('stateDisplay', function() {
  return {
    link: function(scope, element, attributes) {
      var parameters = attributes['stateDisplay'].split(' ');
      var linkVariable = parameters[0];
      var cssClasses = parameters.slice(1);
      scope.$watch(linkVariable, function(newValue) {
        element.removeClass(cssClasses.join(' '));
        element.addClass(cssClasses[newValue]);
      });
    }
  }
});


angular.module('app').directive('userInfoCard', function() {
  return {
    templateUrl: "viewPartial-userInfoCard.html",
    restrict: "E",
    scope: {
      user: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      // $scope.collapsed = false;
      $scope.nextState = function() {
        $scope.user.level++;
        $scope.user.level = $scope.user.level % 3;
      }
      $scope.collapsed = ($scope.initialCollapsed === 'true');
      $scope.knightMe = function(user) {
        user.rank = 'knight';
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed
      }
      $scope.removeFriend = function(friend) {
        var index = $scope.user.friends.indexOf(friend);
        if (index > -1) {
          $scope.user.friends.splice(index, 1);
        }
      }
    }
  }
});

angular.module('app').directive('address', function() {
  return {
    templateUrl: "viewPartial-address.html",
    restrict: 'E',
    scope: true,
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.expandAddress = function() {
        $scope.collapsed = false;
      };
      $scope.collapseAddress = function() {
        $scope.collapsed = true;
      }
    }
  }
});

angular.module('app').directive('removeFriend', function() {
  return {
    restrict: 'E',
    templateUrl: 'viewPartial-removeFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function($scope) {
      $scope.removing = false;
      $scope.startRemove = function() {
        $scope.removing = true;
      }
      $scope.cancelRemove = function() {
        $scope.removing = false;
      }
      $scope.confirmRemove = function() {
        $scope.notifyParent();
      }
    }
  }
});