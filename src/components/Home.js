import React, { useRef, useState, useTransition } from "react";
import List from "./List";
import axios from "axios";

axios.defaults.baseURL = "https://horoscope-astrology.p.rapidapi.com";

const Home = () => {
  const sign = useRef();
  const partnerSign = useRef();
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();
  console.log(process.env.REACT_APP_RAPIDAPI_KEY);

  const fetchData = async () => {
    try {
      const data = await axios.get("/affinity", {
        params: {
          sign1: `${sign.current.value}`,
          sign2: `${partnerSign.current.value}`,
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
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
        <label for={sign}>Choose your sign: </label>
        <select
          ref={sign}
          onChange={(e) => (sign.current.value = e.target.value)}
        >
          <option value="aries">aries</option>
          <option value="taurus">taurus</option>
          <option value="cancer">cancer</option>
          <option value="leo">leo</option>
          <option value="virgo">virgo</option>
          <option value="libra">libra</option>
          <option value="scorpio">scorpio</option>
          <option value="sagittarius">sagittarius</option>
          <option value="capricorn">capricorn</option>
          <option value="aquarius">aquarius</option>
          <option value="pisces">pisces</option>
        </select>
        {/* <input
          type="text"
          placeholder="Enter your sign ..."
          ref={sign}
          onChange={(e) => (sign.current.value = e.target.value)}
        /> */}
        <label for={partnerSign}>Choose your partner sign : </label>
        <select
          ref={partnerSign}
          onChange={(e) => (partnerSign.current.value = e.target.value)}
        >
          <option value="aries">aries</option>
          <option value="taurus">taurus</option>
          <option value="cancer">cancer</option>
          <option value="leo">leo</option>
          <option value="virgo">virgo</option>
          <option value="libra">libra</option>
          <option value="scorpio">scorpio</option>
          <option value="sagittarius">sagittarius</option>
          <option value="capricorn">capricorn</option>
          <option value="aquarius">aquarius</option>
          <option value="pisces">pisces</option>
        </select>
        {/* <input
          type="text"
          placeholder="Enter your partner sign ..."
          ref={partnerSign}
          onChange={(e) => (partnerSign.current.value = e.target.value)}
        /> */}
        <button type="submit">Submit</button>
      </form>
      <div>{list && <List list={list} />}</div>
    </div>
  );
};

export default Home;
