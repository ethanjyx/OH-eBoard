Ext.define('testapp.view.session.Join', {
    extend: 'Ext.Container',
    xtype: 'session-join',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text'
    ],

    config: {
        title: 'join',
        layout: 'fit',

        items: [
            {
                xtype: 'formpanel',
                items: [
                    
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '50%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'First Name',
                                name: 'firstName'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Last Name',
                                name: 'lastName'
                            },
                            {
                                xtype: 'textfield',
                                label: 'Position',
                                name: 'position'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id: 'saveButtonJoin',
                        text: 'Join',
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
