import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import ApolloProvider from "./provider/AppoloProvider.tsx";

const domain = import.meta.env.VITE_DOMAIN;
const clientId = import.meta.env.VITE_CLIENT_ID;
const id = import.meta.env.VITE_AUTH_ID;
const callback_url = import.meta.env.VITE_CALLBACK;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callback_url,
        audience: id,
      }}
    >
      <ApolloProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>
);
