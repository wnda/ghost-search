"use strict";
function submitForm(f){
 function postContent(idno){
 var apicall = new XMLHttpRequest();
     apicall.onload=function(){
         var results = document.getElementById('results'),
             index=JSON.parse(apicall.responseText),
             posts=index.posts,
             j=posts.length;
         while(j--){
             if (posts[j].id == idno){
                 var rescont  = document.createElement('div'),
                     post     = document.createElement('a'),
                     title    = document.createElement('h3'),
                     bodytext = document.createElement('p'),
                     bodydate = document.createElement('p'),
                     pdate = new Date(posts[j].published_at);
                 rescont.className="cell cell-sm-12 cell-md-12 cell-lg-12 cell-header";
                 post.className="search-result"
                 title.textContent=posts[j].title;
                 bodytext.textContent=posts[j].meta_description;
                 var fdate=pdate.toLocaleDateString();
                 bodydate.innerHTML="<time datetime='"+fdate+"'>"+fdate+"</time>"
                 post.appendChild(title);
                 post.appendChild(bodytext);
                 post.appendChild(bodydate);
                 post.href=posts[j].url;
                 post.title=posts[j].title;
                 rescont.appendChild(post);
                 results.insertBefore(rescont,results.firstChild);
             }
         }
         var m=document.querySelectorAll(".search-result");
         var k=m.length===1?" result found":" results found";
         feedback.textContent=m.length+k;
         feedback.style.color="green";
     }
     apicall.onerror = function(){feedback.innerHTML='<span class="error">Sorry, there was a technical error. Please try again later.</span>';}
     apicall.open("GET",ghost.url.api('posts'), true);
     apicall.send();
}
 var feedback    = document.getElementById('feedback');
 var searchform  = document.forms['searchform'];
 var xhr         = new XMLHttpRequest();
 xhr.onload      = function(){
     var data=JSON.parse(xhr.responseText);
     var d=data.length;
     if (d===0){feedback.textContent="Sorry, no matches found.";feedback.style.color="crimson";}
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
 var searchform    = document.forms["searchform"],
     searchpanel   = document.getElementById("searchpanel"),
     results       = document.getElementById("results"),
     searchoverlay = document.getElementById("searchoverlay"),
     feedback      = document.getElementById("feedback"),
     searchclose   = document.getElementById('searchclose'),
     roothtml      = document.getElementsByTagName('html')[0];

 searchoverlay.addEventListener("click", function(){
   this.className="";
   searchpanel.className="";
   roothtml.className="";
   results.innerHTML="";
   feedback.innerHTML="";
 });

 searchclose.addEventListener("click", function(){
   searchpanel.className="";
   searchoverlay.className="";
   roothtml.className="";
   results.innerHTML="";
   feedback.innerHTML="";
 });

 searchform.addEventListener("submit",function(e){
   e.preventDefault();
   results.innerHTML="";
   searchpanel.className="is-active";
   searchoverlay.className="is-active";
   roothtml.className="noverflow";
   var formString=(function(){
       return function(){
         var queryInput = document.getElementById("search-box"),
             query      = queryInput.value;
         return "query="+query;
       }
   })();
   var f=formString();
   return submitForm(f);
 });
}();
