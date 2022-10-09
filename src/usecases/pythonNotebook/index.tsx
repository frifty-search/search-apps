import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

const PythonNotebook: React.FC<{
  data: string;
}> = ({ data }: { data: string }) => {
  return (
    <Box sx={{ width: 1, backgroundColor: "background.main", m: 4 }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        alignContent="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="h2">
          You can launch an interactive python notebook directly from your
          Google Drive using Colab. {"   "}
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open(data)}
          >
            Click here
          </Button>
        </Typography>
      </Stack>
    </Box>
  );
};

export default PythonNotebook;
