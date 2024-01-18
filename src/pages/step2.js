import * as React from "react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Divider, Grid, createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Stack from "@mui/material/Stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/store";
import { useFormik } from "formik";
import { setDescription } from "@/store/reducers/descriptionReducer";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"] });
const steps = ["Talep oluştur", "Talebi tamamla"];

export default function Step2() {
  const [activeStep, setActiveStep] = useState(1);
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };
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
  const descriptionRedux = useSelector((state) => state.description);
  const dispatch = useDispatch();
  // const [description, setDescription] = useState("");

  // Now you can log or use the values as needed
  // console.log("City:", cityRedux);
  // console.log("District:", districtRedux);
  // console.log("Category:", categoryRedux);
  console.log("Description:", descriptionRedux);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.currentTarget.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        formik.setValues({
          ...formik.values,
          image: selectedFile,
          base64Image: reader.result, // Save base64-encoded image
        });
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const formik = useFormik({
    initialValues: {
      descriptionText: "",
      image: null, // Add the image field
      base64Image: "", // Add the base64Image field
    },

    onSubmit: (values) => {
      // Dispatch the action with the description and base64-encoded image
      dispatch(
        setDescription({
          text: values.descriptionText,
          image: values.base64Image,
        })
      );
      // Other form submission logic
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Box>
              <Container
                sx={{ m: 2, mt: [5, 10], ml: [0, "15rem"], width: "100%" }}
              >
                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton color="light">{label}</StepButton>
                    </Step>
                  ))}
                </Stepper>
              </Container>
              <Divider sx={{ mt: 3 }}></Divider>

              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12} md={2}></Grid>
                <Grid item xs={12} md={6} elevation={2}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      width: "100%",
                      height: "100%",
                      mt: 5,
                    }}
                  >
                    <Box sx={{ height: 30 }}></Box>
                    <Box sx={{ ml: 10 }}>
                      <h1>Talebi Tamamla </h1>

                      <Box maxWidth="xs" sx={{ ml: [2, 5] }}>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <CircleIcon color="primary"></CircleIcon>

                          <h1>Açıklama</h1>
                        </Stack>
                        <Box sx={{ mr: 5 }}>
                          <TextField
                            id="descriptionText"
                            label="Açıklama Ekle"
                            multiline
                            rows={4}
                            length={300}
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.descriptionText}
                          />
                        </Box>
                        <Stack direction="row" alignItems="center" gap={1}>
                          <CircleIcon color="primary"></CircleIcon>
                          <h1>Fotoğraf Ekle</h1>
                        </Stack>
                        <Typography sx={{ mb: 1 }}>
                          Talebinizin detaylarını anlatan en fazla 6 adet
                          fotoğraf yükleyebilirsiniz
                        </Typography>
                        <Box sx={{ mr: 5 }}>
                          <TextField
                            id="imageInput"
                            label="Fotoğrafları sürükleyin veya dosya seçin."
                            multiline
                            rows={4}
                            fullWidth
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const selectedFile = e.dataTransfer.files[0];
                              if (selectedFile) {
                                handleFileInputChange({
                                  currentTarget: { files: [selectedFile] },
                                });
                              }
                            }}
                          ></TextField>
                        </Box>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileInputChange}
                        />
                        <Box sx={{ height: 142 }}></Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
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
                      <Typography>
                        <strong>Description</strong>
                      </Typography>
                      <Typography>{descriptionRedux.text}</Typography>
                      <Typography>
                        <strong>Image</strong>
                      </Typography>
                      <Typography>{descriptionRedux.image}</Typography>

                      <Box sx={{ mt: 5, mr: 5 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={formik.handleSubmit}
                        >
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
              </Grid>
            </Box>
          </div>
        </form>
      </ThemeProvider>
    </Provider>
  );
}
