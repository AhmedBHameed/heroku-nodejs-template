function buildConfig(env) {
    const config = require('./config/webpack/' + env + '.js');
    return config(env);
}

module.exports = buildConfig;
