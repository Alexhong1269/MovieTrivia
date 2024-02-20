const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const config = {
  user: "acohorst1",
  password: "software2024!",
  server: "movietrivia.database.windows.net",
  database: "MovieData",
  options: {
    encrypt: true,
  },
};

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    await sql.connect(config);

    const request = new sql.Request();
    const insertQuery = `
      INSERT INTO Users (Username, Pass, Highscore)
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
  } finally {
    await sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
