const mainWebpackConfig = require('./main');

const devConfig = (env) => {
    const mainConfig = mainWebpackConfig(env);
    return {
        ...mainConfig,
        devtool: 'eval-source-map',
        output: {
            ...mainConfig.output,
            filename: `server.${env}.js`,
        },
        mode: 'development',
    };
};

module.exports = devConfig;
