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
		]
	}
});