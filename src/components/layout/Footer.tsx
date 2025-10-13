import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="brand.900" color="white" p={6}>
      <Text textAlign="center">
        &copy; {currentYear} God's Wisdom School. All Rights Reserved.
      </Text>
    </Box>
  );
};
