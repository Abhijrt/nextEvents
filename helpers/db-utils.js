import { MongoClient } from 'mongodb';

export async function connectDataBase () {
    const client = MongoClient.connect(
        'mongodb+srv://abhi.jrt12@gmail.com:Abhirlaj@cluster0.sy8ci.mongodb.net/newletter?retryWrites=true&w=majority'
    )
    return client;
}

export async function insertDocument (client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments (client, collection, sort) {
    const db = client.db();
    const result = await db.collection(collection).find().sort(sort).toArray();
    return result;
}