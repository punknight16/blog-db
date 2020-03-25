var http = require('http');
var fs = require('fs');
var AWS = require("aws-sdk");
var mu = require("mu2-updated");

const {PassThrough} = require('stream');
const https = require('https')

var s3 = new AWS.S3({"region":"us-west-2"});
var bucket = "unwyre-user";
var user = "us-west-2:49307e47-8c31-4628-a607-a7eb852d50ae"
var page = "optionA.html";
var domain = "artof-adulting.blog";

var app = http.createServer(function(req, res){
	switch(req.url){
		case '/':
			//in parallel
			doParallel([callA, callB, callC, callD], function(result_arr){
				if(result_arr[0][0] || result_arr[1][0] || result_arr[2][0] || result_arr[3][0]){
					res.setStatus = 200;
					res.end(
						JSON.stringify(result_arr[0][0]) + 
						JSON.stringify(result_arr[1][0]) +
						JSON.stringify(result_arr[2][0]) +
						JSON.stringify(result_arr[3][0])
					);
				} else {
				  /*var ContentLength = result_arr[0][1].ContentLength;
				  res.writeHead(200, {'Content-Type': 'text/html; charset=utf8', 'Content-Length': result_arr[1][1].length });
					var buffer = new Buffer.alloc(ContentLength, result_arr[0][1].Body, 'utf8');
					var bufferStream = new PassThrough();
					bufferStream.end( result_arr[1][1] );
					bufferStream.pipe( res );*/

					console.log("result_arr[3][1]: ", result_arr[3][1]);
					res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
					var stream = mu.compileAndRender(
						"template.html", 
						{
							Article: JSON.parse(result_arr[1][1]).Items,
							Like: JSON.parse(result_arr[2][1]).Items,
							Reply: JSON.parse(result_arr[3][1]).Items
						}
					);
					stream.pipe(res);
				}
			})
			break;
		case '/template':
			var stream = fs.createReadStream(__dirname+'/optionA.html');
			stream.pipe(res);
			break;
		case '/ajax':
			res.write('<html>');
			res.write(section);
			res.write(code);
			res.end('</html>');
	}
})

app.listen(3000, function(){
	console.log('running');
})

var section = `<section id='section1'></section>`;

var code = `<script>
		//fetch('https://50ncrkxdy7.execute-api.us-west-2.amazonaws.com/prod/listArticles')
		fetch('https://jaegnvmctc.execute-api.us-west-2.amazonaws.com/prod/list', {
		  method: 'POST', // or 'PUT'
		  body: JSON.stringify({
		  	UserId: "us-west-2:49307e47-8c31-4628-a607-a7eb852d50ae",
		  	//LastEvalVal: "2020-03-20T23:45:34.555Z"
		  }),
		})

		  .then((response) => {
		    return response.json();
		  })
		  .then((data) => {
		  	var body = data.Items.reduce(function(res, el){
		  		return res+=el.ArticleContent
		  	}, "");
		    
		    var section1 = document.getElementById('section1');
		    section1.innerHTML = body;
		  });
	</script>`;

function doParallel (async_calls, shared_callback) {
  var counter = async_calls.length;
  var all_results = [];
  function makeCallback (index) {
    return function () {
      counter --;
      var results = [];
      // we use the arguments object here because some callbacks 
      // in Node pass in multiple arguments as result.
      for (var i=0;i<arguments.length;i++) {
        results.push(arguments[i]);
      }
      all_results[index] = results;
      if (counter == 0) {
        shared_callback(all_results);
      }
    }
  }

  for (var i=0;i<async_calls.length;i++) {
    async_calls[i](makeCallback(i));
  }
}
function callA(cb){
	var params = {
		Bucket: bucket,
		Key: "user/"+user+"/page/"+page
	};
	s3.getObject(params, function(err, data) {
		if (err) {
			console.error(err);
			return cb(err);
		} else { 
			return cb(null, data);
		}
	});
}

function callB(cb){
	const data = JSON.stringify({
  	UserId: "us-west-2:49307e47-8c31-4628-a607-a7eb852d50ae"
	})

	const options = {
	  hostname: 'jaegnvmctc.execute-api.us-west-2.amazonaws.com',
	  port: 443,
	  path: '/prod/list',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const req = https.request(options, res => {
	  var data = '';
	  res.on('data', d => {
	    	data += d.toString('utf8');
	  });
	  res.on('end', function(){
	  	return cb(null, data);
	  })
	})

	req.on('error', error => {
	  return cb(error);
	})

	req.write(data)
	req.end()
}

function callC(cb){
	const data = JSON.stringify({
  	DomainName: "artof-adulting.blog"
	})

	const options = {
	  hostname: 'ou4dst87ad.execute-api.us-west-2.amazonaws.com',
	  port: 443,
	  path: '/prod/list',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const req = https.request(options, res => {
	  var data = '';
	  res.on('data', d => {
	    	data += d.toString('utf8');
	  });
	  res.on('end', function(){
	  	return cb(null, data);
	  })
	})

	req.on('error', error => {
	  return cb(error);
	})

	req.write(data)
	req.end()
}

function callD(cb){
	const data = JSON.stringify({
  	DomainName: "artof-adulting.blog"
	})

	const options = {
	  hostname: '6y3bnx93ub.execute-api.us-west-2.amazonaws.com',
	  port: 443,
	  path: '/prod/list',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'Content-Length': data.length
	  }
	}

	const req = https.request(options, res => {
	  var data = '';
	  res.on('data', d => {
	    	data += d.toString('utf8');
	  });
	  res.on('end', function(){
	  	return cb(null, data);
	  })
	})

	req.on('error', error => {
	  return cb(error);
	})

	req.write(data)
	req.end()
}

