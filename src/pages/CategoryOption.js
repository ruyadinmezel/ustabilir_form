import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const CategoryOption = ({ option, handleCategoryChange }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCheckboxChange = (e, subCategoryId, subCategoryName) => {
    setSelectedSubCategory(subCategoryId);
    handleCategoryChange(e, subCategoryId, subCategoryName);
  };
  return (
    <Accordion key={option}>
      <AccordionSummary>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <Typography key={option.name}>{option.name}</Typography>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <ExpandMoreIcon />
          </Grid>
        </Grid>
      </AccordionSummary>

      {option.subCategories.map((subCategory) => (
        <AccordionDetails key={subCategory.name}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <Checkbox
                checked={selectedSubCategory === subCategory.id}
                onChange={(e) =>
                  handleCheckboxChange(e, subCategory.id, subCategory.name)
                }
              />
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ ml: 3 }}>{subCategory.name}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      ))}
    </Accordion>
  );
};

export default CategoryOption;
