Ext.define('testapp.model.JoinUser', {
	extend: 'Ext.data.Model',

	config: {
		idProperty: 'objectId',
		fields: [
			{name: 'id', type: 'string'},
			{name: 'objectId', type: 'string'},
			{name: 'position', type: 'string'},
			{name: 'history', type: 'boolean'},
    		{name: 'firstName', mapping: 'user.firstName'},
    		{name: 'lastName', mapping: 'user.lastName'},
    		{name: 'userObjectId', mapping: 'user.objectId'},
    		{name: 'facebookId', mapping: 'user.facebookId'}	
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