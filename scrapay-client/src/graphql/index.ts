import { gql } from "@apollo/client";

export const All_BOOKS = gql`
  {
    books {
      id
      description
      name
      created_at
    }
  }
`;
export const UPDATE = gql`
  mutation updateBook($input: UpdateBookInput!) {
    updateBook(updateBookInput: $input) {
      id
      description
      name
    }
  }
`;

export const DELETE = gql`
  mutation remove($input: Int!) {
    removeBook(id: $input) {
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
