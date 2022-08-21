module.exports = function (api) {
  api.cache.never();
  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          }
        ],
        'react-native-reanimated/plugin',
        ["transform-remove-console", { "exclude": ["error", "warn", "info"] }],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ]
    }
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        }
      ],
      'react-native-reanimated/plugin',
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ]
  }

}


