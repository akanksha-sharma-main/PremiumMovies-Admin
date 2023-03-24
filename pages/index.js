import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import SalesOverview from "../src/components/dashboard/SalseOverview";
import BaseCard from "../src/components/baseCard/BaseCard";
import Movie from "../models/Movies";
import mongoose from "mongoose";
import { Card, CardContent, Button } from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

export default function Index({ products }) {
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
      console.log(response.products, "u", JSON.parse(userKey));
      await setMovies(response.products);
      console.log( movies.length );
      console.log(products)
    }
  }, [] );
  const [showFullDesc, setShowDesc] = useState(
    Array(movies.length).fill(false)
  );

  const handleShowMoreClick = (index) => {
    const updatedShowDesc = [...showFullDesc];
    updatedShowDesc[index] = !updatedShowDesc[index];
    setShowDesc(updatedShowDesc);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      {/* <Grid item xs={12} lg={4}>
        <DailyActivity />
      </Grid> */}
      <Grid item xs={12} lg={12}>
        <BaseCard title="Product Perfomance">
          <Table
            className="snap-x"
            aria-label="simple table"
            sx={{
              mt: 3,
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Image
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Year
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.length>0 && movies.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        >
                          {product.cast}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      className="h-10"
                      variant="h6"
                    >
                      <img
                        className="rounded-md h-10"
                        src={product.imageUrl}
                      ></img>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor: "primary.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={product.releaseYear}
                    ></Chip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </BaseCard>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Grid container>
          {products.map((blog, index) => (
            <Grid
              key={index}
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
                    variant="contained"
                    sx={{
                      mt: "15px",
                    }}
                    color={blog.btncolor}
                  >
                    View
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(
      "mongodb+srv://adityastudio:PassworD@cluster0.kllpeia.mongodb.net/?retryWrites=true&w=majority"
    );
  }
  let movie = await Movie.find();
  return {
    props: { products: JSON.parse(JSON.stringify(movie)) },
  };
}
