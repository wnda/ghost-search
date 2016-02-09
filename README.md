Server-side search for Ghost blogs using elasticlunr
=========================================================

This is a hacky but functional way of offering search on your Ghost blog.

### Why do it this way instead of using GhostHunter?

1. No jQuery dependency.
jQuery was the bee's knees half a decade ago. Now it's unneeded overhead, providing neither cross-platform benefits nor structuring, while considerably slowing down performance.
    
2. The alternative is client-side.
You can direct users to a search page, requiring no JavaScript for the client.
This repo contains two approaches: server-side and ajax. Thanks to elasticlunr being included as a module for your node app on the server, you don't need the client to have JavaScript switched on for it to work, you just need to create a new route and controller and pass it data. We build an index of posts and use elasticlunr to query that index for the search term. It can work with or without Ajax. The demo I've constructed uses ajax as it is more complicated to setup and probably more desirable for most.
    
3. The alternative scrapes the RSS feed rather than querying the Ghost API.
It's just better to use the API. It's a lot simpler to capture JSON objects and map them to DOM nodes, and there's also the issue that Ghost might not keep the RSS feed around forever.
    
4. This solution upgrades to elasticlunr.
[Elasticlunr](http://elasticlunr.com/ "elasticlunr") is a fork of lunr which adds some cool features to improve search fidelity. Well worth it.
    
    
### How to use this script

First, get elasticlunr:
`npm install elasticlunr`

Next, add the route you want to use:
`cd /var/www/ghost/core/server/routes && sudo nano frontend.js`

Append:
`router.post('/search', frontend.ghostSearch);`

Save. Then

Let's get the controller in place:
`cd /var/www/ghost/core/server/controllers/frontend/ && sudo nano index.js`

Finally, let's consider the view.
`cd /var/www/ghost/content/themes/YOUR-THEME/YOUR-SEARCH-TEMPLATE.hbs`

Either include the form and JavaScript as is or muddle with the attributes to suit your application--just don't forget to reflect the changes in your route and/or controller.
