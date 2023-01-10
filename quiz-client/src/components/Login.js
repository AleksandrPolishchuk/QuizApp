import React from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

export default function Login() {
  return (
    <Box
      sx={{
        "& .MuiTextField-root": {
          m: 1,
        },
      }}
    >
      <form noValidate autoComplete="off">
        <TextField label="Email" name="email" variant="outlined" />
        <TextField label="Name" name="name" variant="outlined" />
        <Button type="submit" variant="contained" size="large">
          Start
        </Button>
      </form>
    </Box>
  );
}
