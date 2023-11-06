import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className=" flex items-center justify-center">
      <img src="https://www.limonhost.net/makaleler/wp-content/uploads/2020/10/404-not-found-sayfa-bulunamadi-hatasi-ve-cozumu.png" />
      <p>{/* <i>{error.statusText || error.message}</i> */}</p>
    </div>
  );
};

export default ErrorPage;
