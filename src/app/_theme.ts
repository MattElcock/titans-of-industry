import { extendTheme } from "@chakra-ui/react";

export const primaryColor = "#157868";
export const secondaryColor = "#062046";
export const tertiaryColor = "#282828";
export const textColor = "#E1E1E1";
export const background = "#020b17";

export const theme = extendTheme({
  colors: {
    primary: primaryColor,
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    text: textColor,
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bg: "secondary",
          color: textColor,
          _hover: {
            opacity: 0.5,
            bg: "secondary",
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
