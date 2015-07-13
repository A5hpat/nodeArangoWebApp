var Database = require('arangojs');
var db = new Database({url:'http://127.0.0.1:8529'});

module.exports = {
	getAllUsers : function()
	{
		return db.database('nodeArangoWebAppDB')
				 .then(function (mydb) {return mydb.query('FOR x IN User RETURN x');})		
				 .then(function (cursor) { return  cursor.all();});		
	},
	getUserByKey : function(userKey)
	{
		var bindVars = {'userKey': userKey};
		return db.database('nodeArangoWebAppDB')
				 .then(function (mydb) {return mydb.query('FOR x IN User FILTER x._key == @userKey RETURN x',bindVars);})		
				 .then(function (cursor) { return  cursor.all();});		
	},
	addUser : function(user)
	{
		return db.database('nodeArangoWebAppDB')
			      .then(function (mydb) {return mydb.collection('User');})    
			      .then(function (collection) { return collection.save(user);});
	},
	updateUser : function(user)
	{
		var bindVars = {'key': user.key, 'username': user.username,"email":user.email };
		return db.database('nodeArangoWebAppDB')
				 .then(function (mydb) {return mydb.query('FOR x IN User FILTER x._key == @key UPDATE x WITH { username:@username, email:@email } IN User',bindVars );})    
		      	 .then(function (cursor) { return cursor.all();});			      
	},
	removeUser : function(userKey)
	{
		var bindVars = {'userKey': userKey};
		return db.database('nodeArangoWebAppDB')
			      .then(function (mydb) {return mydb.query('FOR x IN User FILTER x._key == @userKey REMOVE x IN User LET removed = OLD RETURN removed', bindVars);})
			      .then(function (cursor) {return cursor.all();});
	}	
}