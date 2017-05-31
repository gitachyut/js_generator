var myProm = new Promise(resolve=>{
  setTimeout(()=>{
    resolve('Testing Testing')
  },1000)
})

var oneMore = function(x){
  return new Promise(resolve=>{
      setTimeout(()=>{
        resolve('Hello '+x)
      },2000)
  })
}
var xhr = function(func){
  var x = new XMLHttpRequest()
  x.open('GET','https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc',true)
  x.onreadystatechange = function(){
    func(x.response)
  }
  x.send()
}
function* Gen(){
  var x = yield myProm
  var t = yield oneMore(x)
  var c = yield xhr
  console.log(t)
}
var gen = Gen();
var d = gen.next().value
        .then( (res)=> gen.next(res).value)
        .then( (res)=> {
             gen.next(res).value(function(res){
               console.log(res)
             })
             gen.next()
        })
        .catch( (err)=> console.log(err) )
