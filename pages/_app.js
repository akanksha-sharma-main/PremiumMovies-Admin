import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
var CryptoJS = require("crypto-js");
import { Alert, AlertTitle, Grid } from "@mui/material";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import LoadingBar from "react-top-loading-bar";
import { Fragment, useRef } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const [open, setOpen] = useState("");
  const cancelButtonRef = useRef(null);
  const [user, setUser] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useEffect(async () => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    const token = localStorage.getItem("token");
    if (token) {
      await setUser({ value: token });
      setOpen("hidden");
      await setLayoutKey(Math.random());
    } else {
      setUser({ value: null });
      setOpen("");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [warnVisible, setWarnVisible] = useState(false);
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  const setLogout = () => {
    setOpen(" ");
  };
  // o;oooooo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password != "") {
      let res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let response = await res.json();
      if (response.success) {
        setSuccessVisible(true);
        setTimeout(() => setSuccessVisible(false), 3000);
        await localStorage.setItem("token", JSON.stringify(response.token));
        await localStorage.setItem("userKey", JSON.stringify(response.email));
        await localStorage.setItem("name", JSON.stringify(response.name));
        setEmail("");
        setPassword("");
        setOpen("hidden");
        await router.push("/");
        setLayoutKey(Math.random());
      } else if (response.invalid) {
        setWarnVisible(true);
        setTimeout(() => setWarnVisible(false), 3000);
      } else {
        await setErrorVisible(true);
        await setTimeout(() => setErrorVisible(false), 3000);
      }
    }
  };
  const [layoutKey, setLayoutKey] = useState(Math.random());
  return (
    <CacheProvider value={emotionCache}>
      <LoadingBar
        color="#03c9d7"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {errorVisible && (
        <Alert className={`fixed bottom-2 right-2 z-50`} severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong className="cursor-pointer">Sorry!</strong> We are unable to
          login you.
        </Alert>
      )}
      {warnVisible && (
        <Alert className={`fixed bottom-2 right-2 z-50`} severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Invalid Credentials
        </Alert>
      )}
      {successVisible && (
        <Alert className={`fixed bottom-2 right-2 z-50`} severity="success">
          <AlertTitle>Success</AlertTitle>
          You are succesfully loggedin!
        </Alert>
      )}
      <div className={open}>
        <div className="relative z-10">
          <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          </div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="ease-out duration-300 translate-y-4 sm:translate-y-0 sm:scale-95 ease-in">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <UserCircleIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                          Login to Proceed
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Welcome back! In order to proceed, please enter your
                            registered username and password.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3  sm:px-6">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                          <label htmlFor="email-address" className="sr-only">
                            Email address
                          </label>
                          <input
                            value={email}
                            onChange={handleChange}
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            onChange={handleChange}
                            value={password}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Password"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon
                              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                              aria-hidden="true"
                            />
                          </span>
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Head>
        <title>Prmovies Admin Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <FullLayout key={layoutKey} setlog={setLogout}>
          <Component {...pageProps} setlog={setLogout}/>
        </FullLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
