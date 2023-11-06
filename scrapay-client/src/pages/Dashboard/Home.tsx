import { useQuery } from "@apollo/client";
import React from "react";
import { All_BOOKS } from "../../graphql/index";

function Home() {
  const { data, loading, error, refetch } = useQuery(All_BOOKS);

  const books = error || data === undefined ? [] : data?.books;
  return <div>Home</div>;
}

export default Home;
