import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { Grid, Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Movie from "../models/Movies";

const RemoveMovie = ({}) => {
  const [showMore, setShowMore] = useState(280);
  // const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [indexVal, setIndexVal] = useState(0);
  const [thisKey, setThisKey] = useState(Math.random());
  const [movies, setMovies] = useState({});
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const userKey = localStorage.getItem("userKey");
    if (token && userKey) {
      let res = await fetch("/api/getMovies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadedBy: JSON.parse(userKey) }),
      });
      let response = await res.json();
      await setMovies(response.products);
    }
  }, []);
  const [showFullDesc, setShowDesc] = useState(
    Array(movies.length).fill(false)
  );

  const handleShowMoreClick = (index) => {
    const updatedShowDesc = [...showFullDesc];
    updatedShowDesc[index] = !updatedShowDesc[index];
    setShowDesc(updatedShowDesc);
  };
  const router = useRouter();
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Movie
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your movie? Your
                            Movie will be permanently removed. This action
                            cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={async () => {
                        await fetch(`/api/removeMovie`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ _id: products[indexVal]._id }),
                        });
                        await setOpen(false);
                        await setThisKey(Math.random());
                        router.push("/removemovie");
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setOpen(false);
                        setIndexVal(null);
                      }}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          {movies.length > 0 && (
            <Grid key={thisKey} container>
              {movies.map((blog, index) => (
                <Grid
                  key={blog._id}
                  item
                  xs={12}
                  lg={4}
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                  }}
                >
                  <Card
                    sx={{
                      p: 0,
                      width: "100%",
                    }}
                  >
                    <img className="w-full" src={blog.imageUrl} alt="img" />
                    <CardContent
                      sx={{
                        paddingLeft: "30px",
                        paddingRight: "30px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "h4.fontSize",
                          fontWeight: "500",
                        }}
                      >
                        {blog.title}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          mt: 1,
                        }}
                      >
                        {showFullDesc[index]
                          ? blog.desc
                          : blog.desc.substring(0, 280)}
                        <button
                          className="ml-0.5 font-bold text-gray-800"
                          onClick={() => {
                            handleShowMoreClick(index);
                          }}
                        >
                          {showFullDesc[index]
                            ? `${" "}Show less...`
                            : `${" "}Show more...`}
                        </button>
                      </Typography>
                      <Button
                        onClick={() => {
                          setIndexVal(index);
                          setOpen(true);
                        }}
                        variant="contained"
                        sx={{
                          mt: "15px",
                        }}
                        color="error"
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default RemoveMovie;
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://adityastudio:PassworD@cluster0.kllpeia.mongodb.net/?retryWrites=true&w=majority"
    );
  }
  let movie = await Movie.find({ uploadedBy: "aadisharma.in@gmail.com" });
  return {
    props: { products: JSON.parse(JSON.stringify(movie)) },
  };
}
