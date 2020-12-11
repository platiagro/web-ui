const { addLessLoader } = require('customize-cra');

module.exports = {
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    const newWebpackConfig = addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    })(webpackConfig);

    return newWebpackConfig;
  },
  require: ['less-loader', './src/style.less'],
  sections: [
    {
      name: 'Components',
      description: 'Application components.',
      components: ['src/components/**/*.component.jsx'],
    },
    {
      name: 'Pages',
      description: 'Application pages.',
      components: ['src/Pages/**/*.page.jsx'],
    },
  ],
};
