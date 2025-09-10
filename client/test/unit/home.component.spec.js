describe('HomeComponent', function() {
    var $componentController, $rootScope, $scope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$componentController_, _$rootScope_) {
        $componentController = _$componentController_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }));

    it('should initialize with default values', function() {
        var ctrl = $componentController('homeComponent', { $scope: $scope });
        expect(ctrl.someProperty).toBeDefined();
        expect(ctrl.someProperty).toEqual('default value');
    });

    it('should call the expected method on initialization', function() {
        var ctrl = $componentController('homeComponent', { $scope: $scope });
        spyOn(ctrl, 'someMethod');
        ctrl.$onInit();
        expect(ctrl.someMethod).toHaveBeenCalled();
    });

    it('should update the view when the model changes', function() {
        var ctrl = $componentController('homeComponent', { $scope: $scope });
        ctrl.someProperty = 'new value';
        $scope.$apply();
        expect(ctrl.someProperty).toEqual('new value');
    });
});