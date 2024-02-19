Package.describe({
  name: "zodern:import-extension-order",
  summary: "Control order extensions or tried by Meteor's resolver",
  documentation: "./readme.md",
  version: '1.0.0',
  git: 'https://github.com/zodern/meteor-import-extension-order.git'
});

Package.registerBuildPlugin({
  name: 'extension-order',
  sources: ['plugin.js'],
  use: ['modules@0.16.0']
});

Package.onUse(api => {
  api.use('isobuild:compiler-plugin@1.0.0')
});
