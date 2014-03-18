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
        autoLoad: false,
        autoSync: false,
        listeners: {
            load : function(store, response) {
                /*Ext.Array.each(response, function(proposal) {
                    proposalModel = Ext.create('testapp.model.Session', proposal.data);
                    Ext.getStore('Sessions').add(proposalModel);
                });*/
                console.log(Ext.getStore('Sessions').getCount());
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
    /*callFnAndSaveStoreState: function(fn,scope) {
        // Save state
        var orig = this.autoSave,
        modified = [].concat(this.modified),
        removed = [].concat(this.removed);
        this.autoSave = false;

        fn.call(scope);

        // Restore state
        this.autoSave = orig;
        this.modified = modified;
        this.removed  = removed;
    },
    locallyAdd: function(rec) {
        this.callFnAndSaveStoreState(function(){
            this.add(rec);
        },this);
    }*/
});
