import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

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
          <Button
            colorScheme="whiteAlpha"
            size="lg"
            px="10"
            py="7"
            fontWeight="bold"
          >
            Apply Now
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
