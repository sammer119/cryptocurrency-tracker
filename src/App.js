import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                setCoins(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a Cryptocurrency</h1>
                <form>
                    <input
                        onChange={handleChange}
                        type="text"
                        placeholder="Search..."
                        className="coin-input"
                    />
                </form>
            </div>
            <div className="coin-top">
                <div className="coin-rowMain">
                    <div className="coinMain">
                        {/* <img src={filteredCoins[0].image} alt="crypto" /> */}
                        <h1>Name</h1>
                        <p className="coin-symbolMain">Symbol</p>
                    </div>
                    <div className="coin-dataMain">
                        <p className="coin-priceMain">Price</p>
                        <p className="coin-volumeMain">Total Volume</p>
                        <p className="coin-percentMain">Change</p>
                        <p className="coin-marketcapMain">Market Cap</p>
                    </div>
                </div>
            </div>
            {filteredCoins.map((coin) => {
                return (
                    <Coin
                        key={coin.id}
                        name={coin.name}
                        price={coin.current_price}
                        image={coin.image}
                        symbol={coin.symbol}
                        volume={coin.total_volume}
                        priceChange={coin.price_change_percentage_24h}
                        marketCap={coin.market_cap}
                    />
                );
            })}
        </div>
    );
}

export default App;
