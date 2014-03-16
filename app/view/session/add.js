Ext.define('testapp.view.session.Add', {
    extend: 'Ext.Container',
    xtype: 'session-add',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        title: 'Add new session',
        layout: 'fit',

        items: [
            {
                xtype: 'formpanel',
                items: [
                    
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '35%'
                        },
                        title: 'Course',
                        items: [
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
                            labelWidth: '35%'
                        },
                        title: 'Information',
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
                        id: 'saveButtonAdd',
                        text: 'Add',
                        align: 'center',
                        hidden: false
                    }   
                ]
            }
        ],

        listeners: {
            delegate: 'textfield',
            keyup: 'onKeyUp'
        },

        record: null
    },

    updateRecord: function(newRecord) {
        this.down('formpanel').setRecord(newRecord);
    },

    saveRecord: function() {
        var formPanel = this.down('formpanel'),
            record = formPanel.getRecord();

        formPanel.updateRecord(record);

        return record;
    },

    onKeyUp: function() {
        this.fireEvent('change', this);
    }
});
