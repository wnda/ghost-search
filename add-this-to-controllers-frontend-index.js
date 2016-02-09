// var ...
elasticlunr = require('elasticlunr'),

// frontendControllers = {
// ...
procSearch: function liveSearch(req, res){

        var query = req.body.query;

        function build_index(apidata){
            var docs=[];
            for(var i=apidata.posts.length,j=0;j<i;j++){
              docs.push({
                "id":apidata.posts[j].id,
                "title":apidata.posts[j].title,
                "body":apidata.posts[j].markdown
              });
            }
            return search(docs);
        }
        
        function search(docs){
          var idx=elasticlunr();
              idx.addField('title');
              idx.addField('body');
              idx.setRef('id');
              idx.saveDocument(false);

          for(var i=docs.length,j=0;j<i;j++){
            idx.addDoc(docs[j]);
          }
          
          function find_matches(query){
            return idx.search(query,{
              fields:{
                title:{
                  boost:2,
                  bool:"AND"
                },
                body:{boost:1}
              },
              bool:"OR",
              expand:true
            });
          }
          return find_matches(query);
        }
        
        api.posts.browse({status:'published',include:'title,tags,markdown'})
        .then(function (result){
            return res.status(200).send(build_index(result))})
        .catch(function (error){
            return res.status(200).send("Error: ",error);
        });
        
    },
    // next controller
