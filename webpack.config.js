const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports ={
    mode: 'production',
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: ''
    },

    plugins: [
        new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    })
    ],

    devServer:{
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
            },{
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash][ext][query]'
                }
            }
        ]
    }
}
