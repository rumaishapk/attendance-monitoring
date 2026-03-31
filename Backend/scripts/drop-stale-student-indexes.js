import mongoose from "mongoose";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://rumaishapk:rumi257480@nodeapi.ju5tqrt.mongodb.net/?appName=attendance";

const staleIndexes = ["name_1", "phoneNumber_1", "password_1"];

const dropIndexes = async () => {
  try {
    await mongoose.connect(uri);

    const collection = mongoose.connection.db.collection("students");
    const existingIndexes = await collection.indexes();
    const existingIndexNames = existingIndexes.map((index) => index.name);

    for (const indexName of staleIndexes) {
      if (existingIndexNames.includes(indexName)) {
        await collection.dropIndex(indexName);
        console.log(`Dropped index: ${indexName}`);
      } else {
        console.log(`Index not found, skipped: ${indexName}`);
      }
    }

    const updatedIndexes = await collection.indexes();
    console.log("Remaining indexes:");
    console.log(JSON.stringify(updatedIndexes, null, 2));
  } catch (error) {
    console.error("Failed to drop indexes:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

dropIndexes();
