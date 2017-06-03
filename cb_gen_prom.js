function runGenerator(g) {
    var it = g(), ret;
    (function iterate(val){
        ret = it.next( val );
        if (!ret.done) {
            if ("then" in ret.value) {
                ret.value.then( iterate );
            }
            else {
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );
            }
        }
    })();
}

var myProm = new Promise(resolve=>{
  setTimeout(()=>{
    resolve('Testing')
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

runGenerator(function* Gen(){
  var x = yield myProm
  var t = yield oneMore(x)
  var c = yield xhr
  console.log(t)
})
