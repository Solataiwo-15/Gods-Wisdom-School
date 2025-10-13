// src/theme/index.ts
import { extendTheme } from "@chakra-ui/react";

// We can define our brand colors here
const colors = {
  brand: {
    // A nice, professional blue color palette
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    600: "#2b6cb0", // A good, strong blue for backgrounds like the CTA
    500: "#3182ce", // Our main brand blue, good for the Navbar
    400: "#4299e1",
    300: "#63b3ed",
    200: "#90cdf4",
    100: "#bee3f8",
    50: "#ebf8ff",
  },
};

// We extend the default theme with our custom colors
export const theme = extendTheme({ colors });