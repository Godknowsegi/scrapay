import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 ">
      <main className="flex flex-1 px-2 justify-center items-center">
        <section
          className="w-full max-w-md p-8 space-y-4 bg-white rounded-md shadow-lg 
        "
        >
          <h2 className=" text-xl md:text-3xl font-semibold text-center text-gray-700 ">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Please login to continue
          </p>
          <Button className="bg-gray-800" colorScheme="black">
            Login
          </Button>
        </section>
      </main>
    </div>
  );
}
