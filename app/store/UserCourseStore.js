Ext.define('testapp.store.UserCourseStore', {
	extend: 'Ext.data.Store',

    config: {

        model: 'testapp.model.UserCourse',

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
