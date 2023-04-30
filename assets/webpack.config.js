/**
 * Webpack configuration.
 */

const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const cssnano = require( 'cssnano' ); // https://cssnano.co/
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const CopyPlugin = require('copy-webpack-plugin'); // https://webpack.js.org/plugins/copy-webpack-plugin/
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const DotenvWebpackPlugin = require('dotenv-webpack');

// JS Directory path.
const SRC_DIR = path.resolve( __dirname, 'src' );
const JS_DIR = path.resolve( __dirname, 'src/js' );
const IMG_DIR = path.resolve( __dirname, 'src/img' );
const LIB_DIR = path.resolve( __dirname, 'src/library' );
const BUILD_DIR = path.resolve( __dirname, 'build' );

const entry = {
	public: JS_DIR + '/public.js',
	// admin: JS_DIR + '/admin.js',
	builder: JS_DIR + '/builder.js',
	// widgets: JS_DIR + '/widgets.js',
	// single: JS_DIR + '/single.js',
	// editor: JS_DIR + '/editor.js',
	// blocks: JS_DIR + '/blocks.js',
	// author: JS_DIR + '/author.js',
};

const output = {
	path: BUILD_DIR,
	filename: 'js/[name].js'
};

/**
 * Note: argv.mode will return 'development' or 'production'.
 */
const plugins = ( argv ) => [
	new DotenvWebpackPlugin(),
	
	new CleanWebpackPlugin( {
		cleanStaleWebpackAssets: ( 'production' === argv.mode  ) // Automatically remove all unused webpack assets on rebuild, when set to true in production. ( https://www.npmjs.com/package/clean-webpack-plugin#options-and-defaults-optional )
	} ),

	new MiniCssExtractPlugin( {
		filename: 'css/[name].css'
	} ),

	new CopyPlugin( {
		patterns: [
			{ from: LIB_DIR, to: BUILD_DIR + '/library' },
			{ from: SRC_DIR + '/icons', to: BUILD_DIR + '/icons' },
			{ from: SRC_DIR + '/img', to: BUILD_DIR + '/img' },
		]
	} ),

	new DependencyExtractionWebpackPlugin( {
		injectPolyfill: true,
		combineAssets: true,
	} )
];

const rules = ( argv ) => [
	{
		test: /\.js$/,
		include: [ JS_DIR ],
		// exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	},
	{
		test: /\.((sc|c|sa)ss)$/, // /\.scss$/, // 
		// exclude: /node_modules/,
		use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
		// use: [
		// 	{
		// 		loader: 'style-loader'
		// 	},
		// 	{
		// 		loader: 'css-loader'
		// 	},
		// 	{
		// 		loader: 'postcss-loader',
		// 		options: {
		// 			plugins: function () {
		// 				return [
		// 					require('autoprefixer')
		// 				];
		// 			}
		// 		}
		// 	},
		// 	{
		// 			loader: 'sass-loader'
		// 	}
		// ]
	},
	// {
	// 	test: /\.css$/,
	// 	exclude: /node_modules/,
	// 	// use: [ MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', ],
	// 	use: argv.cssLoaders,
	// },
	{
		test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
		exclude: /node_modules/,
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
			}
		}
	},
	{
		test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
		exclude: [ IMG_DIR, /node_modules/ ],
		use: {
			loader: 'file-loader',
			options: {
				name: '[path][name].[ext]',
				publicPath: 'production' === process.env.NODE_ENV ? '../' : '../../'
			}
		}
	},
	// {test: /\.(jpg|png|gif)$/,use: ['file-loader',{loader: 'image-webpack-loader',options: {progressive: true,optimizationLevel: 7,interlaced: false,pngquant: {quality: '65-90',speed: 4,},},},]},{test: /\.html$/,use: 'html-loader',},{test: /\.json$/,use: 'json-loader',},{test: /\.(mp4|webm)$/,use: {loader: 'url-loader',options: {limit: 10000,},},}

];

/**
 * Since you may have to disambiguate in your webpack.config.js between development and production builds,
 * you can export a function from your webpack configuration instead of exporting an object
 *
 * @param {string} env environment ( See the environment options CLI documentation for syntax examples. https://webpack.js.org/api/cli/#environment-options )
 * @param argv options map ( This describes the options passed to webpack, with keys such as output-filename and optimize-minimize )
 * @return {{output: *, devtool: string, entry: *, optimization: {minimizer: [*, *]}, plugins: *, module: {rules: *}, externals: {jquery: string}}}
 *
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
module.exports = ( env, argv ) => ({

	entry: entry,

	output: output,

	/**
	 * A full SourceMap is emitted as a separate file ( e.g.  main.js.map )
	 * It adds a reference comment to the bundle so development tools know where to find it.
	 * set this to false if you don't need it
	 */
	devtool: 'source-map',

	module: {
		rules: rules( argv ),
	},

	optimization: {
		minimizer: [
			new OptimizeCssAssetsPlugin( {
				cssProcessor: cssnano
			} ),

			new UglifyJsPlugin( {
				cache: false,
				parallel: true,
				sourceMap: false
			} )
		]
	},

	plugins: plugins( argv ),

	externals: {
		jquery: 'jQuery'
	}
});
