Ext.define('testapp.controller.Sessions', {
	extend: 'Ext.app.Controller',

	requires: ['testapp.Facebook'],
	requires: ['testapp.util.Requests'],

	config: {
		refs: {
			sessions: 'sessions',
			session: 'session',
			sessionInfo: 'sessionContainer sessionInfo',
			watingUsers: 'sessionContainer list',
			sessionContainer: 'sessionContainer',
			//sessionDayPicker: 'sessions segmentedbutton',
			addButton: '#addButton',
			saveButtonAdd: '#saveButtonAdd',
			joinButton: '#joinButton',
			quitButton: '#quitButton',
            closeSessionButton: '#closeSessionButton',
			saveButtonJoin: '#saveButtonJoin',
			sessionAdd: 'session-add',
			sessionJoin: 'session-join',
			listHistory: 'list-history',
			historyButton: '#historyButton',
			speakers: 'sessionContainer speakers',
			logoutButton: '#logoutButton',
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
            closeSessionButton: {
                tap: 'onCloseSessionButton'
            },
			saveButtonJoin: {
				tap: 'onSaveButtonJoin'
			},
			speakers: {
				itemtap: 'onSpeakerTap'
			},
			logoutButton: {
				tap: 'onLogoutButton'
			},
		},
		onHistoryList: false,
		isGSI: false
	},

	onMainPush: function(view, item) {
		Ext.Viewport.setMasked(false);
        console.log("Main Push " + item.xtype);

        if (item.xtype === "session") {
            this.getSessions().deselectAll();
            this.showHistoryButton();
            this.hideLogoutButton();
            this.updateButtonDisplay();
        } else {
            this.hideHistoryButton();
        }
    },

    onMainPop: function(view, item) {
    	Ext.Viewport.setMasked(false);
        console.log("Main Pop " + item.xtype);
        if (item.xtype === "session-join") {
            this.showHistoryButton();
            this.updateButtonDisplay();
        } else if (item.xtype === "list-history") {
        	this.onHistoryList = false; 
        	this.showHistoryButton();
    	} else {
            this.hideHistoryButton();
            this.showLogoutButton();
        }	
    },

    updateButtonDisplay: function() {
    	if (this.isGSI) {
    		this.hideJoinButton();
    		this.hideQuitButton();
            this.showCloseSessionButton();
    	} else if (this.userIndexInWaitingList() === -1) {
    		// user not in waiting list
			this.showJoinButton();
    		this.hideQuitButton();
            this.hideCloseSessionButton();
    	} else {
    		// user in waiting list
    		this.hideJoinButton();
    		this.showQuitButton();
            this.hideCloseSessionButton();
    	}
    },

    // returns the index of the user in the waiting list
    userIndexInWaitingList: function() {
        var speakerStore = Ext.getStore('WaitingUsers');
        for (var i = speakerStore.getData().length - 1; i >= 0; i--) {
        	if (speakerStore.getData().getAt(i).getData()['userObjectId'] === testapp.Facebook.userObjectId) {
        		return i;
        	}
        };
    	
        return -1;
    },

	onSessionDateChange: function(seg, btn, toggle) {
        if (toggle) {
            //this.filterByButton(btn);
        }
	},

	filterByButton: function(btn) {
		if (this.getWaitingUsers()) {
			this.getWaitingUsers().deselectAll();
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

			that.listHistory.setTitle(that.session.getTitle());
			//that.listHistory.courseObjectId = record.get('objectId');
			that.onHistoryList = true;
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

		/*ed.save({
    		success: function(result) {
        		console.log("Create new OH session " + ed.data.id);
                Ext.getStore('Sessions').sync();
                that.getSessionContainer().pop();
        	}
    	});*/
        Ext.getStore('Sessions').add(ed);
        Ext.getStore('Sessions').sync();
        Ext.getStore('Sessions').load(function(){that.getSessionContainer().pop();});
        
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
    	that = this;
    	var items = [
			{
				text: 'Quit',
				ui: 'decline',
				scope: this,
				handler: function() {
			        var speakerStore = Ext.getStore('WaitingUsers');
			        speakerStore.removeAt(that.userIndexInWaitingList());
			        speakerStore.sync();

			        that.getJoinButton().show();
			        that.getQuitButton().hide();

			        that.actions.hide();
			        this.actions.destroy();
			        this.actions = null;
				}
			},
			{
				xtype: 'button',
				text: 'Cancel',
				scope: this,
				handler: function() {
					this.actions.hide();
					this.actions.destroy();
			        this.actions = null;
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


    	
    },

    onCloseSessionButton: function() {
        console.log('close session');
        that = this;

        var items = [
			{
				text: 'Close',
				ui: 'decline',
				scope: this,
				handler: function() {
			        console.log(that.session.courseObjectId);

					var sessionStore = Ext.getStore('Sessions');
			        for (var i = 0; i < sessionStore.getData().length; i++) {
			            if (sessionStore.getData().getAt(i).getData()['objectId'] === that.session.courseObjectId) {
			                sessionStore.removeAt(i);
			                break;
			            }
			        };
			        sessionStore.sync();

					var speakerStore = Ext.getStore('WaitingUsers');
  					var queryJoinTable = {
			  				courseOH: {
  								__type:"Pointer",
  								className:"courseOH",
  								objectId:that.session.courseObjectId
		  					},
	  					};

			  		speakerStore.getProxy().setExtraParams({
  						where: JSON.stringify(queryJoinTable),
			  		});

	  				speakerStore.load(function(){
	  					speakerStore.removeAll();
	  					speakerStore.sync();
	  				});

			        that.getSessionContainer().pop();
			        that.actions.hide();
			        that.actions.destroy();
			        that.actions = null;
				}
			},
			{
				xtype: 'button',
				text: 'Cancel',
				scope: this,
				handler: function() {
					this.actions.hide();
					this.actions.destroy();
			        this.actions = null;
				}
			}
		];
		if (!this.actions) {
			this.actions = Ext.create('Ext.ActionSheet', {
				items: items
			});
			//console.log("close not exist");
		}

		Ext.Viewport.add(this.actions);
		this.actions.show();        
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
                Ext.getStore('WaitingUsers').load(function(){that.getSessionContainer().pop();});
            },
            error: function(result) {
                return alert("An error occured creating joinTable entry");
            },
            className: 'JoinTable'			
		});

        //this.getSessionContainer().pop();
    },

	onSessionTap: function(list, idx, el, record) {
		Ext.Viewport.setMasked({xtype:'loadmask'});

		var that = this;

		testapp.util.Requests.loadWaitingUsers(record.data.objectId, 
			// callback function passed as parameter
			function(){
	            if (!that.session) {
					that.session = Ext.widget('session');
				}

				that.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
				that.session.courseObjectId = record.get('objectId');
				that.isGSI = (record.get('holder')['objectId'] === testapp.Facebook.userObjectId) ? true : false;
				that.getSessionContainer().push(that.session);
				that.getSessionInfo().setRecord(record);
			}
		);
	},

	onSpeakerTap: function(list, idx, el, record) {
		if (this.onHistoryList || !this.isGSI) {
			return false;
		}
		
		var items = [
			{
				text: 'Set as done',
				ui: 'decline',
				scope: this,
				handler: function() {
			        console.log(record);

					var that = this;
					record.data.history = true;
					record.save({
    					success: function(result) {
        					console.log("Delete from join table");
        					Ext.getStore('WaitingUsers').load(function(){
        						that.actions.hide();
        						that.actions.destroy();
			        			that.actions = null;
        					});
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
    },

    showCloseSessionButton: function() {
        var closeSessionButton = this.getCloseSessionButton();

        if (!closeSessionButton.isHidden()) {
            return;
        }

        closeSessionButton.show();
    },

    hideCloseSessionButton: function() {
        var closeSessionButton = this.getCloseSessionButton();

        if (closeSessionButton.isHidden()) {
            return;
        }

        closeSessionButton.hide();
    },

    showLogoutButton: function() {
        var logoutButton = this.getLogoutButton();

        if (!logoutButton.isHidden()) {
            return;
        }

        logoutButton.show();
    },

    hideLogoutButton: function() {
        var logoutButton = this.getLogoutButton();

        //if (logoutButton.isHidden()) {
        	//console.log("hideLogoutButton: logoutButton is hidden");
            //return;
        //}

        logoutButton.hide();
    },

    onLogoutButton: function() {
		var items = [
			{
				text: 'Log out',
				ui: 'decline',
				scope: this,
				handler: function() {

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
					
					        					
					FB.logout(function(response) {

						Ext.Viewport.setActiveItem(0);
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
	}
});
