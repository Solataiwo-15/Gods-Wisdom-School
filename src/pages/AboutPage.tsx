import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Image,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

// Make sure you have these images in your src/assets folder
import founderImage from "../assets/founder-placeholder.jpg";
import principalImage from "../assets/principal.png";
import aboutBgImage from "../assets/about-bg.png";

export const AboutPage = () => {
  return (
    <Box>
      {/* SECTION 1: THE HERO HEADER (Stays the same) */}
      <Flex
        minH="90vh" // Set minimum height
        align="center" // Vertically center
        justify="center" // Horizontally center
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
          src={aboutBgImage}
          alt="School library or classroom"
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
            About Us
          </Heading>
          <Text fontSize="xl" mt={4}>
            Over three decades of academic excellence and moral development.
          </Text>
        </Container>
      </Flex>

      {/* SECTION 2: PRINCIPAL'S WELCOME (With the framed photo) */}
      <Box bg="white">
        <Container maxW="container.lg" py={20}>
          <Flex
            direction={{ base: "column-reverse", md: "row" }}
            align="center"
            justify="center"
          >
            <Box
              textAlign={{ base: "center", md: "left" }}
              maxW="xl"
              mr={{ base: 0, md: 10 }}
            >
              <Heading as="h2" size="xl" color="brand.900">
                A Welcome From Our Principal
              </Heading>
              <Text fontSize="lg" color="gray.600" mt={4}>
                "I warmly welcome you to God’s Wisdom Official Platform, a
                school where visions and dreams become reality..."
              </Text>
              <Text fontSize="lg" color="gray.600" mt={4}>
                "We believe that every child deserves quality education and the
                right support to achieve greatness..."
              </Text>
              <Text fontWeight="bold" mt={4}>
                - Mr. Afolayan S. Oluwayomi, Principal
              </Text>
            </Box>
            <Box
              bg="brand.50"
              borderRadius="lg"
              p={6}
              boxShadow="xl"
              mb={{ base: 8, md: 0 }}
            >
              <Image
                borderRadius="full"
                boxSize="250px"
                src={principalImage}
                alt="Mr. Afolayan S. Oluwayomi, Principal"
                objectFit="cover"
                border="4px solid"
                borderColor="white"
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* SECTION 3: OUR HISTORY & COMMITMENT (RESTORED) */}
      <Box bg="brand.900">
        <Container maxW="container.lg" py={16}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="lg" color="white">
                Our History
              </Heading>
              <Text fontSize="lg" color="gray.300">
                God’s Wisdom Schools was established over three decades ago by
                the visionary leader, Mr. Richard Adepetun... What began as a
                small initiative has now grown into a thriving institution.
              </Text>
            </VStack>
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="lg" color="white">
                Our Commitment
              </Heading>
              <Text fontSize="lg" color="gray.300">
                At God’s Wisdom Schools, we remain committed to nurturing the
                next generation of leaders through quality education and moral
                guidance.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 4: VISION & MISSION (With corrected List component) */}
      <Box bg="brand.50">
        <Container maxW="container.lg" py={20}>
          <VStack spacing={8}>
            <Heading as="h2" size="2xl" color="brand.800">
              Our Vision and Mission
            </Heading>
            <List spacing={5} w="100%">
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacingX={10}
                spacingY={5}
              >
                {/* All the ListItems go here... */}
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Nurturing and training each child academically.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Instilling moral values and social etiquette.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Promoting their physical health and fitness.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Providing the best education through our seasoned educators.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Serving as a second home where students feel comfortable and
                  safe.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Ensuring every student receives the best education.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Preparing students to meet global standards.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Developing students who aspire to make the nation proud.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Nurturing students spiritually and guiding their religious
                  growth.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="brand.500" />
                  Supporting our students to excel in all aspects.
                </ListItem>
              </SimpleGrid>
            </List>
          </VStack>
        </Container>
      </Box>

      {/* SECTION 5: THE FOUNDER'S SPOTLIGHT (Now on a white background) */}
      <Box bg="white">
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
              <Text fontWeight="bold" mt={4}>
                - Mr. Richard Adepetun, Visionary Leader
              </Text>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};
