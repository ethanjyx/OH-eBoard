Ext.define('testapp.controller.Sessions', {
	extend: 'Ext.app.Controller',

	requires: ['testapp.Facebook'],

	config: {
		refs: {
			sessions: 'sessions',
			session: 'session',
			sessionInfo: 'sessionContainer sessionInfo',
			sessionSpeakers: 'sessionContainer list',
			sessionContainer: 'sessionContainer',
			//sessionDayPicker: 'sessions segmentedbutton',
			addButton: '#addButton',
			saveButtonAdd: '#saveButtonAdd',
			joinButton: '#joinButton',
			saveButtonJoin: '#saveButtonJoin',
			sessionAdd: 'session-add',
			sessionJoin: 'session-join',
			listHistory: 'list-history',
			historyButton: '#historyButton',
			speakers: 'sessionContainer speakers',
			speakerInfo: 'sessionContainer speakerInfo'
		},
		control: {
			sessionContainer: {
				push: 'onMainPush',
                pop: 'onMainPop'
			},
			historyButton: {
				tap: 'onHistoryButton'
			},
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
			speakers: {
				itemtap: 'onSpeakerTap'
			}
		},
		thisObjectId: null
	},

	onMainPush: function(view, item) {
        var historyButton = this.getHistoryButton();

        if (item.xtype == "session") {
            this.getSessions().deselectAll();

            this.showHistoryButton();
        } else {
            this.hideHistoryButton();
        }
    },

    onMainPop: function(view, item) {
        if (item.xtype == "session-join") {
            this.showHistoryButton();
        } else {
            this.hideHistoryButton();
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

	onHistoryButton: function() {
        if (!this.listHistory) {
            this.listHistory = Ext.create('testapp.view.session.History');
        }

        // Bind the record onto the edit contact view
        //TODO: set default value into the form.
//        this.sessionAdd.setRecord(this.getShowContact().getRecord());

        this.getSessionContainer().push(this.listHistory);

    },

	onAddButton: function() {
		if (!this.sessionAdd) {
            this.sessionAdd = Ext.create('testapp.view.session.Add');
        }

		var session_add = this.getSessionAdd();

		FB.api('me?fields=first_name,last_name', function(response) {
			var record = session_add.saveRecord();
	
			record.holderName = response.first_name + ' ' + response.last_name;
			//record.holderName = "lalala";
			//alert(response.first_name);
			//reponse.id
			//alert(record.holderName);
			session_add.updateRecord(record);
			
			var ed = Ext.create('testapp.model.Speaker');
			ed.data.firstName = "Sally";
			ed.data.lastName = "Wei";
			ed.data.facebookId = "123456778";
			console.log(ed);
			var objectId;
			ed.save({
    			success: function(result) {
    				objectId = result.objectId;
        			console.log("Create new user " + testapp.controller.Sessions.thisObjectId);
        		}
    		});
    		this.thisObjectId = objectId;
		});



        // Bind the record onto the edit contact view
        //TODO: set default value into the form.
//        this.sessionAdd.setRecord(this.getShowContact().getRecord());

        this.getSessionContainer().push(this.sessionAdd);

    },

    onSaveButtonAdd: function() {
        //TODO: add the new session into database
        var record = this.getSessionAdd().saveRecord();
        console.log(record);

        //this.getShowContact().updateRecord(record);

		var ed = Ext.create('testapp.model.Session', record);
		console.log(ed);
		ed.save({
    		success: function(result) {
        		console.log("Create new OH session " + record.courseSubject + ' ' + record.courseNumber);
        	}
    	});

		testapp.view.session.Load.loadCourseList(function(){});
        this.getSessionContainer().pop();
    },

    onJoinButton: function() {
        if (!this.sessionJoin) {
            this.sessionJoin = Ext.create('testapp.view.session.Join');
        }

        var session_join = this.getSessionJoin();

		FB.api('me?fields=first_name,last_name', function(response) {
			var record = session_join.saveRecord();
	
			record.firstName = response.first_name;
			record.lastName = response.last_name;
			//record.holderName = "lalala";
			//alert(response.first_name);
			//reponse.id
			//alert(record.holderName);
			session_join.updateRecord(record);

			var ed = Ext.create('testapp.model.Speaker');
			ed.data.firstName = "Sally";
			ed.data.lastName = "Wei";
			ed.data.facebookId = "123456778";
			console.log(ed);
			var objectId;
			ed.save({
    			success: function(result) {
    				result.save();
    				console.log(result);
    				objectId = result.objectId;
    				console.log(result.objectId);
        			console.log("Create new user " + objectId);
        		}
    		});
    		this.thisObjectId = objectId;
		});

        // Bind the record onto the edit contact view
        //TODO: set default value into the form.
//        this.sessionAdd.setRecord(this.getShowContact().getRecord());

        this.getSessionContainer().push(this.sessionJoin);

    },

    onSaveButtonJoin: function() {

    	//TODO: add the new session into database
        //var record = this.getEditContact().saveRecord();

        //this.getShowContact().updateRecord(record);

        var record = this.getSessionJoin().saveRecord();
        console.log(record);
        console.log("Join save button " + this.thisObjectId);

		this.courseObjectId = 'ie5m1ivyxu';
        this.relation = {
        	waitingList : {
        		__op : "AddRelation",
        		objects: [{__type:"Pointer", className:"User", objectId:testapp.controller.Sessions.thisObjectId}]
        	}
        };

        var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");

        parse.addToRelation({
        	object: this.relation,
            success: function(result) {
                console.log('Join in course');
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'courseOH/' + this.courseObjectId
        });

        this.updatePosition = {position : record.position};
        parse.update({
        	object: this.updatePosition,
            success: function(result) {
                console.log('Join in course');
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'User',
            objectId: testapp.controller.Sessions.thisObjectId
        });       

		testapp.view.session.Load.loadCourseList(function(){});
        this.getSessionContainer().pop();
    },

	onSessionTap: function(list, idx, el, record) {
		/*var speakerStore = Ext.getStore('SessionSpeakers'),
			speakerIds = record.get('speakerIds');

		speakerStore.clearFilter(true);
		speakerStore.filterBy(function(speaker) {
			return Ext.Array.contains(speakerIds, speaker.get('id'));
		});*/

		var speakerStore = Ext.getStore('SessionSpeakers');
		speakerStore.removeAll();
		Ext.Array.each(record.waitingList, function(proposal) {
		    proposalModel = Ext.create('testapp.model.Speaker', proposal);
	        speakerStore.add(proposalModel);
		});

		if (!this.session) {
			this.session = Ext.widget('session');
		}

		this.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
		this.getSessionContainer().push(this.session);
		//this.getSessionInfo().setRecord(record);
	},

	onSpeakerTap: function(list, idx, el, record) {
		if (!this.speakerInfo) {
			this.speakerInfo = Ext.widget('speakerInfo', {
				scrollable: 'vertical'
			});
		}

		//this.speakerInfo.config.title = record.getFullName();
		//this.speakerInfo.setRecord(record);

		var items = [
			{
				text: 'Set as done',
				ui: 'decline',
				scope: this,
				handler: function() {
					//TODO: put the current one into history!
					this.actions.hide();
				}
			},
			{
				xtype: 'button',
				text: 'Cancel',
				scope: this,
				handler: function() {
					this.actions.hide();
				}
			}
		];
		if (!this.actions) {
			this.actions = Ext.create('Ext.ActionSheet', {
				items: items
			});
		}

		Ext.Viewport.add(this.actions);
		this.actions.show();
		//this.getSessionContainer().push(this.speakerInfo);
	},

	onSessionsActivate: function() {
		if (this.session) {
			this.session.down('speakers').deselectAll();
		}
	},

	showHistoryButton: function() {
        var historyButton = this.getHistoryButton();

        if (!historyButton.isHidden()) {
            return;
        }

        //this.hideSaveButton();

        historyButton.show();
    },

    hideHistoryButton: function() {
        var historyButton = this.getHistoryButton();

        if (historyButton.isHidden()) {
            return;
        }

        historyButton.hide();
    },
});
