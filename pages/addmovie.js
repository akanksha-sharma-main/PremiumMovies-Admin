import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import { Alert, AlertTitle } from "@mui/material";
import Link from "next/link";

const AddMovie = ({ setlog }) => {
  const [title, setTitle] = useState();
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [releaseYear, setReleaseYear] = useState();
  const [cast, setCast] = useState();
  const [slugSuc, setSlugSuc] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const canvasRef = useRef(null);
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = await createImageBitmap(file);
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setImageUrl(dataUrl);
  };
  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
      setSlug(e.target.value);
    } else if (e.target.name == "imageUrl") {
      setImageUrl(e.target.value);
    } else if (e.target.name == "videoUrl") {
      setVideoUrl(e.target.value);
    } else if (e.target.name == "releaseYear") {
      setReleaseYear(e.target.value);
    } else if (e.target.name == "cast") {
      setCast(e.target.value);
    } else if (e.target.name == "description") {
      setDesc(e.target.value);
    }
  };
  const [uploadedBy, setUploadedBy] = useState("");
  const [user, setUser] = useState({ value: null });
  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setUploadedBy(JSON.parse(localStorage.getItem("userKey")));
    } else {
      setUser({ value: null });
    }
  }, []);
  return (
    <Grid container spacing={0}>
      <style jsx global>{`
        .css-jzmcfy-MuiPaper-root-MuiCard-root {
          margin: "0px";
        }
      `}</style>
      <Grid item xs={12} lg={12}>
        {!user.value && (
          <Button variant="contained" onClick={setlog}>
            Login
          </Button>
        )}
        {user.value && (
          <BaseCard title="Add your Movie">
            <Stack spacing={3}>
              <TextField
                onChange={handleChange}
                id="name-basic"
                label="Title"
                variant="outlined"
                defaultValue=""
                name="title"
                value={title}
                required
              />
              <TextField
                onChange={handleChange}
                id="name-basic"
                label="Cast"
                variant="outlined"
                defaultValue=""
                name="cast"
                value={cast}
                required
              />
              <div className="border-none">
                {imageUrl ? (
                  <img
                    className="rounded-md"
                    src={imageUrl}
                    alt="Uploaded image"
                  />
                ) : (
                  <>
                    <input
                      className="p-3 border-gray-900/30 w-full rounded border hover:border-black"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                  </>
                )}
              </div>
              <TextField
                onChange={handleChange}
                id="name-basic"
                label="Video Url"
                variant="filled"
                defaultValue=""
                name="videoUrl"
                value={videoUrl}
                required
              />

              <TextField
                onChange={handleChange}
                value={releaseYear}
                name="releaseYear"
                id="date-basic"
                label="Year Of Release"
                variant="outlined"
                defaultValue=""
                type="number"
                min="1920"
                max="2050"
                required
              />
              <TextField
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue=""
                value={desc}
                name="description"
                required
              />
              {errorVisible && (
                <Alert
                  className={`fixed bottom-2 right-2 z-50`}
                  severity="error"
                >
                  <AlertTitle>Error</AlertTitle>
                  <strong className="cursor-pointer">Sorry!</strong> We are
                  unable to add your movie.
                </Alert>
              )}
              {successVisible && (
                <Alert
                  className={`fixed bottom-2 right-2 z-50`}
                  severity="success"
                >
                  <AlertTitle>Success</AlertTitle>
                  Your Movie is added successfully{" "}
                  <Link href={slugSuc}>
                    <strong className="cursor-pointer">check it out!</strong>
                  </Link>
                </Alert>
              )}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Terms & Condition"
                />
              </FormGroup>
            </Stack>
            <br />
            <Button
              onClick={async () => {
                try {
                  const response = await fetch("/api/upload-image", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ imageUrl: dataUrl }),
                  });

                  if (!response.ok) {
                    throw new Error("Failed to upload image");
                  }

                  const { imageUrl } = await response.json();
                  console.log(`Uploaded image URL: ${imageUrl}`);
                } catch (error) {
                  console.error(error);
                }
                await fetch(`/api/addMovie`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title,
                    slug,
                    desc,
                    imageUrl,
                    videoUrl,
                    releaseYear,
                    cast,
                    uploadedBy,
                  }),
                })
                  .then((response) => {
                    if (response.status == 200) {
                      setSuccessVisible(true);
                      setTimeout(() => setSuccessVisible(false), 3000);
                      setSlugSuc(slug);
                      setTitle("");
                      setDesc("");
                      setSlug("");
                      setCast("");
                      setVideoUrl("");
                      setImageUrl(null);
                      setReleaseYear("");
                    }
                  })
                  .catch(async (error) => {
                    await setErrorVisible(true);
                    await setTimeout(() => setErrorVisible(false), 3000);
                  });
              }}
              variant="contained"
              mt={2}
            >
              Submit
            </Button>
          </BaseCard>
        )}
      </Grid>
    </Grid>
  );
};

export default AddMovie;
