
import React, { useEffect, useState, useRef } from "react";
import { fetchedData} from "./redux/features/FetchDataSlice";
import { useDispatch} from "react-redux";
import Watchlist from "./components/Watchlist";

function Data() {
    const [data, setData] = useState([]);
const dispatch = useDispatch();
    const fetchData = async () => {
        try{      await fetch("https://api.jikan.moe/v4/anime")
                .then((response) => {
                  return response.json();
                })
                .then((item) => {
                  let tempData = item.data;
                  setData(
                    tempData.map((item) => {
                      return {
                        id: item.mal_id,
                        title: item.title,
                        image: item.images.jpg.image_url,
                        popularity: item.popularity,
                     
                        genre: item.genres.map((item) => {
                          return item.name;
                          
                        }),
                      };
                    })
                  );
                });}catch (error) {
                  console.error(error);
                }
            };
      useEffect(() => {
    
        fetchData();
        
        dispatch(fetchedData(data));
      }, []);

      useEffect(() => {
        dispatch(fetchedData(data));
      }, [ data]);
    


}

export default Data;


