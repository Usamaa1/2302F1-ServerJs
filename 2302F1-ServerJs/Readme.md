# Express.js - Examples of Request Parameters & Sending Responses

## 📌 Ways of Giving Parameters in Express

### 1. Route Parameters (`req.params`)

```js
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

### 2. Query Parameters (`req.query`)

```js
app.get('/products', (req, res) => {
  const { category, price } = req.query;
  res.send(`Category: ${category}, Price: ${price}`);
});
```

### 3. Body Parameters (`req.body`) \[Used in POST, PUT, PATCH]

```js
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send(`Username: ${username}`);
});
```

### 4. Headers (`req.headers`)

```js
app.get('/info', (req, res) => {
  const userAgent = req.headers['user-agent'];
  res.send(`User-Agent: ${userAgent}`);
});
```

---

## 📦 Ways of Sending Response in Express

### 1. `res.send()`

```js
res.send('Hello World');
res.send({ success: true });
res.send([1, 2, 3]);
```

### 2. `res.json()`

```js
res.json({ message: 'Data received' });
```

### 3. `res.status(code)`

```js
res.status(200).send('OK');
res.status(404).json({ error: 'Not Found' });
```

### 4. `res.sendStatus(code)`

```js
res.sendStatus(200);  // Sends status code and message
```

### 5. `res.redirect(url)`

```js
res.redirect('/login');
res.redirect('https://google.com');
```

### 6. `res.render(view, data)` (for templating engines)

```js
res.render('index', { title: 'Home Page' });
```

### 7. `res.download(path)`

```js
res.download('/path/to/file.pdf');
```

### 8. `res.sendFile(path)`

```js
res.sendFile('/path/to/image.jpg');
```

### 9. `res.end()`

```js
res.end();              // Ends response
res.end('Finished');    // With message
```

---

## ✅ Summary Table

| Method             | Use Case                              |
| ------------------ | ------------------------------------- |
| `res.send()`       | Send plain text, object, array, etc.  |
| `res.json()`       | Send JSON (preferred for APIs)        |
| `res.status()`     | Set status code (chain with `send()`) |
| `res.sendStatus()` | Set status code with default message  |
| `res.redirect()`   | Redirect to another URL               |
| `res.render()`     | Render a view using a template engine |
| `res.download()`   | Send file as download                 |
| `res.sendFile()`   | Send static file                      |
| `res.end()`        | End response (manual control)         |

---


# Express + Mongoose CRUD API (Updated ES Modules Version)

## ✅ Project Structure

```
express-mongoose-crud
│
├── index.js               # Main server file
├── db.js                  # Database connection
├── models
│   └── User.js            # Mongoose model
├── routes
│   └── userRoutes.js      # All user routes
└── package.json
```

---

## ✅ 1. package.json

```json
{
  "name": "express-mongoose-crud",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.6.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

---

## ✅ 2. Database Connection (db.js)

```js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/testcrud?retryWrites=true&w=majority", {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

export default connectDB;
```

**Note:** Replace `<username>`, `<password>` and cluster details with your actual MongoDB Atlas credentials. For local MongoDB use:

```js
await mongoose.connect("mongodb://127.0.0.1:27017/testcrud");
```

---

## ✅ 3. User Model (models/User.js)

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", userSchema);
export default User;
```

---

## ✅ 4. Routes File (routes/userRoutes.js)

```js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// READ ONE
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
```

---

## ✅ 5. Main Server File (index.js)

```js
import express from "express";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

connectDB();

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## ✅ 6. Run the Project

```bash
npm install
npm start
```

---

## ✅ API Test Endpoints

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/users`     | Create new user       |
| GET    | `/users`     | Get all users         |
| GET    | `/users/:id` | Get single user by ID |
| PUT    | `/users/:id` | Update user by ID     |
| DELETE | `/users/:id` | Delete user by ID     |

### Example POST Body:

```json
{
  "name": "Alice",
  "email": "alice@mail.com",
  "age": 25
}
```

---

## ✅ Conclusion

✔ Uses latest ES Modules (`import`)\
✔ Clean, route-separated structure\
✔ Works with MongoDB Atlas or local DB\
✔ Follows modern Express + Mongoose best practices

---




