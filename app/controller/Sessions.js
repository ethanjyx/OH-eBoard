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
			quitButton: '#quitButton',
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
			quitButton: {
				tap: 'onQuitButton'
			},
			saveButtonJoin: {
				tap: 'onSaveButtonJoin'
			},
			speakers: {
				itemtap: 'onSpeakerTap'
			}
		},
		onHistroyList: false,
		isGSI: false
	},

	onMainPush: function(view, item) {
        var historyButton = this.getHistoryButton();

        if (item.xtype == "session") {
            this.getSessions().deselectAll();
            this.showHistoryButton();
            this.updateButtonDisplay();

            this.getSpeakers().disable();
        } else {
            this.hideHistoryButton();
        }
    },

    onMainPop: function(view, item) {
        if (item.xtype === "session-join") {
            this.showHistoryButton();
            this.hideJoinButton();
        } else if (item.xtype === "list-history") {
        	this.onHistroyList = false; 
        	this.showHistoryButton();
    	} else {
            this.hideHistoryButton();
        }	
    },

    updateButtonDisplay: function() {
    	if (this.isGSI) {
    		this.hideJoinButton();
    		this.hideQuitButton();
    	} else if (this.userIndexInWaitingList() === -1) {
    		// user not in waiting list
			this.showJoinButton();
    		this.hideQuitButton();
    	} else {
    		// user in waiting list
    		this.hideJoinButton();
    		this.showQuitButton();
    	}
    },

    // returns the index of the user in the waiting list
    userIndexInWaitingList: function() {
        var speakerStore = Ext.getStore('SessionSpeakers');
        for (var i = speakerStore.getData().length - 1; i >= 0; i--) {
        	if (speakerStore.getData().getAt(i).getData()['userObjectId'] === testapp.Facebook.userObjectId) {
        		return i;
        	}
        };
    	
        return -1;
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
		var that = this;
		var historyStore = Ext.getStore('History');

  		var queryJoinTable = {
  				courseOH: {
  					__type:"Pointer",
  					className:"courseOH",
  					objectId: this.session.courseObjectId 
  				},
  				history: true
  			};

  		historyStore.getProxy().setExtraParams({
  			where: JSON.stringify(queryJoinTable),
  			include: 'user',
  			order: 'createdAt',

  		});

  		historyStore.load(function(){
        	if (!that.listHistory) {
            	that.listHistory = Ext.create('testapp.view.session.History');
        	}

				//that.listHistory.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
				//that.listHistory.courseObjectId = record.get('objectId');
				that.onHistroyList = true;
				that.getSessionContainer().push(that.listHistory);
  		});
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
		ed.data.holder = {
			__type: 'Pointer', 
			className: 'User', 
			objectId: testapp.Facebook.userObjectId
		}
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
			var record = session_join.saveRecord();
			record.firstName = response.first_name;
			record.lastName = response.last_name;
			session_join.updateRecord(record);
		});

        this.getSessionContainer().push(this.sessionJoin);

    },

    onQuitButton: function() {
    	// delete from JoinUser table : userObjectId, courseObjectId, history: false
    	var speakerStore = Ext.getStore('SessionSpeakers');
        speakerStore.removeAt(this.userIndexInWaitingList());
        speakerStore.sync();

        this.getJoinButton().show();
        this.getQuitButton().hide();
    },

    onSaveButtonJoin: function() {
    	//Add user to course watingList and update position
        var record = this.getSessionJoin().saveRecord();
        console.log(record);

        console.log("Join save button courseObjectId: " + this.session.courseObjectId);

		var that = this;
		var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
		var currentTime = new Date();
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
			history: false,
			id: testapp.Facebook.userObjectId + this.session.courseObjectId + currentTime
		};

		parse.create({
			object: this.joinEntry,
            success: function(result) {
                console.log('Create entry in join table');
                Ext.getStore('SessionSpeakers').load(function(){that.getSessionContainer().pop();});
            },
            error: function(result) {
                return alert("An error occured creating joinTable entry");
            },
            className: 'JoinTable'			
		});

        //this.getSessionContainer().pop();
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
		var speakerStore = Ext.getStore('SessionSpeakers');
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
  			order: 'createdAt',

  		});

  		speakerStore.load(function(){
            if (!that.session) {
				that.session = Ext.widget('session');
			}

			that.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
			that.session.courseObjectId = record.get('objectId');
			that.isGSI = (record.get('holder')['objectId'] === testapp.Facebook.userObjectId) ? true : false;
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
		if (this.onHistroyList || !this.isGSI) {
			return false;
		}
		
		//this.speakerInfo.config.title = record.getFullName();
		//this.speakerInfo.setRecord(record);
		var items = [
			{
				text: 'Set as done',
				ui: 'decline',
				scope: this,
				handler: function() {
			        console.log(record);

					/*var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
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
					});*/
					var that = this;
					record.data.history = true;
					record.save({
    					success: function(result) {
        					console.log("Delete from join table");
        					Ext.getStore('SessionSpeakers').load(function(){that.actions.hide()});
        				}
    				});
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

    showJoinButton: function() {
        var joinButton = this.getJoinButton();

        if (!joinButton.isHidden()) {
            return;
        }

        joinButton.show();
    },

    hideJoinButton: function() {
        var joinButton = this.getJoinButton();
        
        if (joinButton.isHidden()) {
            return;
        }

        joinButton.hide();
    },

    showQuitButton: function() {
        var quitButton = this.getQuitButton();

        if (!quitButton.isHidden()) {
            return;
        }

        quitButton.show();
    },

    hideQuitButton: function() {
        var quitButton = this.getQuitButton();

        if (quitButton.isHidden()) {
            return;
        }

        quitButton.hide();
    }
});
