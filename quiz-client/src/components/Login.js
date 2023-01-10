import React from "react";
import { Button, TextField } from "@mui/material";

export default function Login() {
  return (
    <form noValidate autoComplete="off">
      <TextField label="Email" name="email" variant="outlined" />
      <TextField label="Name" name="name" variant="outlined" />
      <Button type="submit" variant="contained" size="large">
        Start
      </Button>
    </form>
  );
}
