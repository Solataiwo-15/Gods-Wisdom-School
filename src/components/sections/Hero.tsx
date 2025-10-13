import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";

export const Hero = () => {
  return (
    <Box
      bg="gray.100" // A light gray background
      w="100%" // Full width
      py={28} // Vertical padding (py = padding y-axis)
      textAlign="center"
    >
      <Container maxW="container.md">
        <VStack spacing={6}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }} // Responsive font size
            fontWeight="bold"
            color="brand.700"
          >
            Welcome to God's Wisdom School
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Nurturing young minds for a brighter future. Excellence in
            education, character, and service.
          </Text>
          <Button colorScheme="blue" size="lg" px={8} py={6}>
            Learn More About Admissions
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};
