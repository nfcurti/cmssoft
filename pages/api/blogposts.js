import { ObjectId } from 'mongodb'
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("blogposts");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("Blog Posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("Blog Posts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
    case "DELETE":
        let bodyObjectToDelete = JSON.parse(req.body);
        let myPostToRemove = await db.collection("Blog Posts").deleteOne(bodyObjectToDelete);
        res.json(myPostToRemove);
        break;
    case "PUT":
        let bodyParsed = JSON.parse(req.body);
        let myPostToUpdate = await db.collection("Blog Posts").updateOne(
            {hash: bodyParsed.hash}, 
            {
                $set: {
                    title: bodyParsed.title,
                    body: bodyParsed.body,
                    headline: bodyParsed.headline
                }
            }
        );
        res.json(myPostToUpdate);
        break;
  }
}
