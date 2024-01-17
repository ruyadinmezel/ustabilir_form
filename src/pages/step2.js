import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material";
import Box from "@mui/material";
import store from "@/store/store";
import { createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import Grid from "@mui/material";
import Button from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";

export default function Step2() {
  const theme = createTheme({
    palette: {
      primary: {
        light: orange[500],
        main: orange[700],
        dark: orange[900],
        bggrey: grey[100],
      },
    },
  });

  const cityRedux = useSelector((state) => state.city);
  const districtRedux = useSelector((state) => state.district);
  const categoryRedux = useSelector((state) => state.category);

  // Now you can log or use the values as needed
  console.log("City:", cityRedux);
  console.log("District:", districtRedux);
  console.log("Category:", categoryRedux);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Step2</h1>
        <h2>Hizmet Kategorisi</h2>
        <h3> {categoryRedux.categoryName}</h3>
        <h2>Konum</h2>
        <h3>
          {cityRedux.cityName} - {districtRedux.districtName}
        </h3>
        {/* <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={3}>
              <Box
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: 350,
                  height: 380,
                  ml: 3,
                  mt: 5,
                }}
              >
                <Box
                  sx={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    backgroundColor: theme.palette.primary.dark,
                    width: 350,
                    height: 50,
                  }}
                ></Box>

                <Box sx={{ ml: 5 }}>
                  <Box sx={{ height: 40 }}></Box>
                  <Typography>
                    <strong>Hizmet Kategorisi</strong>
                  </Typography>
                  <Typography>{categoryRedux.categoryName}</Typography>
                  <Box sx={{ height: 7 }}></Box>
                  <Typography>
                    <strong>Konum</strong>
                  </Typography>
                  <Typography>
                    {cityRedux.cityName} - {districtRedux.districtName}
                  </Typography>

                  <Box sx={{ mt: 5, mr: 5 }}>
                    <Button variant="contained" color="primary" fullWidth>
                      <Typography sx={{ color: "white" }}>
                        {" "}
                        Talebi Gönder
                      </Typography>
                    </Button>
                  </Box>

                  <Box sx={{ height: 5 }}></Box>
                </Box>
              </Box>
            </Grid>
          </Grid> */}
      </div>
    </ThemeProvider>
  );
}
