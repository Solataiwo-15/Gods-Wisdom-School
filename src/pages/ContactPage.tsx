import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Flex,
  Image,
  HStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import contactBgImage from "../assets/about-bg.png";

export const ContactPage = () => {
  // 1. Your exact URL is now here.
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126607.15291496448!2d3.8214358121503036!3d7.412727006406747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039937e91f07341%3A0xcb743f69ff963de2!2sFirst%20Baptist%20Church%2C%20Adegbayi!5e0!3m2!1sen!2sng!4v1763645649475!5m2!1sen!2sng";

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
          src={contactBgImage}
          alt="Contact background"
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
            Contact Us
          </Heading>
          <Text fontSize="xl" mt={4}>
            We'd love to hear from you. Get in touch with us today.
          </Text>
        </Container>
      </Flex>

      {/* SECTION 2: MAIN CONTENT (CONTACT INFO & MAP) */}
      <Box bg="white" py={20}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            {/* Left Column: Contact Details */}
            <VStack spacing={8} align="flex-start">
              <Heading as="h2" size="xl" color="brand.800">
                Get In Touch
              </Heading>
              <HStack spacing={4} align="flex-start">
                <Icon
                  as={FaMapMarkerAlt}
                  color="brand.500"
                  w={6}
                  h={6}
                  mt={1}
                />
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    Along Ikuogbolekun way, Beside First Baptist Church,
                    Adegbayi, Ibadan
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={4} align="flex-center">
                <Icon as={FaPhone} color="brand.500" w={6} h={6} mt={1} />
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    08077913943
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={4} align="flex-start">
                <Icon as={FaEnvelope} color="brand.500" w={6} h={6} mt={1} />
                <Box>
                  <Text fontSize="lg" color="gray.600">
                    info@godswisdomschools.com
                  </Text>
                </Box>
              </HStack>
            </VStack>

            {/* Right Column: Google Map */}
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
              h={{ base: "300px", md: "100%" }}
            >
              {/* --- THIS IS THE FULLY CORRECTED IFRAME --- */}
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" // Note the camelCase
              ></iframe>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};
