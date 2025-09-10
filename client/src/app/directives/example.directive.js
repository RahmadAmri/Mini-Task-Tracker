angular.module('app').directive('exampleDirective', function() {
    return {
        restrict: 'E',
        scope: {
            inputData: '='
        },
        template: '<div>{{ inputData }}</div>',
        link: function(scope, element, attrs) {
            // Custom behavior can be added here
        }
    };
});