var http = require('http');
var fs = require('fs');

var app = http.createServer(function(req, res){
	switch(req.url){
		case '/':
			var stream = fs.createReadStream(__dirname+'/optionA.html');
			stream.pipe(res);
			break;
		default:
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
		    console.log(data);
		    var section1 = document.getElementById('section1');
		    section1.innerHTML = body;
		  });
	</script>`;