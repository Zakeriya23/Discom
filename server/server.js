const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key": "36dd5a33-1b9c-4bba-a029-4879fd2930eb" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

app.listen(3001);
//Project ID: 36c98d2d-9cdf-4fa5-ade8-da0019cd4e48
//Private key: 36dd5a33-1b9c-4bba-a029-4879fd2930eb