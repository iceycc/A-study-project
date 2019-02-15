let path = require('path');
module.exports = {
    entry:{
        home:'./src/index.js'
    },
    output:{
        filename:'[name].js',
        path:path.reslove(__dirname,'dist')
    }
}