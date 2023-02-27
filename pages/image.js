import { Grid, ImageList, ImageListItem } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import Movie from "../models/Movies";
import mongoose from 'mongoose';

const Images = ({itemData}) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Grid Image">
          <ImageList
            sx={{ height: 450 }}
            variant="quilted"
            cols={2}
            rowHeight={121}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={1}
                rows={2}
              >
                <img className="rounded-lg"
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </BaseCard>
      </Grid>
    </Grid>
  );
};

export default Images;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect('mongodb://localhost:27017/prmovies')
  }
  let movie = await Movie.find()
  return {
    props: { itemData: JSON.parse(JSON.stringify(movie)) },
  }
}