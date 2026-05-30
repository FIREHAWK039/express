const http = require('http');     //importing http module // http module is used to create a server and handle HTTP requests and responses. It provides functionalities for building web applications and APIs.
const fs = require('fs');
const url = require('url')

    function myhandler(req, response){
            if (req.url === "/favicon.ico") return response.end();//ignores  req from favicaon
    const log = `${Date.now()}: ${req.url} ${req.method} New request recived\n`
    const Myurl = new URL(req.url, 'http://localhost:3000');

    console.log(Myurl)
    fs.appendFile("log.txt", log, (err, data) => {
        switch (Myurl.pathname) {
            case "/":
                if (req.method === "GET") {
                    response.end("HomePage");
                }
                break
            case "/about":
                const username = Myurl.searchParams.get('myname');
                response.end(`hi ${username}`);
                break;
            case "/search":
                const search = Myurl.searchParams.get('search');
                response.end("Here are your results for " + search);
                break;
            case "/signup":
                if (req.method === "GET") {
                    return response.end("This is a signup Form");
                } else if (req.method === "POST") {
                
                    // DB Query
                    response.end("Success");
                }
            default: response.end("404 not foound");
           
        }
    })
}

const Myserver = http.createServer(app);    //server is created with 2 callbacks or parameters req and response. req=send res=give




       


Myserver.listen(3000, () => console.log("server is running"))