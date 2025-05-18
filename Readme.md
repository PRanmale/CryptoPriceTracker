# KoinX Backend Internship Assignment

This project implements a server-side application using Node.js and MongoDB to fetch cryptocurrency data from CoinGecko and provide relevant APIs to access the data.

## Project Overview

The objective of this project is to build a backend that performs the following tasks:

1. **Task 1**: Implement a background job that fetches cryptocurrency data (price, market cap, 24h change) for Bitcoin, Matic, and Ethereum every 2 hours and stores it in a MongoDB database.
2. **Task 2**: Create an API `https://my-node-app-0oke.onrender.com/stats?coin=ethereum` to return the latest data for a specified cryptocurrency.
3. **Task 3**: Implement an API `https://my-node-app-0oke.onrender.com/deviation?coin=ethereum` that calculates the standard deviation of the price of a specified cryptocurrency from the last 100 records stored in the database.

Additionally, the optional tasks involve deploying the backend and the database. Used MongoDB Atlas for Database and Render for API's

## Features

- **Background Job**: Fetches and stores data about Bitcoin, Matic, and Ethereum every 2 hours.
- **https://my-node-app-0oke.onrender.com/stats?coin=ethereum API**: Returns the latest data (price, market cap, 24h change) for a given cryptocurrency.
- **https://my-node-app-0oke.onrender.com/deviation?coin=ethereum API**: Calculates and returns the standard deviation of the last 100 price records for a given cryptocurrency.
- **MongoDB**: Stores cryptocurrency data with timestamps.
- **Deployment**: Deployed the backend and database on MongoDB Atlas and Render

## Technologies Used

- **Node.js**: Backend runtime environment.
- **MongoDB**: NoSQL database to store cryptocurrency data.
- **Express**: Web framework for building APIs.
- **Axios**: HTTP client for making API requests to CoinGecko.
- **Node-cron**: Cron jobs for scheduling background tasks.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Render and MongoDB Atlas**: Cloud platform for deployment.
"# CryptoPriceTracker" 
