
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");

let students;

app.post("/addStudent", async (req, res) => {
    try {
        await students.insertOne(req.body);
        res.json("Student Added Successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/Students", async (req, res) => {
    try {
        const data = await students.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/Students/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Student ID" });
        }

        const student = await students.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!student) {
            return res.status(404).json({ message: "Student Not Found" });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/Students/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Student ID" });
        }

        const result = await students.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Student Not Found" });
        }

        res.json("Student Updated Successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/Students/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Student ID" });
        }

        const result = await students.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Student Not Found" });
        }

        res.json("Student Deleted Successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function connectDB() {
    try {
        await client.connect();

        const db = client.db("college");
        students = db.collection("students");

        console.log("MongoDB Connected");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    } catch (error) {
        console.log("Database Connection Error:", error.message);
    }
}

connectDB();
