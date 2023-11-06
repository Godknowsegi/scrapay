import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { All_BOOKS, CREATE_BOOK } from "../../graphql/index";
import EmptyState from "../../components/EmtyState";
import { MdHourglassEmpty } from "react-icons/md";
import { bookType } from "../../interface";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Textarea,
  useDisclosure,
  Text,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { data, loading, error, refetch } = useQuery(All_BOOKS);
  const books = error || data === undefined ? [] : data?.books;
  const [isError, setIsError] = useState(false);

  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [mutate, {}] = useMutation(CREATE_BOOK);
  const toast = useToast();

  let handleInputChange1 = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue1(inputValue);
  };
  let handleInputChange2 = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue2(inputValue);
  };

  const onCreate = async () => {
    try {
      if (value1 == "" || value2 == "") {
        setIsError(true);
      } else {
        const variables = {
          input: {
            name: value1,
            description: value2,
          },
        };
        const { data } = await mutate({ variables });

        if (data) {
          refetch();
          onClose();
          toast({
            title: `success.`,
            description: `book created successfully.`,
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          setValue1("");
          setValue2("");
        }
      }
    } catch (err) {
      toast({
        title: `Something went wrong`,

        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };
console.log(books);

  return (
    <div>
      <div className=" mt-5 p-3">
        {books.length < 1 ? (
          <EmptyState
            Icon={MdHourglassEmpty}
            text="There's no book available to display"
            button
            buttonText="Create "
            onClick={onOpen}
          />
        ) : (
          <table id="admin_users" className="min-w-[850px] w-full ">
            <thead className=" bg-[#fbfbff] text-textColor text-sm w-full rounded-t-lg">
              <tr className="">
                <td className="">Book Name</td>
                <td className="text-center p-2">Description</td>
                <td className="text-center">Cretated at</td>
                <td className="text-right">Action</td>
              </tr>
            </thead>

            <tbody className="mx-4 ">
              {/* {rows} */}
              {books
                .sort(
                  (
                    a: { created_at: string | number | Date },
                    b: { created_at: string | number | Date }
                  ) => {
                    const dateA = new Date(a.created_at).getTime();
                    const dateB = new Date(b.created_at).getTime();
                    return dateB - dateA;
                  }
                )
                .map(
                  (element: bookType, index: React.Key | null | undefined) => (
                    <tr
                      key={index}
                      className=" group   rounded-lg text-sm w-full  text-textColor "
                    >
                      <td className="md:text-base text-xs   ">
                        <div className="  border-y border-l p-2 group-hover:border-secondary  py-2 rounded-l-lg w-full">
                          <div className="flex h-10  items-center space-x-3">
                            <div className="flex flex-col items-start justify-start">
                              <p className="text-textColor text-xs">
                                {element.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="md:text-base text-xs ">
                        <div className=" border-y group-hover:border-secondary items-center justify-center flex  py-2 w-full">
                          <div className="flex h-10  items-center space-x-3">
                            <p className="text-textColor text-xs">
                              {element.description.substring(0, 20)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="md:text-base text-xs ">
                        <div className=" border-y group-hover:border-secondary items-center justify-center flex  py-2 w-full">
                          <div className="flex h-10  items-center space-x-3">
                            <p className="text-textColor text-xs">
                              {`${element.created_at}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="md:text-base text-xs   ">
                        <div className=" border-y border-r p-2 items-center justify-end flex group-hover:border-secondary  py-2 rounded-r-lg w-full">
                          <div className="flex space-x-3 h-10 w-24 items-center justify-center">
                            <span
                              onClick={() => {
                                // setOpenModal(true);
                                // setuserToD(element);
                              }}
                              className="flex space-x-2 w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200  cursor-pointer justify-center items-center text-xs p-1"
                            >
                              <AiOutlineEdit />
                            </span>
                            <span
                              onClick={() => {
                                // setOpenDModal(true);
                                // setuserToD(element);
                              }}
                              className="flex space-x-2 w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200  cursor-pointer justify-center items-center text-xs p-1"
                            >
                              <AiOutlineDelete />
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        )}
      </div>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="p-3 space-y-3 m-3">
            <FormControl isInvalid={isError}>
              <Text mb="8px" className="text-sm">
                Book title:
              </Text>
              <Input
                value={value1}
                onChange={handleInputChange1}
                placeholder="title.."
                size="sm"
              />{" "}
              <Text mb="8px" className="text-sm">
                Book description:
              </Text>
              <Textarea
                value={value2}
                onChange={handleInputChange2}
                placeholder="write"
                size="sm"
              />
            </FormControl>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={onCreate} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
export default Home;
function mutate(arg0: {
  variables: { input: { name: string; description: string } };
}): { data: any } | PromiseLike<{ data: any }> {
  throw new Error("Function not implemented.");
}
