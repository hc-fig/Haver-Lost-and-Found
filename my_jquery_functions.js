var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
var $ = document.getElementsByTagName('head')[0].appendChild(script);

$(document).ready(function(){
    $("button").click(function(){
        $("form").hide();
    });
    
    $("body").click(function(){
        $("form").hide();
    });
});