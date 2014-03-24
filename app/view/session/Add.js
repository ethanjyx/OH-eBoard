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
                            labelWidth: '50%'
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
                                name: 'holderName',
                                disabled: true
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: '50%'
                        },
                        title: 'Information',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Start Time',
                                name: 'startTime',
                                listeners: {
                                    focus: function() {
                                        //if (!this.picker)

                                        var i,
                                        data_hours = [],
                                        data_minuts = [],
                                        data_AMPM = [],
                                        //stringVal,
                                        that = this;
                                        for(i=1; i<13; i++) {
                                            data_hours.push({
                                                text: i,
                                                value: i
                                            });
                                        }   
                                        data_minuts.push({
                                            text: '00',
                                            value: '00'
                                        });
                                        var val = 1;
                                        for(i=0; i<59; i++) {
                                            if (i < 9) 
                                                data_minuts.push({
                                                    text: '0'+val,
                                                    value: '0'+val
                                                });
                                            else 
                                                data_minuts.push({
                                                    text: val,
                                                    value: val
                                                });
                                            val = val + 1;
                                        }
                                        data_AMPM.push({
                                            text:'PM',
                                            value:'PM'
                                        });
                                        data_AMPM.push({
                                            text:'AM',
                                            value:'AM'
                                        });
                                    
                                   
                                        // Make the time picker...

                                        this.picker = Ext.create("Ext.Picker", {
                                            hidden: true,
                                            zIndex: 9999,
                                            slots: [{
                                                name: "hours",
                                                title: "Hours",
                                                data: data_hours
                                            },
                                            {
                                                name: "minuts",
                                                title: "Minuts",
                                                data: data_minuts
                                            },
                                            {
                                                name: "AMPM",
                                                title: "test",
                                                data: data_AMPM
                                            }],
                                            listeners: {
                                                change: function (picker, values) {
                                                    that.setValue(values.hours+':'+values.minuts+' '+values.AMPM);
                                                }
                                            }
                                        });
                                        Ext.Viewport.add(this.picker);
                                        this.picker.show();
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                label: 'End Time',
                                name: 'endTime',
                                listeners: {
                                    focus: function() {
                                        var i,
                                        data_hours = [],
                                        data_minuts = [],
                                        data_AMPM = [],
                                        //stringVal,
                                        that = this;
                                        for(i=1; i<13; i++) {
                                            data_hours.push({
                                                text: i,
                                                value: i
                                            });
                                        }   
                                        data_minuts.push({
                                            text: '0',
                                            value: '0'
                                        });
                                        var val = 1;
                                        for(i=0; i<59; i++) {
                                            if (i < 9) 
                                                data_minuts.push({
                                                    text: '0'+val,
                                                    value: '0'+val
                                                });
                                            else 
                                                data_minuts.push({
                                                    text: val,
                                                    value: val
                                                });
                                            val = val + 1;
                                        }
                                        data_AMPM.push({
                                            text:'PM',
                                            value:'PM'
                                        });
                                        data_AMPM.push({
                                            text:'AM',
                                            value:'AM'
                                        });
                                    
                                        
                                   
                                        // Make the time picker...

                                        this.picker = Ext.create("Ext.Picker", {
                                            hidden: true,
                                            zIndex: 9999,
                                            slots: [{
                                                name: "hours",
                                                title: "Hours",
                                                data: data_hours
                                            },
                                            {
                                                name: "minuts",
                                                title: "Minuts",
                                                data: data_minuts
                                            },
                                            {
                                                name: "AMPM",
                                                title: "test",
                                                data: data_AMPM
                                            }],
                                            listeners: {
                                                change: function (picker, values) {
                                                    that.setValue(values.hours+':'+values.minuts+' '+values.AMPM);
                                                }
                                            }
                                        });
                                        Ext.Viewport.add(this.picker);
                                        this.picker.show();
                                    }
                                }
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
                        ui: 'btnColor',
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
