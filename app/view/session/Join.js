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
                layout: {
                    pack: 'center',
                    type: 'vbox',
                    align: 'center'
                },
                items: [
                    
                    {
                        xtype: 'fieldset',
                        width: Ext.Viewport.getWindowWidth()*0.98,
                        defaults: {
                            labelWidth: '50%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'First Name',
                                name: 'firstName',
                                disabled: true
                            },
                            {
                                xtype: 'textfield',
                                label: 'Last Name',
                                name: 'lastName',
                                disabled: true,
                            },
                            {
                                xtype: 'textfield',
                                label: 'Location',
                                name: 'position'
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        id: 'saveButtonJoin',
                        text: 'Join',
                        ui: 'btnColor',
                        align: 'center',
                        width: Ext.Viewport.getWindowWidth()*0.98,
                        
                        //width: 100,
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
