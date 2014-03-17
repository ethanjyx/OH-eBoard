Ext.define('testapp.view.session.Load', {
    singleton: true,

    loadCourseList: function (callback){
        var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
        var sessionStore = Ext.getStore('Sessions'), proposalModel;
        sessionStore.removeAll();

        parse.query({
            success: function(result) {
                console.log('Get course list from server');
                for(var i = 0; i < result.results.length; i++) {
                    console.log(result.results[i].courseSubject + ' ' + result.results[i].courseNumber);
                }

                Ext.Array.each(result.results, function(proposal) {
                    proposalModel = Ext.create('testapp.model.Session', proposal);
                    sessionStore.add(proposalModel);
                });

                callback();
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'courseOH'
        });

        /*var result = Ext.create('testapp.model.Session', {});

        testapp.model.Session.load(1, {
            success: function() {
                console.log('Get course list from server');
                for(var i = 0; i < result.results.length; i++) {
                    console.log(result.results[i].courseSubject + ' ' + result.results[i].courseNumber);
                }

                Ext.Array.each(result.results, function(proposal) {
                    proposalModel = Ext.create('testapp.model.Session', proposal);
                    sessionStore.add(proposalModel);
                });

                callback();
            },
            error: function(result) {
                return alert("A query error occured");
            }
        });*/
    }
});