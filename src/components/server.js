const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.REACT_APP_API_BASE_URL || 3000;

const config = {
  user: "acohorst1",
  password: "software2024!",
  server: "movietrivia.database.windows.net",
  database: "MovieData",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(config);

    const request = new sql.Request();
    const insertQuery = `
      INSERT INTO Users (Username, password, Highscore)
      VALUES (@username, @password, 0)
    `;
    request.input("username", sql.NVarChar, username);
    request.input("password", sql.NVarChar, password);
    const result = await request.query(insertQuery);

    console.log("Data inserted into MSSQL database successfully:", result);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error registering:", error);
    res.sendStatus(500);
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    // Ensure the SQL connection is established
    await sql.connect(config);

    // Create a new request to execute the query
    const request = new sql.Request();

    // Define the SQL query with input parameters for security (to prevent SQL injection)
    const sqlQuery = `SELECT * FROM Users WHERE Username = @username AND password = @password`;

    // Add parameters to the request
    request.input("username", sql.NVarChar, req.body.username);
    request.input("password", sql.NVarChar, req.body.password);

    // Execute the query
    const result = await request.query(sqlQuery);

    // Check the result and respond accordingly
    if (result.recordset.length > 0) {
      res.json({ status: "success", data: result.recordset[0] });
    } else {
      res.json({ status: "failure", message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.sendStatus(500);
    res.status(500).send("Login failed due to an internal error");
  }
});

// GAMEBOARD
app.get("/gameboard", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    console.log(request);
    const result = await sql.query`SELECT * FROM Questions`;
    res.json(result.recordset);
  } catch (err) {
    console.error("Database query failed: ", err);
    res.status(500).send("Error fetching questions");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = await request.query(
      "SELECT TOP 10 * FROM Users ORDER BY Highscore DESC"
    );
    res.json(result.recordset);
  } catch (err) {
    console.error("Database query failed: ", err);
    res.status(500).send("Error fetching leaderboard");
  }
});

app.post("/updateHighscore", async (req, res) => {
  const { username, highscore } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const updateQuery = `
    UPDATE Users
    SET Highscore = @highscore
    WHERE Username = @username AND Highscore < @highscore`;

    request.input("username", sql.NVarChar, username);
    request.input("highscore", sql.Int, highscore);
    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] > 0) {
      res.json({
        status: "success",
        message: "Highscore updated successfully",
      });
    } else {
      res.json({
        status: "failure",
        message:
          "Highscore not updated. It might be lower than current highscore ",
      });
    }
  } catch (error) {
    console.error("Error updating highscore", error);
    res.sendStatus(500);
  }
});
