Ext.define('testapp.store.Sessions', {
	extend: 'Ext.data.Store',

	requires: 'Ext.DateExtras',

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
        ]
    }
});
