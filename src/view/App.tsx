import { RouterProvider } from "react-router-dom";
import { mainRouter } from "../app/router";
import { Box } from "@mui/material";
import React from "react";
import SettingsDialog from "../component/dialog/SettingsDialog";
import { useAppSelector } from "../app/hooks/storeHooks";
import { selectDialog } from "../app/slices/dialogSlice";

function App() {
  const { settingsDialog } = useAppSelector(selectDialog);

  return (
    <Box sx={{ display: "grid", placeContent: "center", width: "100vw", height: "100vh", minWidth: 781 }}>
      <RouterProvider router={mainRouter}></RouterProvider>
      <SettingsDialog open={settingsDialog.open} handleClose={() => {}} />
    </Box>
  )
}

export default App;
