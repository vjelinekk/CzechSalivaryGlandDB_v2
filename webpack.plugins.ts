import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// eslint-disable-next-line import/default
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins = [
    new ForkTsCheckerWebpackPlugin({
        logger: 'webpack-infrastructure',
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, 'public', 'img'),
                to: path.resolve(__dirname, '.webpack/renderer', 'img'),
            },
            {
                from: path.resolve(__dirname, 'public', 'fonts'),
                to: path.resolve(__dirname, '.webpack/renderer', 'fonts'),
            },
            {
                from: path.resolve(__dirname, 'public', 'locales'),
                to: path.resolve(__dirname, '.webpack/renderer', 'locales'),
            },
        ],
    }),
]
