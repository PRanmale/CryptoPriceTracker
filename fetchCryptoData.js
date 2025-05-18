const axios = require("axios");
const Crypto = require("./Crypto");

const fetchCryptoData = async () => {
      const coins = ["bitcoin", "ethereum", "matic-network"];

      try {
            const responses = await Promise.all(
                  coins.map((coin) =>
                        axios.get(
                              `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
                        )
                  )
            );
            const cryptoData = {};

            responses.forEach((response) => {
                  const coinId = Object.keys(response.data)[0];
                  cryptoData[coinId] = {
                        usd: response.data[coinId].usd,
                        usd_market_cap: response.data[coinId].usd_market_cap,
                        usd_24h_change: response.data[coinId].usd_24h_change,
                  };
            });

            console.log("Formatted Crypto Data:", cryptoData);

            const now = new Date();
            const options = { timeZone: "Asia/Kolkata", hour12: false }; // Use hour12: false for 24-hour format
            const istTime = now.toLocaleString("en-IN", options);

            const cryptoEntries = Object.entries(cryptoData).map(
                  ([key, value]) => ({
                        name:
                              key === "matic-network"
                                    ? "Matic"
                                    : key.charAt(0).toUpperCase() +
                                      key.slice(1),
                        price: value.usd,
                        marketCap: value.usd_market_cap,
                        change24h: value.usd_24h_change,
                        timestamp: istTime,
                  })
            );

            await Crypto.insertMany(cryptoEntries);
            console.log("Crypto data saved to database.");
      } catch (error) {
            console.error("Error fetching crypto data:", error);
      }
};

module.exports = fetchCryptoData;
