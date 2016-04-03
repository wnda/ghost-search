// var ...
elasticlunr = require('elasticlunr'),

// frontendControllers = {
// ...
ghostSearch: function ghostSearch(req, res){

        var dataquery = req.body.query;

        function dataset(apidata){
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

          function matches(dataquery){
            return idx.search(dataquery,{
              fields:{
                title:{boost:2,expand:true},
                body:{boost:1}
              },
              bool:"OR"
            });
          }
          return matches(dataquery);
        }

        api.posts.browse({status:'published',include:'title,markdown'})
        .then(function (result){
            return res.status(200).send(dataset(result))})
        .catch(function (error){
            return res.status(200).send("Error: ",error);
        });

    },
    // next controller
