
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb")
import process from 'node:process'
const username = process.env.MANGO_USERNAME
const password = process.env.MANGO_PASSWORD

const uri = `mongodb+srv://${username}:${password}@jachackscluster.xhe3f5i.mongodb.net/?retryWrites=true&w=majority&appName=jachackscluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  try {

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
  }
  catch(err){
    console.error(err)
  }
  finally {
    await client.close()
  }
}
export async function createUser(username: string, email: string, password: string){
  const myDb = await client.db("Data")
  const usersData  = await myDb.collection("Users")
  const userID = new ObjectId() 
  const result = usersData.insertOne({username: username, email: email, password: password, userId: userID})
  console.log(
    `A new user was registered please be cool: ${result.insertedId}`
  )

}

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
