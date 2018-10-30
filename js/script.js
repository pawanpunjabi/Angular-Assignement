var app = angular.module('App', [
    'ngMessages', 'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND 
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
        })

        // INFO PAGE AND MULTIPLE NAMED VIEWS 
        .state('info', {
            url: '/info',
            templateUrl: "template/info.html"

        });

});



// Factory for share the data between Controllers
app.factory('ShareFactory', function() {
    return {
        email: null,
        userplan: "Advanced",
        password: null
    };
});



app.controller('LoginController', function($scope, $state, ShareFactory, $window) {

    $scope.loading = false;
    $scope.user = ShareFactory;
    $scope.reset = function(form) {
        $scope.user = {
            email: null,
            userplan: "Advanced",
            password: null
        };

        form.$setPristine();
        form.$setUntouched();
        form.$valid = true;
        form.$invalid = false;
        form.$error = {};
    };

    $scope.submit = function(user, form) {
        $scope.reset(form);
        console.log('User Login', user);
        //$window.alert('Thank you ' + user.email + ' for checking');
        // redirect etc
        $state.go('info', user);
    };

});


app.controller('InfoController', function($scope, ShareFactory) {

    $scope.data = ShareFactory;
});


app.directive('validatePasswordCharacters', function() {

    var REQUIRED_PATTERNS = [
        // /\d+/,    //numeric values
        /[a-z]+/, //lowercase values
        // /[A-Z]+/, //uppercase values
        /\W+/, //special characters
        /^\S+$/ //no whitespace allowed
    ];

    return {
        require: 'ngModel',
        link: function($scope, element, attrs, ngModel) {
            ngModel.$validators.passwordCharacters = function(value) {
                var status = true;
                angular.forEach(REQUIRED_PATTERNS, function(pattern) {
                    status = status && pattern.test(value);
                });
                return status;
            };
        } // end link
    }; // end return

});