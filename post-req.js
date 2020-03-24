const https = require('https')

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
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(JSON.stringify(d.toString()))
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()