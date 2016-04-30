Server-side search for Ghost blogs using elasticlunr
=========================================================

This is a hacky but functional way of offering search on your Ghost blog.

### Why do it this way instead of using GhostHunter?

1. GhostHunter requires jQuery.
jQuery was the bee's knees half a decade ago. Now it's just overhead.
    
2. GhostHunter is client-side
You can theoretically redirect users to a search results page, requiring no JavaScript for the client. Thanks to elasticlunr being included as a module for your node app on the server, you don't need the client to have JavaScript switched on for it to work, you just need to create a new route and controller and pass it data. We build an index of posts and use elasticlunr to query that index for the search term. It can work with or without Ajax. The demo I've constructed uses ajax as it is more complicated to setup and probably more desirable for most.
    
3. The alternative scrapes the RSS feed rather than querying the Ghost API.
It's just better to use the API. It's a lot simpler to capture JSON objects and map them to DOM nodes, and there's also the issue that Ghost might not keep the RSS feed around forever.
    
4. This solution upgrades to elasticlunr.
[Elasticlunr](http://elasticlunr.com/ "elasticlunr") is a fork of lunr which adds some cool features to improve search fidelity. Well worth it.
    
    
### How to use ghost-search

You'll obviously need to have a Ghost blog. You can add this before or after you install your Ghost blog, but it's probably easier after you have a few posts so you can test it properly.

First, get elasticlunr and add it to your other npm modules in Ghost:
`cd /var/www/ghost`
`npm install elasticlunr`

Next, add the route you want to use:
`cd /var/www/ghost/core/server/routes && sudo nano frontend.js`

Append:
`router.post('/search', frontend.ghostSearch);`

Save and exit. 

Then, get the search controller in place:
`cd /var/www/ghost/core/server/controllers/frontend/ && sudo nano index.js`

Append the aptly named script. Save and exit.

Finally, let's consider the view.
`cd /var/www/ghost/content/themes/YOUR-THEME/partials/YOUR-SEARCH-TEMPLATE.hbs`

Either include the form and JavaScript as is or muddle with the attributes to suit your application--just don't forget to reflect the changes in your route and/or controller.

This is pretty damned fast. Even if you like jQuery on the client-side, you should still implement search with this controller because it will enable you to tap in to the Ghost API rather than scrape the RSS feed. This method has a lot more potential in general. 

And yes, obviously it can be done without JavaScript (which is why it's better than Ghosthunter) i.e. you can post the values to the server in the traditional no-JS way and still return search results, though the results need to be passed on to a search results page which I will demonstrate at some point.
