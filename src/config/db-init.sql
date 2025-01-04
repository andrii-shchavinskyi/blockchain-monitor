-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Blockchains Table
CREATE TABLE IF NOT EXISTS blockchains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- e.g., "Ethereum", "Binance Smart Chain"
    network VARCHAR(50) NOT NULL,     -- e.g., "mainnet", "testnet"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Ethereum Blockchain
INSERT INTO blockchains (name, network) 
VALUES ('Ethereum', 'mainnet');


-- Create Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    blockchain_id INT NOT NULL REFERENCES blockchains(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    alert_id INT REFERENCES alerts(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
