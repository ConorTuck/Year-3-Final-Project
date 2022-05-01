require('ignore-styles')

require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/prest-env', '@babel/preset-react']
})

require('./server')