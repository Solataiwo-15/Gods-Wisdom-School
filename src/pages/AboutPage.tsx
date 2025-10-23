import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Image,
  Divider,
} from "@chakra-ui/react";

// Make sure you have these images in your src/assets folder
import founderImage from "../assets/founder-placeholder.jpg";
import aboutBgImage from "../assets/about-bg.jpg";

export const AboutPage = () => {
  return (
    <Box>
      {/* SECTION 1: THE HERO HEADER */}
      <Box
        position="relative"
        py={{ base: 16, md: 24 }}
        textAlign="center"
        color="white"
        overflow="hidden" // Add this to contain the blur effect
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: "blackAlpha.600", // Slightly less dark overlay
          zIndex: 1,
        }}
      >
        <Image
          src={aboutBgImage}
          alt="School library or classroom"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          // Change 1: Add a CSS filter to blur the image
          filter="blur(4px)"
          // Scale the image slightly to avoid blurry edges
          transform="scale(1.05)"
          zIndex="0"
        />
        <Container maxW="container.lg" position="relative" zIndex="2">
          <Heading as="h1" size="3xl">
            About Us
          </Heading>
          <Text fontSize="xl" mt={4}>
            Over three decades of academic excellence and moral development.
          </Text>
        </Container>
      </Box>

      {/* SECTION 2: THE CONTENT SECTION (NOW WITH HIGH CONTRAST) */}
      <Box bg="brand.900">
        {" "}
        {/* Dark background for this section */}
        <Container maxW="container.lg" py={16}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            {/* School History Section */}
            <VStack spacing={4} align="stretch">
              {/* Change 2: Heading is now pure white for max contrast */}
              <Heading as="h2" size="lg" color="white">
                Our History
              </Heading>
              {/* Change 3: Paragraph text is a light gray for readability */}
              <Text fontSize="lg" color="gray.300">
                God’s Wisdom Schools was established over three decades ago by
                the visionary leader, Mr. Richard Adepetun... What began as a
                small initiative has now grown into a thriving institution
                renowned for academic excellence and moral development.
              </Text>
            </VStack>

            {/* Our Commitment Section */}
            <VStack spacing={4} align="stretch">
              {/* Change 2: Heading is now pure white for max contrast */}
              <Heading as="h2" size="lg" color="white">
                Our Commitment
              </Heading>
              {/* Change 3: Paragraph text is a light gray for readability */}
              <Text fontSize="lg" color="gray.300">
                At God’s Wisdom Schools, we remain committed to nurturing the
                next generation of leaders through quality education and moral
                guidance. Our alumni excel in diverse fields like finance,
                medicine, and law.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 3: THE FOUNDER'S SPOTLIGHT */}
      <Box bg="brand.50">
        {" "}
        {/* A very light blue background for contrast */}
        <Container maxW="container.lg" py={20}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
          >
            <Image
              borderRadius="full"
              boxSize="200px"
              src={founderImage}
              alt="Mr. Richard Adepetun, Founder"
              mr={{ base: 0, md: 10 }}
              mb={{ base: 6, md: 0 }}
              objectFit="cover"
              boxShadow="lg"
            />
            <Box textAlign={{ base: "center", md: "left" }} maxW="xl">
              <Heading as="h2" size="xl" color="brand.900">
                A Word From Our Founder
              </Heading>
              <Text as="i" fontSize="xl" color="brand.700" mt={4}>
                "...whose passion and purpose were to help young learners
                achieve their full potential."
              </Text>
              <Text fontWeight="bold" mt={4} color={"brand.800"}>
                - Mr. Richard Adepetun, Visionary Leader
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
{
  /* SECTION 4: DIVIDER */
}
<Divider borderColor="gray.300" />;
