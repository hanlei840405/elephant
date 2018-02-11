(function () {
  'use strict';

  angular.module('BlurAdmin.service', [
    'BlurAdmin.service.system',
  ]).constant('systemHost', 'http://localhost:8701/').constant('basicHost','http://localhost:8801/');

})();