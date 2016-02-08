Server-side search for Ghost blogs using elasticlunr
=========================================================

This is a hacky but functional way of offering search on your Ghost blog.

### Why do it this way instead of using GhostHunter?

1. No jQuery dependency.
jQuery was the bee's knees half a decade ago. Now it's unneeded overhead, providing neither cross-platform benefits nor structuring, while considerably slowing down performance.
    
2. The alternative is client-side.
You can direct users to a search page, requiring no JavaScript for the client.
This repo contains two approaches: server-side and ajax. Thanks to elasticlunr being include as a module for your node app, you don't need the client to have JavaScript switched on for it to work. That said, who turns their JavaScript off? I do, maybe you do, but your users probably don't. 
    
3. Ajax is an option!
The ajax example includes live-reloading search results (when the form is submitted rather than then text input changes--this is my opinionated default because search engines piss me off when they try to guess what I am searching for, but this default could be amended pretty easily by swapping out the form submit handler for a onchange handler.
    
4. The alternative scrapes the RSS feed rather than querying the Ghost API.
It's just better to use the API. It's a lot simpler to capture JSON objects and map them to DOM nodes, and there's also the issue that Ghost might not keep the RSS feed around forever.
    
5. This solution upgrades to elasticlunr.
[Elasticlunr](http://elasticlunr.com/ "elasticlunr") is a fork of lunr which adds some cool features to improve search fidelity. Well worth it.
    
    
### How to use this script
`npm install elasticlunr`

`cd /var/www/ghost/core/server/controllers/frontend/index.js`

`cd /var/www/ghost/core/server/routes/frontend.js`

`cd /var/www/ghost/content/themes/YOUR-THEME/YOUR-SEARCH-TEMPLATE.hbs`
