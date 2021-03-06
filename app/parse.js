// Generated by CoffeeScript 1.7.1
(function() {
  var Parse;

  window.Parse = Parse = (function() {
    function Parse(applicationId, masterKey) {
      this.applicationId = applicationId;
      this.masterKey = masterKey;
      this.endpoint = 'https://api.parse.com/1/classes/';
    }

    Parse.prototype.create = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className,
        method: 'POST',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.updateRelation = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className,
        method: 'PUT',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.get = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'GET',
        success: (function(result) {
          return args.success(JSON.parse(result.responseText));
        }),
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
        }
      });
    };

    Parse.prototype.query = function(args) {
      var request_url = this.endpoint + args.className;
      if ('params' in args) {
        console.log(args.params);
        request_url = request_url + '?' + encodeURIComponent("where=" + JSON.stringify(args.params));
      }
      return Ext.Ajax.request({
        url: request_url,
        method: 'GET',
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        //params: args.query_params,
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
        }
      });
    };

    Parse.prototype.update = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'PUT',
        jsonData: args.object,
        success: function(result) {
          return args.success(JSON.parse(result.responseText));
        },
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    Parse.prototype.deletedata = function(args) {
      return Ext.Ajax.request({
        url: this.endpoint + args.className + '/' + args.objectId,
        method: 'DELETE',
        success: (function(result) {
          return args.success(JSON.parse(result.responseText));
        }),
        error: args.error,
        headers: {
          'X-Parse-Application-Id' : this.applicationId,
          'X-Parse-REST-API-Key' : this.masterKey,
          'Content-Type' : 'application/json'
        }
      });
    };

    return Parse;

  })();

}).call(this);
