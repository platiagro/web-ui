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
  tocMode: 'collapse',
  pagePerSection: true,
  sections: [
    {
      name: 'Components',
      description: 'Application components.',
      components: ['src/components/**/*.component.jsx'],
      ignore: [
        'src/components/NewDeploymentModal/**/*.component.jsx',
        'src/components/DeploymentFlow/**/*.component.jsx',
      ],
      sections: [
        {
          name: 'NewDeploymentModal',
          description: 'NewDeploymentModal components.',
          components: ['src/components/NewDeploymentModal/**/*.component.jsx'],
          ignore: [
            'src/components/NewDeploymentModal/TemplatesTable/**/*.component.jsx',
          ],
          sections: [
            {
              name: 'TemplatesTable',
              description: 'TemplatesTable components.',
              components: [
                'src/components/NewDeploymentModal/TemplatesTable/**/*.component.jsx',
              ],
            },
          ],
        },
        {
          name: 'DeploymentFlow',
          description: 'DeploymentFlow components.',
          components: ['src/components/DeploymentFlow/**/*.component.jsx'],
          ignore: [
            'src/components/DeploymentFlow/DeploymentFlowBox/**/*.component.jsx',
          ],
          sections: [
            {
              name: 'DeploymentFlowBox',
              description: 'DeploymentFlowBox components.',
              components: [
                'src/components/DeploymentFlow/DeploymentFlowBox/**/*.component.jsx',
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Pages',
      description: 'Application pages.',
      components: ['src/pages/**/*.page.jsx'],
    },
  ],
};
