import {
  ApolloClient,
  ApolloProvider as APC,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { GetTokenSilentlyOptions, useAuth0 } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";

const createApolloClient = (baseURL :string, getAccessToken: { (options: GetTokenSilentlyOptions & { detailedResponse: true; }): Promise<GetTokenSilentlyVerboseResponse>; (options?: GetTokenSilentlyOptions | undefined): Promise<string>; (options: GetTokenSilentlyOptions): Promise<string | GetTokenSilentlyVerboseResponse>; (): any; }) => {
  const httpLink = createHttpLink({
    uri: baseURL,
  });

  const authLink = setContext(async () => {
    const token = await getAccessToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { getAccessTokenSilently } = useAuth0();

  const apolloClient = createApolloClient(BASE_URL, getAccessTokenSilently);

  return <APC client={apolloClient}>{children}</APC>;
};

export default ApolloProvider;
