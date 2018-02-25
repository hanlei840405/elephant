(function () {
  'use strict';

  angular.module('BlurAdmin.service', [
    'BlurAdmin.service.system',
    'BlurAdmin.service.basic',
    'BlurAdmin.service.lease',
  ]).constant('systemHost', 'http://localhost:8701/').constant('basicHost','http://localhost:8801/').constant('operationHost','http://localhost:8901/');

})();