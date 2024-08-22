import { extendTheme } from "@chakra-ui/react";

export const primaryColor = "#157868";
export const secondaryColor = "#062046";
export const tertiaryColor = "#282828";
export const textColor = "#E1E1E1";
export const background = "#020b17";

export const theme = extendTheme({
  colors: {
    primary: { 500: primaryColor },
    secondary: { 500: secondaryColor, 600: "#04152f" },
    tertiary: { 100: "#062046", 500: tertiaryColor, 600: "#1a1a1a" },
    text: textColor,
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bg: "secondary.500",
          color: textColor,
          _hover: {
            bg: "#04152f",
          },
        },
      },
    },
    Text: {
      baseStyle: {
        color: textColor,
      },
    },
    Heading: {
      baseStyle: {
        color: textColor,
      },
    },
    List: {
      baseStyle: {
        item: {
          color: textColor,
        },
      },
    },
    Breadcrumb: {
      baseStyle: {
        container: {
          color: textColor,
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: background,
          color: textColor,
        },
      },
    },
  },
});
