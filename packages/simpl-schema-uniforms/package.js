Package.describe({
  name: 'meteoreact:fix-unsupported-properties',
  summary: 'Fix simpl-schema unsupported properties',
  version: '0.0.1'
})

Package.onUse((api) => {
  // api.versionsFrom("1.6.1");

  api.use(['ecmascript'], ['client', 'server'])

  api.mainModule('index.js', ['client', 'server'])
})
