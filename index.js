const express = require("express");
const cors = require("cors");
const connectDb = require("./connect");
const authRoutes = require("./routes/auth.route.js");
const ticketRoutes = require("./routes/ticket.route.js");
const userRoutes = require("./routes/user.route.js");
const commentRoutes = require("./routes/comment.route.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://dataplane.vercel.app",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "https://dataplane.vercel.app"
//         : "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port: ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});
