Package.describe({
  name: 'quave:react-components',
  version: '0.0.1',
  summary: '',
  git: 'https://github.com/quavedev/react-components',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('2.0');
  api.use('ecmascript');
  api.mainModule('react-components.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('react-components');
  api.mainModule('react-components-tests.js');
});
