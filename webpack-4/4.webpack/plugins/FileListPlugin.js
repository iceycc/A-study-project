class FileListPlugin{
  constructor({filename}){
    this.filename = filename
  }
  apply(compiler){
    compiler.hooks.emit.TapAsync('',(compilcation)=>{
      // console.log(compilcation.assets)
      let assets = compilcation.assets;
      let content = `## 文件名   资源大小`
      Object.entries(assets).forEach(element =>{})
    })
  }
}