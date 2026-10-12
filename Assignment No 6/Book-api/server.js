
const express = require("express");
const app = express();

app.use(express.json());


let books = [
    { id: 1, title: "Java", price: 300 },
    { id: 2, title: "Python", price: 400 },
    { id: 3, title: "JavaScript", price: 250 }
];


app.get("/books", (req, res) => {
    res.json(books);
});


app.post("/books", (req, res) => {
    books.push(req.body);
    res.json("Book Added Successfully");
});

app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    books = books.filter(b => b.id !== id);

    res.json("Book Deleted Successfully");
});


app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (book) {
        book.title = req.body.title;
        book.price = req.body.price;

        res.json("Book Updated Successfully");
    } else {
        res.status(404).json("Book Not Found");
    }
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
