const path = require('path');
const dotenv = require('dotenv');
const { readFileSync } = require('fs');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../../src');
const BUILD_DIR = path.resolve(__dirname, '../../build');
const ROOT_DIR = path.resolve(__dirname, '../../');

/**
 * @param {String} env // Either  "dev", "stg", "prod"
 * @returns {any} // As webpack config
 */
const config = (env) => {
    const environments = dotenv.parse(readFileSync(`${ROOT_DIR}/.env.${env}`));
    return {
        entry: [`${APP_DIR}/app.ts`],
        output: {
            path: BUILD_DIR,
            filename: `server.${env}.js`,
        },
        target: 'node',
        externals: [nodeExternals()],
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new DefinePlugin({
                'process.env': JSON.stringify(environments),
            }),
            new NodemonPlugin(),
        ],
        module: {
            rules: [
                /**
                 * ESLINT
                 * First, run the linter.
                 * It's important to do this before Babel processes the JS.
                 * Only testing .ts and .tsx files (React code)
                 */
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                eslintPath: require.resolve('eslint'),
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts$/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
                },
            ],
        },
    };
};

module.exports = config;
