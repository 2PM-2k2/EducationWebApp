import React from "react";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Zoom,
  Rating,
  Grid,
} from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { getImage } from "../utils/fetchData";
const Section = ({ Type, index, data }) => {
  return (
    <Box
      sx={{
        width: "100%",
        py: "1.5rem",

        bgcolor: `${index % 2 == 0 ? "#f5f5f5" : ""}`,
      }}
    >
      <Container>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mr: "auto", fontFamily: "Bebas Neue" }}
          >
            {Type}
          </Typography>
          <Link to={`/${Type}`}>
            <Button color="primary">
              <Typography variant="body1" sx={{ textAlign: "right" }}>
                More
              </Typography>
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Link>
        </Stack>
        <hr />

        <Grid container spacing={3}>
          {data.length != 0 ? (
            data.map((course) => {
              const [image, setImage] = React.useState("");

              //get Image from database
              React.useEffect(() => {
                const loadImage = async () => {
                  const data = await getImage(course.IMG);
                  setImage(data);
                };
                loadImage();
              }, []);

              return (
                <Grid key={course.CID} item xs={12} sm={6} lg={4}>
                  <Link to="coursesdetails/0">
                    <Card>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={course.NAME}
                          src={image}
                          sx={{
                            width: "100%",
                            height: "200px",
                            objectFit: "contain",
                          }}
                        />
                        <CardContent>
                          <Stack>
                            <Typography
                              gutterBottom
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                                fontFamily: "Roboto Slab",
                              }}
                            >
                              {course.NAME}-{course.CATEGORY}
                            </Typography>
                            <Typography
                              gutterBottom
                              variant="body2"
                              component="span"
                              sx={{
                                fontWeight: "300",
                                fontFamily: "Roboto Slab",
                              }}
                            >
                              course.author
                            </Typography>
                          </Stack>
                          {/* <Rating value={5} readOnly precision={0.5} /> */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              my: 2,
                              textAlign: "left",
                              display: "block",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              lineHeight: "1.2rem",
                              maxHeight: "3.6rem",
                              fontWeight: "500",
                              fontFamily: "Poppins",
                            }}
                          >
                            {course.DESCRIPTION}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Stack
                          direction={"row"}
                          sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip
                            title="Add to Cart"
                            TransitionComponent={Zoom}
                          >
                            <IconButton color="primary">
                              <ShoppingCartIcon />
                            </IconButton>
                          </Tooltip>
                          <Typography
                            variant="body1"
                            sx={{ mr: "auto", fontWeight: "500" }}
                          >
                            {course.PRICE}đ
                          </Typography>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </Stack>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              );
            })
          ) : (
            <Grid
              item
              className="flex items-center justify-center uppercase font-sans text-3xl md:text-xl sm:text-md w-full font-thin m-3"
            >
              There is no production
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section;
