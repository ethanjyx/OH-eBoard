Ext.define('testapp.view.session.Load', {
	/*initialize: function() {
		parse = this.getParseClient();
	},*/
	singleton: true,
	loadCourseList: function (parse, callback){
		var sessionStore = Ext.getStore('Sessions'), proposalModel;

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
	}
});