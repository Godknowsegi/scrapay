import { gql } from "@apollo/client";

export const All_BOOKS = gql`
  {
    books {
      id
      description
      name
    }
  }
`;
