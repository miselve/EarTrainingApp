module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            components: './components',
            structs: './src/components/structs',
            _main: './src/components/_main',
            screens: './src/screens',
            config: './src/config',
            navigations: './src/navigations',
            utils: './src/utils',
            actions: './src/state/actions',
            constants: './src/state/constants',
            contexts: './src/state/contexts',
            reducers: './src/state/reducers',
            assets: './src/assets/',
            hooks: './src/hooks',
            data: './src/data',
          },
        },
      ],
    ],
  };
};
