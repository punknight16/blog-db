# blog-db


This is an example of three progressively complex ways to setup a blog.

The '/ajax' way is to send an ajax call as an html page, and then have the ajax call run on page load

The '/template' way is to send a template page that makes an ajax call to a db on page load

the '/parallel' way is to make three database calls in parallel and then create a page on the fly before sending it to the client. This parallel way is necessary for Google Adsense because Adsense doesn't support ajax calls.

run "node parellel.js" to see an example.