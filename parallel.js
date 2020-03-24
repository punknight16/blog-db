function doParallel (async_calls, shared_callback) {
  var counter = async_calls.length;
  var callback = function () {
    counter --;
    if (counter == 0) {
      shared_callback()
    }
  }

  for (var i=0;i<async_calls.length;i++) {
    async_calls[i](callback);
  }
}

function callA(cb){
	setTimeout(function(){
		console.log('A finished at: ', counter);
    cb();
	}, 1000);
}

function callB(cb){
	setTimeout(function(){
    console.log('B finished at: ', counter);
		cb();
	}, 1000);
}

function callC(cb){
	setTimeout(function(){
    console.log('C finished at: ', counter);
		cb();
	}, 1000);
}

var counter = 0;
setInterval(function(){
  counter++;
   if (counter == '7000') {
    console.log("counter at 7 sec");
    clearInterval(this);
  }
}, 1);
//in series
callA(function(){
  callB(function(){
    callC(function(){
      return;
    })
  })
})

//in parallel
doParallel([callA, callB, callC], function(){
  console.log("parallel execution counter at: ", counter)
})
