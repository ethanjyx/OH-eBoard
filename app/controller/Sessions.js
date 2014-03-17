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

		/*FB.api('me?fields=first_name,last_name', function(response) {
			var record = session_add.saveRecord();
	
			record.holderName = response.first_name + ' ' + response.last_name;
			//record.holderName = "lalala";
			//alert(response.first_name);
			//reponse.id
			//alert(record.holderName);
			session_add.updateRecord(record);
			
			var ed = Ext.create('testapp.model.Speaker');
			ed.data.firstName = response.first_name;
			ed.data.lastName = response.last_name;
			ed.data.facebookId = response.id;
			console.log(ed);
			var objectId;
			ed.save({
    			success: function(result) {
    				objectId = result.objectId;
        			console.log("Create new user " + testapp.controller.Sessions.thisObjectId);
        		}
    		});
		});*/



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
        record.numberServed = 0;
		var ed = Ext.create('testapp.model.Session', record);
		console.log(ed);
		ed.save({
    		success: function(result) {
        		console.log("Create new OH session " + record.courseSubject + ' ' + record.courseNumber);
        		testapp.view.session.Load.loadCourseList(function(){
});
        	}
    	});

        		/*var sessionStore = Ext.getStore('Sessions');
				var proposalModel = Ext.create('testapp.model.Session', record);
				sessionStore.add(proposalModel);
				console.log(sessionStore);*/


		console.log(Ext.getStore('Sessions'));
        this.getSessionContainer().pop();
    },

    onJoinButton: function() {
        if (!this.sessionJoin) {
            this.sessionJoin = Ext.create('testapp.view.session.Join');
        }

        var session_join = this.getSessionJoin();

		/*FB.api('me?fields=first_name,last_name', function(response) {
			var record = session_join.saveRecord();
	
			record.firstName = response.first_name;
			record.lastName = response.last_name;
			//record.holderName = "lalala";
			//alert(response.first_name);
			//reponse.id
			//alert(record.holderName);
			session_join.updateRecord(record);

			var ed = Ext.create('testapp.model.Speaker');
			ed.data.firstName = response.first_name;
			ed.data.lastName = response.last_name;
			ed.data.facebookId = response.id;
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
		});*/

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

        console.log("Join save button " + this.session.courseObjectId);

        var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
        //this.userObjectId = 'RF6hZI5xv0';
        /*this.relation = {
        	waitingList : {
        		__op : "AddRelation",
        		objects: [{__type:"Pointer", className:"User", objectId:this.userObjectId}]
        	}
        };

 

        parse.addToRelation({
        	object: this.relation,
            success: function(result) {
                console.log('Join in course');
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'courseOH/' + this.session.courseObjectId
        });*/

		// add a user in UserList
		this.lastObject = {
			firstName: record.firstName,
			lastName: record.lastName,
			position: record.position

		};

		var speakerStore = Ext.getStore('SessionSpeakers');
		var proposalModel = Ext.create('testapp.model.Speaker', this.lastObject);

		parse.create({
                    object: this.lastObject,
                    success: function(result) { 
                        proposalModel.data.objectId = result.objectId;
                        speakerStore.add(proposalModel);
						console.log(proposalModel.data.objectId);
						console.log(speakerStore);
                        return console.log("objectId created " + proposalModel.data.objectId);
                    },
                    error: function(result) {
                        return console.log("A creation error occured");
                    },
                    className: 'UserList'
                });

        /*this.updatePosition = {position : record.position};
        parse.update({
        	object: this.updatePosition,
            success: function(result) {
                console.log('Join in course');
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'User',
            objectId: this.userObjectId
        });*/       

		//this.loadWaitingList(function(){});

        this.getSessionContainer().pop();
    },

    loadWaitingList: function(callback) {
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

		/*curl -X GET \
  -H "X-Parse-Application-Id: APP_ID" \
  -H "X-Parse-REST-API-Key: REST_API_KEY" \
  -G \
  --data-urlencode 'where={"$relatedTo":{"object":{"__type":"Pointer","className":"JFEvent","objectId":"8TOXdXf3tz"},"key":"attendingUsers"}}' \
  https://api.parse.com/1/users*/

        var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");

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
            },
            error: function(result) {
                return alert("A query error occured");
            },
            className: 'UserList'
        });

		/*Ext.Array.each(record.waitingList, function(proposal) {
		    proposalModel = Ext.create('testapp.model.Speaker', proposal);
	        speakerStore.add(proposalModel);
		});*/

		if (!this.session) {
			this.session = Ext.widget('session');
		}

		this.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
		this.session.courseObjectId = record.get('objectId');
		this.getSessionContainer().push(this.session);
		this.getSessionInfo().setRecord(record);
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
			        console.log(record);

        			var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
					parse.delete({
                    	objectId: record.data.objectId,
    	                success: function(result) { 
            	            return console.log("objectId deleted " + record.data.objectId);
                	    },
    	                error: function(result) {
        	                return console.log("A deletion error occured");
            	        },
                	    className: 'UserList'
                	});

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
            			},
            			error: function(result) {
                			return alert("A query error occured");
            			},
            			className: 'UserList'
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
