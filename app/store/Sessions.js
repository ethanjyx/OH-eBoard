Ext.define('testapp.store.Sessions', {
	extend: 'Ext.data.Store',

    config: {

        model: 'testapp.model.Session',

        grouper: {
            sortProperty: 'courseSubject',
            groupFn: function(record) {
                return record.get('courseSubject');
            }
        },

        sorters: [
            {
                property: 'courseSubject',
                direction: 'ASC'
            },
            {
                property: 'courseNumber',
                direction: 'ASC'
            }
        ],
        autoSync: true,
        proxy: {
            type: 'rest',
            useDefaultXhrHeader: false,
            url: 'https://api.parse.com/1/classes/courseOH',
            headers: {
                'X-Parse-Application-Id' : "Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", 
                'X-Parse-REST-API-Key' : "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g",
                'Content-Type' : 'application/json'
            },
            writer: {
                type: 'json',
                idProperty: 'objectId'
            },
            reader: {
                type: 'json',
                rootProperty: 'results',
                idProperty: 'objectId'
            }
        }
    }
});
