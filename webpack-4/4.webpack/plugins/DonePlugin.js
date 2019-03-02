class DonePlugin{
  apply(compiler){
    // console.log(compiler.hooks)
    compiler.hooks.done.tap("DonePlugin",stats=>{
      // console.log(stats)
      console.log('编译完成了～～～～～')
    })
  }
}

module.exports = DonePlugin