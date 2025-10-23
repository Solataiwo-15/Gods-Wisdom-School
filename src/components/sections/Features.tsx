import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaBook, FaUsers, FaShieldAlt } from "react-icons/fa";
import type { IconType } from "react-icons";

interface FeatureProps {
  title: string;
  text: string;
  icon: IconType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack spacing={4} textAlign="center">
      {/* Icon is now a lighter blue to stand out on the dark background */}
      <Icon as={icon} w={12} h={12} color="brand.300" />
      {/* Heading is pure white */}
      <Heading as="h3" size="md" fontWeight="bold" color="white">
        {title}
      </Heading>
      {/* Text is a light gray for a softer feel */}
      <Text color="gray.300">{text}</Text>
    </VStack>
  );
};

export const Features = () => {
  return (
    // Use our darkest brand blue for the background
    <Box bg="brand.900" color="white">
      <Container maxW="container.lg" py={{ base: 16, md: 20 }}>
        <VStack spacing={4} as="section" mb={16}>
          <Heading as="h2" size="xl" fontWeight="bold">
            Why Choose Us?
          </Heading>
          <Text fontSize="lg" color="gray.300">
            We are dedicated to providing the best learning environment.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={FaBook}
            title={"Quality Curriculum"}
            text={
              "Our curriculum is designed to be comprehensive, engaging, and challenging, preparing students for future success."
            }
          />
          <Feature
            icon={FaUsers}
            title={"Experienced Educators"}
            text={
              "Our staff consists of passionate, certified educators who are committed to each student's growth and well-being."
            }
          />
          <Feature
            icon={FaShieldAlt}
            title={"Safe & Nurturing Environment"}
            text={
              "We prioritize a safe, inclusive, and supportive atmosphere where every child can thrive and feel valued."
            }
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};
