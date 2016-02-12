   "use strict";

  function submitForm(f){
    function postContent(idno){
    var apicall = new XMLHttpRequest();
        apicall.onload=function(){
            var results = document.getElementById('results');
            var index=JSON.parse(apicall.responseText);
            var posts=index.posts;
            var j=posts.length;
            while(j--){
                if (posts[j].id == idno){
                    var post = document.createElement('article');
                    var title = document.createElement('h3');
                    var body = document.createElement('div');
                    title.textContent=posts[j].title;
                    body.innerHTML=posts[j].html;
                    post.appendChild(title);
                    post.appendChild(body);
                    results.appendChild(post);
                }
            }
        }
        apicall.onerror     = function(){feedback.innerHTML='<span class="error">Sorry, there was a technical error. Please try again later.</span>';}
        apicall.open("GET",ghost.url.api('posts'), true);
        apicall.send();
  }
    var feedback    = document.getElementById('feedback');
    var searchform  = document.forms['searchform'];
    var xhr         = new XMLHttpRequest();
    xhr.onload      = function(){
        var data=JSON.parse(xhr.responseText);
        var d=data.length;
        while(d--){
            var procdata=data[d];
            var idno = procdata.ref;
            postContent(idno);
        }
    }
    xhr.onerror     = function(){feedback.innerHTML='<span class="error">Sorry, there was a technical error. Please try again later.</span>';}
    xhr.open(searchform.method,searchform.action,true);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send(f);
  }

  !function(){
    var searchform         = document.forms['searchform'];
    var results = document.getElementById('results');
    searchform.addEventListener('submit',function(e){
      e.preventDefault();
      results.innerHTML='';
      function formString(){
        let queryInput= document.getElementById('query'),query = queryInput.value;
          return "query="+query;
      }

      var f = formString();
      return submitForm(f);
    });
  }();
