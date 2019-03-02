class AsyncPlugin {
  apply(compiler){
    console.log(2);
    compiler.hooks.emit.tapAsync('AsyncPlugin',(comliation,cb)=>{
      setTimeout(()=>{
        console.log('文件发射出来 等一下');
        cb();
      })
    })
  }
}

module.exports = AsyncPlugin