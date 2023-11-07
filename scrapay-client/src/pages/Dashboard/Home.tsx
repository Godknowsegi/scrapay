import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { All_BOOKS, CREATE_BOOK, DELETE, UPDATE } from "../../graphql/index";
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
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const cancelRef = React.useRef(null);
  const cancelRef2 = React.useRef(null);
  const { data, error, refetch } = useQuery(All_BOOKS);
  const allbook = error || data === undefined ? [] : data?.books;
  const [books, setBooks] = useState<bookType[]>(allbook);
  const [isError, setIsError] = useState(false);
  const [loader, setloader] = useState(false);
  const [actionType, setactionType] = React.useState("create");
  const [booktoD, setbooktoD] = useState<bookType>();

  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const toast = useToast();
  const [mutate, {}] = useMutation(CREATE_BOOK);
  const [update, {}] = useMutation(UPDATE);
  const [delet, {}] = useMutation(DELETE);

  useEffect(() => {
    setBooks(allbook);
  }, [allbook]);

  let handleInputChange1 = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue1(inputValue);
  };
  let handleInputChange2 = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue2(inputValue);
  };

  const onCreate = async () => {
    setloader(true);
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
          setloader(false);
          setValue1("");
          setValue2("");
        }
      }
    } catch (err) {
      setloader(false);

      toast({
        title: `Something went wrong`,

        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const onEdit = async () => {
    setloader(true);
    try {
      if (value1 == "" || value2 == "") {
        setIsError(true);
      } else {
        const variables = {
          input: {
            id: Number(booktoD?.id),
            name: value1,
            description: value2,
          },
        };
        const { data } = await update({ variables });

        if (data) {
          refetch();
          onClose();
          toast({
            title: `success.`,
            description: `book updated successfully.`,
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          setloader(false);
          setValue1("");
          setValue2("");
        }
      }
    } catch (err) {
      setloader(false);

      toast({
        title: `Something went wrong`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const onDelete = async () => {
    setloader(true);
    try {
      if (booktoD == undefined) {
        toast({
          title: `select a book to delete`,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else {
        const variables = {
          id: Number(booktoD?.id),
        };
        const { data } = await delet({ variables });

        if (data) {
          refetch();
          onClose2();
          toast({
            title: `success.`,
            description: `book deleted successfully.`,
            status: "success",
            duration: 6000,
            isClosable: true,
          });
          setloader(false);
          setbooktoD(undefined);
        }
      }
    } catch (err) {
      setloader(false);

      toast({
        title: `Something went wrong`,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="space-y-3">
      {books.length >= 1 ? (
        <Button className="!font-normal  !scale-90" onClick={onOpen}>
          Create Book
        </Button>
      ) : null}

      <div className="w-full mt-5 p-3  overflow-x-auto ">
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
              {books.map(
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
                            {`${new Date(element.created_at)}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="md:text-base text-xs   ">
                      <div className=" border-y border-r p-2 items-center justify-end flex group-hover:border-secondary  py-2 rounded-r-lg w-full">
                        <div className="flex space-x-3 h-10 w-24 items-center justify-center">
                          <span
                            onClick={() => {
                              setactionType("edit");
                              setbooktoD(element);
                              onOpen();
                              setValue1(element.name);
                              setValue2(element.description);
                            }}
                            className="flex space-x-2 w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200  cursor-pointer justify-center items-center text-xs p-1"
                          >
                            <AiOutlineEdit />
                          </span>
                          <span
                            onClick={() => {
                              setbooktoD(element);
                              onOpen2();
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
              <Button
                isLoading={loader}
                colorScheme="green"
                onClick={actionType == "create" ? onCreate : onEdit}
                ml={3}
              >
                {actionType == "create" ? " Save" : "Update"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="m-3">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Book
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose2}>
                Cancel
              </Button>
              <Button
                isLoading={loader}
                colorScheme="red"
                onClick={onDelete}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
}
export default Home;
