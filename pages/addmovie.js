import React, { useState } from 'react'
import { Grid, Stack, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";

// const postDatas = () => {
//   fetch('http://localhost:3000/api/addMovie', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ title, slug, desc, imageUrl, videoUrl, releaseYear, cast }),
//   })

//   console.log("data successfully submited");
//   setTitle('')
//   setSlug('')
//   setDesc('')
//   setImageUrl('')
//   setVideoUrl('')
//   setReleaseYear('')
//   setCast('')
// }

const AddMovie = () => {
  const [title, setTitle] = useState()
  const [slug, setSlug] = useState()
  const [desc, setDesc] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [videoUrl, setVideoUrl] = useState()
  const [releaseYear, setReleaseYear] = useState()
  const [cast, setCast] = useState()

  const handleChange = (e) => {
    if (e.target.name == 'title') {
      setTitle(e.target.value)
      setSlug(e.target.value)
    }

    else if (e.target.name == 'imageUrl') {
      setImageUrl(e.target.value)
    }
    else if (e.target.name == 'videoUrl') {
      setVideoUrl(e.target.value)
    }
    else if (e.target.name == 'releaseYear') {
      setReleaseYear(e.target.value)
    }
    else if (e.target.name == 'cast') {
      setCast(e.target.value)
    }
    else if (e.target.name == 'description') {
      setDesc(e.target.value)
    }
  }






  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add your Movie">

          <Stack spacing={3}>
            <TextField onChange={handleChange}
              id="name-basic"
              label="Title"
              variant="outlined"
              defaultValue=""
              name="title"
              value={title}
              required
            />
            <TextField onChange={handleChange}
              id="name-basic"
              label="Cast"
              variant="outlined"
              defaultValue=""
              name="cast"
              value={cast}
              required
            />
            <TextField
              onChange={handleChange}
              id="url-basic"
              label="Image Url"
              variant="filled"
              defaultValue=""
              name="imageUrl"
              value={imageUrl}
              required
            />
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
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Terms & Condition"
              />
            </FormGroup>
          </Stack>
          <br />
          <button onClick={() => {
            fetch(`${process.env.HOST_URI}/api/addMovie`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, slug, desc, imageUrl, videoUrl, releaseYear, cast }),
            })
          }} variant="contained" mt={2}>
            Submit
          </button>

        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default AddMovie;