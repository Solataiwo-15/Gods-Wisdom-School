import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Heading,
} from "@chakra-ui/react";
// We'll use icons for the address and phone
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="brand.900" color="gray.300">
      <Container maxW="container.lg" py={12}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 8, md: 16 }}
          align="flex-start"
        >
          {/* School Name and Motto */}
          <VStack spacing={4} align="flex-start" flex="1">
            <Heading as="h3" size="md" color="white">
              God's Wisdom Schools
            </Heading>
            <Text>Motto: In God We Trust</Text>
          </VStack>

          {/* Contact Information */}
          <VStack spacing={4} align="flex-start" flex="1">
            <Heading as="h3" size="md" color="white">
              Contact Us
            </Heading>
            <HStack align="center">
              <Icon as={FaMapMarkerAlt} color="white" />
              <Text>
                Along Ikuogbolekun way, Beside First Baptist Church, Adegbayi,
                Ibadan
              </Text>
            </HStack>
            <HStack align="center">
              <Icon as={FaPhone} color="white" />
              <Text>08077913943</Text>
            </HStack>
          </VStack>
        </Stack>

        <Divider my={8} borderColor="gray.700" />

        {/* Copyright */}
        <Text textAlign="center" fontSize="sm">
          &copy; {currentYear} God's Wisdom Schools. All Rights Reserved.
        </Text>
      </Container>
    </Box>
  );
};
