Ext.define('testapp.store.SpeakerSessions', {
	extend: 'Ext.data.Store',

    config: {
        model: 'testapp.model.Session',

        sorters: [
            {
                property: 'time',
                direction: 'ASC'
            }
        ]
    }
});
