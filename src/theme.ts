import { createTheme } from "@mui/material";
import { yellow } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    lita: Palette["primary"];
  }
  interface PaletteOptions {
    lita: PaletteOptions["primary"];
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupPropsColorOverrides {
    lita: true;
  }
}

export const theme = createTheme({
  colorSchemes: {
    dark: true
  },
  palette: {
    mode: "light",
    lita: {
      main: yellow["A700"]
    }
  }
});
