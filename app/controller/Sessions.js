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
			speakers: 'sessionContainer speakers'
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
		}
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

		var that = this;

		FB.api('me?fields=first_name,last_name', function(response) {
			var record = session_add.saveRecord();	
			record.holderName = response.first_name + ' ' + response.last_name;

			session_add.updateRecord(record);
			
		});

        this.getSessionContainer().push(this.sessionAdd);
    },

    onSaveButtonAdd: function() {
        //Add the new session into database
        var record = this.getSessionAdd().saveRecord();
        console.log(record);

        record.numberServed = 0;
		var ed = Ext.create('testapp.model.Session', record);
		ed.data.id = ed.data.courseSubject + ed.data.courseNumber + ed.data.holderName;
		var that = this;
		ed.save({
    		success: function(result) {
        		console.log("Create new OH session " + ed.data.id);
                Ext.getStore('Sessions').load(function(){that.getSessionContainer().pop()});
        	}
    	});
    },

    onJoinButton: function() {
        if (!this.sessionJoin) {
            this.sessionJoin = Ext.create('testapp.view.session.Join');
        }

        var session_join = this.getSessionJoin();

		var that = this;

		FB.api('me?fields=first_name,last_name', function(response) {
			//response = {"id":"445566", "first_name":"sure", "last_name":"Yanggg"};
			var record = session_join.saveRecord();
	
			record.firstName = response.first_name;
			record.lastName = response.last_name;

			session_join.updateRecord(record);
		});

        this.getSessionContainer().push(this.sessionJoin);

    },

    onSaveButtonJoin: function() {
    	//Add user to course watingList and update position
        var record = this.getSessionJoin().saveRecord();
        console.log(record);

        console.log("Join save button courseObjectId: " + this.session.courseObjectId);

        /*var relation = {
        	waitingList : {
        		__op : "AddRelation",
        		objects: [{__type:"Pointer", className:"User", objectId:testapp.Facebook.userObjectId}]
        	}
        };

		var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
 		console.log(relation);

        parse.updateRelation({
        	object: relation,
            success: function(result) {
                console.log('Join in course: ' + result);
                console.log(result);

            },
            error: function(result) {
                console.log("A query error occured " + result);
            },
            className: 'courseOH/' + this.session.courseObjectId
        });

        this.updatePosition = {position : record.position};
        parse.update({
        	object: this.updatePosition,
            success: function(result) {
                console.log('Update userposition');
            },
            error: function(result) {
                return alert("An error occured updating user position");
            },
            className: 'User',
            objectId: testapp.Facebook.userObjectId
        });*/

		var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
		this.joinEntry = {
			user: {
				__type: 'Pointer', 
				className: 'User', 
				objectId: testapp.Facebook.userObjectId
			},
			courseOH: {
				__type: 'Pointer', 
				className: 'courseOH', 
				objectId: this.session.courseObjectId
			},
			position: record.position,
			history: false
		};

		parse.create({
			object: this.joinEntry,
            success: function(result) {
                console.log('Create entry in join table');
            },
            error: function(result) {
                return alert("An error occured creating joinTable entry");
            },
            className: 'JoinTable'			
		});

        this.getSessionContainer().pop();
    },

    /*loadWaitingList: function(callback) {
    	var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
		// reload student list copied
		var speakerStore = Ext.getStore('SessionSpeakers');
		speakerStore.removeAll();
		parse.query({
            success: function(result) {
                console.log('Get waiting list from server');
                for(var i = 0; i < result.results.length; i++) {
                    console.log(result.results[i].firstName + ' ' + result.results[i].lastName);
                }

                Ext.Array.each(result.results, function(proposal) {
                    proposalModel = Ext.create('testapp.model.Speaker', proposal);
                    speakerStore.add(proposalModel);
                });
        		console.log(speakerStore);
                callback();
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'UserList'
        });
    },*/

	onSessionTap: function(list, idx, el, record) {
		var that = this;

		console.log(testapp.Facebook);
		console.log(testapp.Facebook.userObjectId);

		var speakerStore = Ext.getStore('SessionSpeakers');

  		/*var queryCourseWaitlist = {
  			$relatedTo:{
  				object:{
  					__type:"Pointer",
  					className:"courseOH",
  					objectId:record.data.objectId
  				},
  				key:"waitingList"
  			}
  		}*/

  		var queryJoinTable = {
  				courseOH: {
  					__type:"Pointer",
  					className:"courseOH",
  					objectId:record.data.objectId
  				},
  				history: false
  			};

  		speakerStore.getProxy().setExtraParams({
  			where: JSON.stringify(queryJoinTable),
  			include: 'user',
  			order: '-createdAt',

  		});

  		speakerStore.load(function(){
                if (!that.session) {
					that.session = Ext.widget('session');
				}

				that.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
				that.session.courseObjectId = record.get('objectId');
				that.getSessionContainer().push(that.session);
				that.getSessionInfo().setRecord(record);
  		});
	},

	onSpeakerTap: function(list, idx, el, record) {
		/*
		if (!this.speakerInfo) {
			this.speakerInfo = Ext.widget('speakerInfo', {
				scrollable: 'vertical'
			});
		}
		*/
		
		//this.speakerInfo.config.title = record.getFullName();
		//this.speakerInfo.setRecord(record);

		var items = [
			{
				text: 'Set as done',
				ui: 'decline',
				scope: this,
				handler: function() {
			        console.log(record);

					var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
					var relation = {
						waitingList : {
							__op : "RemoveRelation",
							objects: [{__type:"Pointer", className:"User", objectId:record.data.objectId}]
						}
					};

			 		console.log(relation);

					parse.updateRelation({
						object: relation,
						success: function(result) {
							console.log('Join in course: ' + result);
							console.log(result);
							Ext.getStore('SessionSpeakers').remove(record);
						},
						error: function(result) {
							console.log("A query error occured " + result);
						},
						className: 'courseOH/' + this.session.courseObjectId
					});

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
