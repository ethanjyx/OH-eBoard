Ext.define('testapp.model.UserCourse', {
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'objectId',
		fields: [
			{name: 'id', type: 'string'},
			{name: 'objectId', type: 'string'},
			{name: 'history', type: 'boolean'},
    		{name: 'courseSubject', mapping: 'courseOH.courseSubject'},
    		{name: 'courseNumber', mapping: 'courseOH.courseNumber'},
            {name: 'holder', mapping: 'courseOH.holder'},
            {name: 'startTime', mapping: 'courseOH.startTime'},
            {name: 'endTime', mapping: 'courseOH.endTime'},
            {name: 'location', mapping: 'courseOH.location'},
            {name: 'holderName', mapping: 'courseOH.holderName'},
            {name: 'courseObjectId', mapping: 'courseOH.objectId'}
		],
		proxy: {
            type: 'rest',
            useDefaultXhrHeader: false,
            url: 'https://api.parse.com/1/classes/JoinTable',
            headers: {
                'X-Parse-Application-Id' : "Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", 
                'X-Parse-REST-API-Key' : "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g",
                'Content-Type' : 'application/json'
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
	}
});