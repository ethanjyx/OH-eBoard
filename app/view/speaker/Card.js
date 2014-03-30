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
            id: 'meTab',
			iconCls: 'user',
			action: 'speakersTab'
		},

        autoDestroy: false,
        layout: 'fit',
/*        navigationBar: {
            splitNavigation: (Ext.theme.name == "Blackberry") ? {
                xtype: 'toolbar',
                items: [{
                    docked: 'right',
                    xtype: 'button',
                    iconCls: 'time',
                    hidden: true
                }]
            } : false,
            title: 'Me',
            //ui: (Ext.theme.name == "Blackberry") ? 'light' : 'sencha',
            items: [
                {
                    xtype: 'button',
                    id: 'logoutButton',
                    text: 'Logout',
                    align: 'right',
                    //hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },
*/		items: [

			{
                xtype: 'titlebar',
                title: 'Me',
                docked: 'top',
                items:[
                   {
                        xtype: 'button',
                        id: 'logoutButton',
                        text: 'Logout',
                        align: 'right',
                        //hidden: true,
                        hideAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeOut',
                            duration: 200
                        },
                        showAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeIn',
                            duration: 200
                        }
                    } 
                ]
            },
            
            {
                xtype: 'tabs'
                /*store: 'UserCourseStore',
                grouped: true,
                pinHeaders: false*/
            }
             /*
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
                    */
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
        }

       // record: null
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
