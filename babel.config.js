module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@actions': './src/actions',
            '@app': './src/app',
            '@components': './src/components',
            '@config': './src/config',
            '@data': './src/data',
            '@screens': './src/screens',
            '@typings': './src/typings',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
