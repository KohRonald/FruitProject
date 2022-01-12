//requiring mongodb package
const { MongoClient } = require("mongodb");

//connection uri
const uri = "mongodb://localhost:27017";

//creates new MongoClient in the destination specified in the uri
const client = new MongoClient(uri);

async function run() {
    try {

        //connects mongoClient to mongoDB 
        await client.connect();

        //connects to "fruitsShopDB" database(creates it if does not exist), and stores it into a constant called database
        //reminder - a client holds many different databases
        const database = client.db('fruitsShopDB');

        //creates the "fruits" collection(table(SQL)) in the database, and stores it into a constant called collection
        const collection = database.collection('fruits');

        //creating a new document, storing all the objects in an array, and stores it into a constant called newFruit
        const newFruits = [{
                name: "Apple",
                rating: 7,
                review: "Soooo Red"
            },
            {
                name: "Orange",
                rating: 8,
                review: "Looks like the sun!"
            },
            {
                name: "Banana",
                rating: 6,
                review: "I eat it with a fork"
            }
        ];

        // //insert the new document(Row(SQL)) into the collection(Table(SQL)), and stores it into a constant called fruits
        // const fruits = await collection.insertMany(newFruits);

        // //logs the document to the console (Non-Javascript Object)
        // console.log(fruits);

        //search through all objects in the fruits collection and store them in an array
        const cursor = collection.find({});
        const allValues = await cursor.toArray();

        //prints the javascript objects into the log
        console.log("Found the following records");
        console.log(allValues);

    } finally {

        //closes the mongoClient upon finish/error
        await client.close();
    }
}
//catch for any error and prints out navigable tree to console
run().catch(console.dir);