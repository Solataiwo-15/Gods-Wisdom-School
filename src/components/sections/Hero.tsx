import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Container,
  Image, // 1. Import the Image component
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// 2. Import the background image you want to use (can be the same as the about page or a new one)
import heroBgImage from "../../assets/about-bg.jpg";

export const Hero = () => {
  return (
    <Box
      position="relative" // We need position relative for the overlay and image
      py={{ base: 20, md: 28 }}
      textAlign="center"
      color="white" // Text will be white to show up on the dark overlay
      overflow="hidden" // Contains the blur effect
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "blackAlpha.600", // The dark overlay for readability
        zIndex: 1,
      }}
    >
      {/* 3. The blurred background image */}
      <Image
        src={heroBgImage}
        alt="A beautiful view of the school or classroom"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        objectFit="cover"
        filter="blur(4px)"
        transform="scale(1.05)"
        zIndex="0"
      />
      {/* 4. The content, which needs to be on a higher zIndex to appear on top */}
      <Container maxW="container.md" position="relative" zIndex="2">
        <VStack spacing={6}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white" // Text color changed to white
          >
            Welcome to God's Wisdom Schools
          </Heading>
          <Text fontSize="xl" color="gray.200">
            {" "}
            {/* Subtitle is a light gray */}
            Nurturing young minds for a brighter future. Excellence in
            education, character, and service.
          </Text>
          <Link to="/admissions">
            {/* The button is now white on the dark background */}
            <Button
              bg="white"
              color="brand.700"
              size="lg"
              px={8}
              py={7}
              _hover={{ bg: "gray.200" }}
            >
              Learn More About Admissions
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};
