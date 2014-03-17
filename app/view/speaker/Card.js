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
                xtype: 'formpanel',
                items: [
                    
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '50%'
                        },
                        disabled: true,
                        title: 'Current',
                        items: [
                        	{
                                xtype: 'textfield',
                                label: 'Position',
                                name: 'Position'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Course Subject',
                                name: 'courseSubject'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Course Number',
                                name: 'courseNumber'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Holder Name',
                                name: 'holderName'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '50%'
                        },
                        disabled: true,
                        title: 'OH Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Start Time',
                                name: 'startTime'
                            },
                            {
                                xtype: 'textfield',
                                label: 'End Time',
                                name: 'endTIme'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Location',
                                name: 'location'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id: 'quitButton',
                        text: 'Quit the queue',
                        align: 'center',
                        hidden: false
                    }   
                ]
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

		]
	}
});
