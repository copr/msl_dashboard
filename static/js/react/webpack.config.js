/*
 * Config file for webpack. For more thorough explanation refer to [1] in notes.md.
*/
module.exports = {
    entry: './entry.jsx',
    output: {
	filename: 'bundle.js'
    },
    module: {
	loaders: [
	    {
		test: /\.jsx$/,
		loader: 'jsx-loader?insertPragma=React.DOM&harmony'
	    }
	]
    },
    externals: {
	// 'react': 'React',
	// 'react-dom': 'ReactDOM',
	//'d3': 'd3'
    },
    resolve: {
	extensions: ['', '.js', '.jsx']
    }
}
