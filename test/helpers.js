// helper functions

function compileTemplate (opts) {

  opts = opts || {};

  opts = {
    ngModel: opts.ngModel === false ? false: (opts.ngModel || 'model'),
    events: opts.events || [],
    multiple: opts.multiple || false,
    attrs: opts.attrs || []
  };

  template = "<input type='file' base-sixty-four-input>";
  $scope = $rootScope.$new();
  elem = angular.element(template);

  if (opts.ngModel !== false) {
    elem.attr('ng-model', opts.ngModel);
  }

  // attach events
  for (var i = opts.events.length - 1; i >= 0; i--) {
    var e = opts.events[i];
    elem.attr(e.name, e.bindTo);
    $scope[e.bindTo] = e.handler;
  }

  if (opts.multiple) {
    elem.attr('multiple', true);
  }

  for (var ii = opts.attrs.length - 1; ii >= 0; ii--) {
    var attr = opts.attrs[ii];
    elem.attr(attr['attr'], attr['val']);
  }

  var form = angular.element('<form name="form"></form>');
  form.append(elem);

  compiled = $compile(form)($scope);
  $scope.$digest();
}