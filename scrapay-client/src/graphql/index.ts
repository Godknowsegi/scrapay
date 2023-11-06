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

export const CREATE_BOOK = gql`
  mutation createBook($input: CreateBookInput!) {
    createBook(createBookInput: $input) {
      id
      name
      description
      created_at
    }
  }
`;
