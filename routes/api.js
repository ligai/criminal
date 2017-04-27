const express = require('express')
const path = require('path')
const http = require('http')
const querystring = require('querystring')
const router = express.Router()

const api = 'http://10.167.174.162:8080/wenshu'

router.post('/search', (req, res) => {
  let postData = querystring.stringify(req.body)
  console.log(postData)
  var options = {
    hostname: '10.167.174.162',
    port: 8080,
    path: '/wenshu/search?' + postData
  }
  var oReq = http.request(options, (oRes) => {
    console.log(options)
    oRes.setEncoding('utf-8')
    let rawData = '';
    oRes.on('data', (chunk) => {
      rawData += chunk
    });
    oRes.on('end', () => {
      res.send(rawData)
    }); 
  })
  oReq.on('error', (e) => {
    console.log(`请求遇到问题: ${e.message}`);
  });

  oReq.end();
})

router.get('/content/detail2', (req, res) => {
  httpGet(req,res)
})


function httpGet(req, res) {
   console.log(1)
  console.log(req.originalUrl)
    console.log(api + req.originalUrl)
    // var options = {  
	//     hostname: '10.167.32.133',  // 代理域名
	//     port: 8080,    //代理端口号
	//     path: host + req.originalUrl,  
	//     method: 'GET',  
	//     headers: {  
	//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
	//     }  
	// }; 
    http.get(api + req.originalUrl, (response) => {
        var body = ''
        response.on('data', (chunk) => {
            body += chunk
        })
        response.on('end', () => {
            res.send(body)
        })
    }).on('error', (e) => {
        console.log(`Got error: ${e.message}`)
    })
}

module.exports = router