const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const cors = require("cors");
const app = express();

// Server configuration
const PORT = 8080 || process.env.PORT;
const appDataFile = path.join(__dirname, "data", "appData.json");

// Middleware to enable CORS on all origins
const corsOptions = {
  origin: "*",
  methods: "GET",
};
app.use(cors(corsOptions));

// Middleware toapp data
const loadAppData = async (req, res, next) => {
  try {
    const data = await fs.readFile(appDataFile, "utf-8");
    req.appData = JSON.parse(data); // Attach app data to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Use middleware to load app data
app.use(loadAppData);

// Routes
// Get app version
app.get("/updates", (req, res) => {
  try {
    // Access users from the request object
    const data = req.appData;
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
