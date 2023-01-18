import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BASE_URL } from "../api";

export default function Answer({ qnAnswers }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ mt: 5, width: "100%", maxWidth: 640, mx: "auto" }}>
      {qnAnswers.map((item, j) => (
        <Accordion
          disableGutters
          key={j}
          expanded={expanded === j}
          onChange={handleChange(j)}
        >
          <AccordionSummary>
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              {item.qnInWords}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.imageName ? (
              <CardMedia
                component="img"
                image={BASE_URL + "images/" + item.imageName}
                sx={{ m: "10px auto", width: "auto" }}
              />
            ) : null}
            <List>
              {item.options.map((x, i) => (
                <ListItem key={i}>
                  <Typography>
                    <b>{String.fromCharCode(65 + i) + " . "}</b>
                    {x}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
