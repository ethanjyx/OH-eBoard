Ext.define('testapp.controller.Sessions', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			sessions: 'sessions',
			session: 'session',
			sessionInfo: 'sessionContainer sessionInfo',
			sessionSpeakers: 'sessionContainer list',
			sessionContainer: 'sessionContainer',
			sessionDayPicker: 'sessions segmentedbutton',
			addButton: '#addButton',
			saveButtonAdd: '#saveButtonAdd',
			joinButton: '#joinButton',
			saveButtonJoin: '#saveButtonJoin',
			sessionAdd: 'session-add',
			sessionJoin: 'session-join',
			historyButton: '#historyButton',
			speakers: 'sessionContainer speakers',
			speakerInfo: 'sessionContainer speakerInfo'
		},
		control: {
			sessions: {
				initialize: 'initSessions',
				itemtap: 'onSessionTap',
				activate: 'onSessionsActivate'
			},
			addButton: {
				tap: 'onAddButton'
			},
			saveButtonAdd: {
				tap: 'onSaveButtonAdd'
			},
			joinButton: {
				tap: 'onJoinButton'
			},
			saveButtonJoin: {
				tap: 'onSaveButtonJoin'
			},
			sessionDayPicker: {
				toggle: 'onSessionDateChange'
			},
			speakers: {
				itemtap: 'onSpeakerTap'
			}
		}
	},

	initSessions: function() {
		//var firstButton = this.getSessionDayPicker().getItems().items[0];
		//this.getSessionDayPicker().setPressedButtons(firstButton);
		//this.filterByButton(firstButton);
	},

	onSessionDateChange: function(seg, btn, toggle) {
        if (toggle) {
            //this.filterByButton(btn);
        }
	},

	filterByButton: function(btn) {
		if (this.getSessionSpeakers()) {
			this.getSessionSpeakers().deselectAll();
		}
		Ext.getStore('Sessions').clearFilter(true);
		Ext.getStore('Sessions').filter(function(record) {
			return record.get('time').getDate() == btn.config.day;
		});
	},

	onAddButton: function() {
        if (!this.sessionAdd) {
            this.sessionAdd = Ext.create('testapp.view.session.add');
        }

        // Bind the record onto the edit contact view
        //TODO: set default value into the form.
//        this.sessionAdd.setRecord(this.getShowContact().getRecord());

        this.getSessionContainer().push(this.sessionAdd);

    },

    onSaveButtonAdd: function() {

    	//TODO: add the new session into database
        //var record = this.getEditContact().saveRecord();

        //this.getShowContact().updateRecord(record);

        this.getSessionContainer().pop();
    },

    onJoinButton: function() {
        if (!this.sessionJoin) {
            this.sessionJoin = Ext.create('testapp.view.session.join');
        }

        // Bind the record onto the edit contact view
        //TODO: set default value into the form.
//        this.sessionAdd.setRecord(this.getShowContact().getRecord());

        this.getSessionContainer().push(this.sessionJoin);

    },

    onSaveButtonJoin: function() {

    	//TODO: add the new session into database
        //var record = this.getEditContact().saveRecord();

        //this.getShowContact().updateRecord(record);

        this.getSessionContainer().pop();
    },

	onSessionTap: function(list, idx, el, record) {
		var speakerStore = Ext.getStore('SessionSpeakers'),
			speakerIds = record.get('speakerIds');

		speakerStore.clearFilter(true);
		speakerStore.filterBy(function(speaker) {
			return Ext.Array.contains(speakerIds, speaker.get('id'));
		});

		if (!this.session) {
			this.session = Ext.widget('session');
		}

		this.session.setTitle(record.get('title'));
		this.getSessionContainer().push(this.session);
		//this.getSessionInfo().setRecord(record);
	},

	onSpeakerTap: function(list, idx, el, record) {
		if (!this.speakerInfo) {
			this.speakerInfo = Ext.widget('speakerInfo', {
				scrollable: 'vertical'
			});
		}

		this.speakerInfo.config.title = record.getFullName();
		this.speakerInfo.setRecord(record);
		this.getSessionContainer().push(this.speakerInfo);
	},

	onSessionsActivate: function() {
		if (this.session) {
			this.session.down('speakers').deselectAll();
		}
	}
});
