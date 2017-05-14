var feedback    = document.getElementById('feedback');
var searchform  = document.getElementById('searchform');
var results     = document.getElementById('results'),

searchform.addEventListener('submit', function (e) {
  e.preventDefault();
  results.innerHTML = '';
  var f = 'query=' + document.getElementById('search-box').value;
  return submitForm(f);
});

function submitForm (formdata) {
  var xhr = new XMLHttpRequest();

  xhr.open(searchform.method, searchform.action, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    var d = data.length;

    if (d === 0) {
      feedback.textContent = 'Sorry, no matches found.';
      feedback.style.color = 'crimson';
    }

    while (d--) {
      addMatchingPost(data[d].ref);
    }
  };

  xhr.onerror = function () {
    feedback.innerHTML = '<span class="error">Sorry, there was a technical error. Please try again later.</span>';
  };

  xhr.send(formdata);
}

function addMatchingPost (idno) {
  var apicall = new XMLHttpRequest();

  apicall.open('GET', ghost.url.api('posts'), true);

  apicall.onload = function () {
    var results = document.getElementById('results');
    var posts = JSON.parse(apicall.responseText).posts;
    var j = posts.length;
    var htmlstring;
    var len;
    var info;

    while (j--) {
      if (posts[j].id === idno) {
        htmlstring += (
          '<a class="search-result" href="' + posts[j].url + '">' +
            '<h3>' + posts[j].title + '</h3>' +
            '<p>' + posts[j].meta_description + '</p>' +
            '<time datetime="' + (new Date(posts[j].published_at)) + '">' +
              (new Date(posts[j].published_at)).toLocaleDateString() +
            '</time>' +
          '</a>'
        );
      }
    }

    results.insertAdjacentHTML('beforebegin', htmlstring);

    len = document.querySelectorAll('.search-result').length;
    info = len === 1 ? ' result found' : ' results found';

    feedback.textContent = len + info;
    feedback.style.color = 'green';
  };

  apicall.onerror = function () {
    feedback.innerHTML = '<span class="error">Sorry, there was a technical error. Please try again later.</span>';
  };

  apicall.send();
}
