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
import Autocomplete from "@mui/material/Autocomplete";
import { Divider, Grid, createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Stack from "@mui/material/Stack";
import CategoryOption from "@/components/CategoryOption";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/store";
import { setCity1 } from "@/store/reducers/cityReducer";
import { setCategory1 } from "@/store/reducers/categoryReducer";
import { setDistrict1 } from "@/store/reducers/districtReducer";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const steps = ["Talep oluştur", "Talebi tamamla"];

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    console.log("First Step Complete!");
    console.log("Directing to second step...");
    router.push("/step2");
  };
  const isButtonClickable = () => {
    // Check if all necessary choices are made
    return categoryName !== "" && cityId !== "" && districtName !== "";
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
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const [city, setCity] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [districtId, setDistrictId] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const [selectedCityRedux, setSelectedCityRedux] = useState("");
  // const [selectedDistrictRedux, setSelectedDistrictRedux] = useState("");
  // const [selectedCategoryRedux, setSelectedCategoryRedux] = useState("");
  // const [selectedCityIdRedux, setSelectedCityIdRedux] = useState("");
  // const [selectedDistrictIdRedux, setSelectedDistrictIdRedux] = useState("");
  // const [selectedCategoryIdRedux, setSelectedCategoryIdRedux] = useState("");

  const cityRedux = useSelector((state) => state.city);
  const districtRedux = useSelector((state) => state.district);
  const categoryRedux = useSelector((state) => state.category);

  // Now you can log or use the values as needed
  console.log("City:", cityRedux);
  console.log("District:", districtRedux);
  console.log("Category:", categoryRedux);

  useEffect(() => {
    // Save the original console.warn function
    const originalWarn = console.warn;
    // Override console.warn to suppress Autocomplete warnings
    console.warn = (message) => {
      if (
        !message.includes("MUI: The value provided to Autocomplete is invalid")
      ) {
        originalWarn(message);
      }
    };
    // Clean up the override when the component is unmounted
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const req = await fetch("/api/getCategories");
        const response = await req.json();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getCity = async () => {
      const req = await fetch("/api/getCity");
      const getCity = await req.json();
      setCity(getCity.data);
    };

    getCity();
  }, []);

  useEffect(() => {
    const getDistrict = async () => {
      if (cityId) {
        try {
          const req = await fetch(`/api/getDistrict?cityId=${cityId}`);
          const response = await req.json();
          setDistrict(response);
        } catch (error) {
          console.error("Error fetching district data:", error);
        }
      }
    };

    getDistrict();
  }, [cityId]);

  const handleCityChange = (event, selectedCity) => {
    if (selectedCity) {
      setCityName(selectedCity.name);
      setCityId(selectedCity.id);

      // console.log("Selected City Name:", selectedCity.name);
      // console.log("Selected City ID:", selectedCity.id);

      dispatch(setCity1(selectedCity));
    }
  };

  const handleDistrictChange = (event, selectedDistrict) => {
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.name);
      setDistrictId(selectedDistrict.id);
      // console.log("Selected District Name:", selectedDistrict.name);
      //console.log("Selected District ID:", selectedDistrict.id);
      dispatch(setDistrict1(selectedDistrict));
    }
  };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryChange = (event, subCategoryId, subCategoryname) => {
    if (subCategoryId && subCategoryname) {
      setCategoryName(subCategoryname);
      setCategoryId(subCategoryId);

      dispatch(setCategory1({ name: subCategoryname, id: subCategoryId }));
      // console.log("Selected Category Name:", subCategoryname);
      //console.log("Selected Category ID:", subCategoryId);
      setOpen(false);
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
                    <h1>Talep Oluştur </h1>
                  </Box>
                  <Box maxWidth="xs" sx={{ ml: [2, 15] }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <CircleIcon color="primary"></CircleIcon>

                      <h1>Kategori</h1>
                    </Stack>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={category}
                      renderOption={(props, option) => (
                        <CategoryOption
                          key={option.id}
                          option={option}
                          handleCategoryChange={handleCategoryChange}
                        />
                      )}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={handleCategoryChange}
                      open={open}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
                      sx={{ width: 300 }}
                      value={
                        categoryName !== "" ? { name: categoryName } : null
                      }
                      renderInput={(params) => (
                        <TextField {...params} label={"Kategori Ara"} />
                      )}
                    />

                    <Stack direction="row" alignItems="center" gap={1}>
                      <CircleIcon color="primary"></CircleIcon>
                      <h1>Konum</h1>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={city}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        onChange={handleCityChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="İl seçiniz" />
                        )}
                      />
                      <Box sx={{ height: 10 }}></Box>
                      <Autocomplete
                        key={cityId}
                        disablePortal
                        id="combo-box-demo"
                        options={district}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        onChange={handleDistrictChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="İlçe Seçiniz" />
                        )}
                      />
                      <Box sx={{ height: 10 }}></Box>
                    </Stack>

                    <Stack direction="row" alignItems="center" gap={1}>
                      <CircleIcon color="primary"></CircleIcon>
                      <h1>Usta Seçimi</h1>
                    </Stack>

                    <Box sx={{ height: 200 }}></Box>
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

                    <Box sx={{ mt: 5, mr: 5 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                        fullWidth
                        disabled={!isButtonClickable()}
                      >
                        <Typography sx={{ color: "white" }}>
                          {" "}
                          Devam Et
                        </Typography>
                      </Button>

                      {/* <Button
                        href="https://www.ustabilir.com/"
                        variant="outlined"
                        sx={{ mt: 3 }}
                        fullWidth
                      >
                        <Typography> Vazgeç</Typography>
                      </Button> */}
                    </Box>

                    <Box sx={{ height: 5 }}></Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </ThemeProvider>
    </Provider>
  );
}
