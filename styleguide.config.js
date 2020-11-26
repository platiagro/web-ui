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
      description: 'Componentes da aplicação.',
      components: ['src/components/**/*.component.jsx'],
    },
  ],
};
