Ext.define('testapp.view.speaker.Card', {

	extend: 'Ext.Container',
	xtype: 'speakerContainer',

	requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

	config: {

		tab: {
			title: 'Me',
			iconCls: 'user',
			action: 'speakersTab'
		},

        autoDestroy: false,
        layout: 'fit',
		items: [

			{
                xtype: 'titlebar',
                title: 'Me',
                docked: 'top',
                
            },
            {
                xtype: 'userCourseList',
                store: 'userCourseStore',
                grouped: true,
                pinHeaders: false
            }
             
            /*
            {
            	xtype: 'panel',
            	items: [

            	],
				html: [
				'<h3>Current: <small>{room}</small></h3>',
				'<h4>{proposal_type} at {[this.formatTime(values.time)]}</h4>',
				'<p>{description}</p>']
            }
		
			{
				xtype: 'speakers',
				store: 'Speakers',
				grouped: true,
				pinHeaders: false
			}
			*/

		],

	 	listeners: {
            keyup: 'onKeyUp'
        },

        record: null
    },

    updateRecord: function(newRecord) {
        this.down('formpanel').setValues(newRecord);

    },

    saveRecord: function() {
        var formPanel = this.down('formpanel'),
            record = formPanel.getValues();

        formPanel.updateRecord(record);

        return record;
    },

    onKeyUp: function() {
        this.fireEvent('change', this);
    }
});
