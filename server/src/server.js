const express = require("express");

const cors = require("cors");
const authRouter = require("./routes/authRouter");
const employeeRouter = require("./routes/employeesRouter");
const teamsRouter = require("./routes/teamsRouter");
const employeeTeamsRouter = require("./routes/employeeTeamsRouter");
require("dotenv").config();

const port = process.env.PORT;

const app = express();

// app.use(cors());

const allowedOrigins = [
  "https://evallo-hrms-task.vercel.app",
  "http://localhost:3000",
];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS: " + origin));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   optionsSuccessStatus: 204,
// };

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Routes
app.use("/api/auth", authRouter);
app.use("/api/auth", employeeRouter);
app.use("/api/auth", teamsRouter);
app.use("/api/auth", employeeTeamsRouter);

//Servergit
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
