import React, { useRef, useState, useTransition } from "react";
import List from "./List";
import axios from "axios";

axios.defaults.baseURL = "https://horoscope-astrology.p.rapidapi.com";

const Home = () => {
  const sign = useRef();
  const partnerSign = useRef();
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const fetchData = async () => {
    try {
      const data = await axios.get("/affinity", {
        params: {
          sign1: `${sign.current.value}`,
          sign2: `${partnerSign.current.value}`,
        },
        headers: {
          "X-RapidAPI-Key":
            "23c2956d4bmsh4842e7b6c1d08a9p109998jsn3a0db0226955",
          "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
        },
      });
      setList(data.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();

    startTransition(() => {
      sign.current.value = "";
      partnerSign.current.value = "";
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your sign ..."
          ref={sign}
          onChange={(e) => (sign.current.value = e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your partner sign ..."
          ref={partnerSign}
          onChange={(e) => (partnerSign.current.value = e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{list && <List list={list} />}</div>
    </div>
  );
};

export default Home;
