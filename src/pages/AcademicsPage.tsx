import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Divider,
  Flex, // Import Flex
  Image, // Import Image
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
// Import a background image (you can use the same one or a new one)
import academicsBgImage from "../assets/about-bg.png";

export const AcademicsPage = () => {
  return (
    <Box>
      {/* SECTION 1: THE FULL-SCREEN HERO HEADER */}
      <Flex
        minH="90vh"
        align="center"
        justify="center"
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
          src={academicsBgImage}
          alt="Students in a classroom"
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
        <Container maxW="container.lg" position="relative" zIndex="2">
          <Heading as="h1" size="3xl">
            Academics & Activities
          </Heading>
          <Text fontSize="xl" mt={4}>
            Fostering well-rounded individuals through a robust curriculum and
            engaging activities.
          </Text>
        </Container>
      </Flex>

      {/* SECTION 2: MAIN CONTENT */}
      <Container maxW="container.lg" py={16}>
        <VStack spacing={12} align="stretch">
          {/* Curriculum Section */}
          <Box>
            <Heading as="h2" size="xl" color="brand.500" mb={4}>
              Our Curriculum
            </Heading>
            <Text fontSize="lg" color="white">
              Our curriculum is a rich blend of Nigerian and international
              standards, designed to be comprehensive, engaging, and
              challenging. We focus on building a strong foundation in core
              subjects like Mathematics, English Language, and Sciences, while
              also encouraging critical thinking, creativity, and
              problem-solving skills to prepare students for future success in a
              globalized world.
            </Text>
          </Box>

          <Divider />

          {/* Extracurricular Activities Section */}
          <Box>
            <Heading as="h2" size="xl" color="brand.500" mb={6}>
              Extracurricular Activities
            </Heading>
            <List spacing={4}>
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacingX={10}
                spacingY={4}
              >
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Debate and Literary Club
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  JETs (Junior Engineers, Technicians, and Scientists) Club
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Music and Drama Club
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Arts and Crafts
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Football and Athletics
                </ListItem>
                <ListItem fontSize="lg">
                  <ListIcon as={FaCheckCircle} color="brand.500" />
                  Home Makers Club
                </ListItem>
              </SimpleGrid>
            </List>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
