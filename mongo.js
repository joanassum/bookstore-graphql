const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'bookstore';

const operations = {
    findAuthors: "findAuthors",
    findAuthorByID: "findAuthorByID",
    addAuthor: "addAuthor"
}

// Create a new MongoClient
// const client = new MongoClient(url);

// Use connect method to connect to the Server
async function connectToDatabase() {
    return await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
}

async function databaseOperation(operation, options = {}) {

    const client = await connectToDatabase()

    if (!client) {
        return;
    }

    var res;


    try {

        const db = client.db(dbName);
        let authorsCollection = db.collection('authors');
        switch (operation) {
            case operations.findAuthors:
                res = await authorsCollection.find({}).toArray();
                break;
            case operations.findAuthorByID:
                res = await authorsCollection.findOne({_id: options.id});
                break
            case operations.addAuthor:
                res = await authorsCollection.insertOne({_id: options.id, name:options.name});
                break
        }
        
        console.log(res);

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return res;
}

exports.connectToDatabase = connectToDatabase
exports.databaseOperation = databaseOperation
exports.operations = operations