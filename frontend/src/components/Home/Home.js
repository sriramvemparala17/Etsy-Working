import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Redirect from "../Redirect/Redirect";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";
import SearchProductList from "./SearchProductList";
import Search from "./Search";
import axios from "axios";

export default function Home({ userData }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [items, setItems] = useState([[]]);
  let search = searchParams.get("search");
  useEffect(() => {
    async function getItems() {
      const response = await axios.get("http://localhost:3001/getsearchitems", {
        params: { keyword: search, filter: filter },
      });
      setItems(response.data);
    }
    getItems();
    console.log(items);
  }, [filter, sort]);

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  return (
    <>
      <Navbar />

      <div className="container">
        {/* {console.log(items.sort(compareValues("price")))} */}
        {search ? (
          <Search
            filter={filter}
            setFilter={setFilter}
            items={items}
            compareValues={compareValues}
            setItems={setItems}
            setSort={setSort}
          />
        ) : (
          <div>
            <div className="row"></div>
            <div className="row">
              <div className="col-md-12 mt-3">
                <h1>SHOPIFY</h1>
              </div>
            </div>
          </div>
        )}
        <div className="row mt-5">
          {search ? (
            <SearchProductList
              items={items}
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
            />
          ) : (
            <ProductList />
          )}
        </div>
      </div>
    </>
  );
}
