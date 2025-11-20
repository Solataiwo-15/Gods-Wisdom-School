import {
  Heading,
  Text,
  Button,
  VStack,
  Container,
  Flex,
  Image, // 1. Import the Image component
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// 2. Import the background image you want to use (can be the same as the about page or a new one)
import heroBgImage from "../../assets/about-bg.png";

export const Hero = () => {
  return (
    <Flex
      minH="90vh" // Set minimum height to 100% of the viewport height
      align="center" // Vertically center the content
      justify="center" // Horizontally center the content
      position="relative"
      textAlign="center"
      color="white"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "blackAlpha.600",
        zIndex: 1,
      }}
    >
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
      {/* The content container remains the same */}
      <Container maxW="container.md" position="relative" zIndex="2">
        <VStack spacing={6}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
          >
            Welcome to God's Wisdom School
          </Heading>
          <Text fontSize="xl" color="gray.200">
            Nurturing young minds for a brighter future. Excellence in
            education, character, and service.
          </Text>
          <Link to="/admissions">
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
    </Flex>
  );
};
