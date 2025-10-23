import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link

export const CTA = () => {
  return (
    <Box bg="brand.600" color="white">
      <Container maxW="container.lg" py={{ base: "16", md: "24" }}>
        <Stack spacing="8" textAlign="center" align="center">
          <Heading as="h2" size="xl" fontWeight="bold">
            Ready to Join Our Community?
          </Heading>
          <Text fontSize="lg" maxW="2xl">
            We are now accepting applications for the upcoming school year.
            Discover the enrollment process and become a part of the God's
            Wisdom School family.
          </Text>
          {/* Link the button to the admissions page */}
          <Link to="/admissions">
            {/* --- THIS IS THE UPDATED BUTTON --- */}
            <Button
              bg="white" // Solid white background
              color="brand.700" // Dark blue text color
              size="lg"
              px="10"
              py="7"
              fontWeight="bold"
              // Add a subtle hover effect
              _hover={{
                bg: "gray.200",
              }}
            >
              Apply Now
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
