const express = require("express");
const connectDB = require("./db");
const fetchCryptoData = require("./fetchCryptoData");
const cron = require("node-cron");
const Crypto = require("./Crypto");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());

connectDB();

fetchCryptoData();

cron.schedule("0 */2 * * *", () => {
      console.log("Fetching crypto data...");
      fetchCryptoData();
});

app.get("/", async (req, res) => {
      try {
            const cryptos = await Crypto.find({});
            const groupedCryptos = cryptos.reduce((acc, crypto) => {
                  const dateKey = crypto.timestamp.toISOString().split("T")[0];
                  if (!acc[dateKey]) {
                        acc[dateKey] = [];
                  }
                  acc[dateKey].push(crypto);
                  return acc;
            }, {});

            res.render("index", { groupedCryptos });
      } catch (error) {
            res.status(500).send("Error fetching data from database");
      }
});

app.get("/stats", async (req, res) => {
      const { coin } = req.query;

      if (!coin) {
            return res
                  .status(400)
                  .json({ error: "Coin parameter is required" });
      }

      try {
            const formattedCoin = coin.charAt(0).toUpperCase() + coin.slice(1);

            const latestData = await Crypto.findOne({
                  name: formattedCoin,
            }).sort({ timestamp: -1 });

            if (!latestData) {
                  return res.status(404).json({ error: "Coin not found" });
            }

            const response = {
                  price: latestData.price,
                  marketCap: latestData.marketCap,
                  "24hChange": latestData.change24h,
            };

            res.json(response);
      } catch (error) {
            console.error("Error fetching stats:", error);
            res.status(500).json({ error: "Internal server error" });
      }
});

app.get("/deviation", async (req, res) => {
      const { coin } = req.query;

      if (!coin) {
            return res
                  .status(400)
                  .json({ error: "Coin parameter is required" });
      }

      try {
            const formattedCoin = coin.charAt(0).toUpperCase() + coin.slice(1);

            const records = await Crypto.find({ name: formattedCoin })
                  .sort({ timestamp: -1 })
                  .limit(100);

            if (records.length === 0) {
                  return res
                        .status(404)
                        .json({ error: "No records found for this coin" });
            }

            const prices = records.map((record) => record.price);
            const deviation = calculateStandardDeviation(prices);

            res.json({ deviation });
      } catch (error) {
            console.error("Error fetching deviation:", error);
            res.status(500).json({ error: "Internal server error" });
      }
});

function calculateStandardDeviation(prices) {
      const n = prices.length;
      if (n === 0) return 0;

      const mean = prices.reduce((sum, price) => sum + price, 0) / n;
      const variance =
            prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
            n;

      return Math.sqrt(variance).toFixed(2); // Return deviation rounded to two decimal places
}

app.listen(3000, () => {
      console.log("Server is running on port 3000");
});
