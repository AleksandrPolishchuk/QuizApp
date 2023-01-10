import React from "react";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Center from "./Center";

export default function Login() {
  return (
    <Center>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
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
        </CardContent>
      </Card>
    </Center>
  );
}
