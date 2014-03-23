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
        listeners: {
            load : function(store, response) {
                console.log('LoadSessionStore: ' + Ext.getStore('Sessions').getCount());
            },
            write: function(store, operation){
                var record = operation.getRecords()[0],
                    name = Ext.String.capitalize(operation.action),
                    verb;
                
                if (name == 'Destroy') {
                    record = operation.records[0];
                    verb = 'Destroyed';
                } else {
                    verb = name + 'd';
                }
                Ext.example.msg(name, Ext.String.format("{0} user: {1}", verb, record.getId()));
            }
        }
    }
});
