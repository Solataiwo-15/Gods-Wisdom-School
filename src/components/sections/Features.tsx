import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
// We will use icons from the "Font Awesome" icon set
import { FaBook, FaUsers, FaShieldAlt } from "react-icons/fa";
// This is the fix: use 'import type' for type-only imports
import type { IconType } from "react-icons";

// Define a 'type' or 'interface' for our Feature component's props
interface FeatureProps {
  title: string;
  text: string;
  icon: IconType;
}

// A single feature component
// Apply the types to the component's props
const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack spacing={4} textAlign="center">
      <Icon as={icon} w={12} h={12} color="brand.500" />
      <Heading as="h3" size="md" fontWeight="bold">
        {title}
      </Heading>
      <Text color="gray.600">{text}</Text>
    </VStack>
  );
};

export const Features = () => {
  // ... rest of the component code is the same
  return (
    <Box p={{ base: 10, md: 20 }}>
      <Container maxW="container.lg">
        <VStack spacing={4} as="section" mb={16}>
          <Heading as="h2" size="xl" fontWeight="bold">
            Why Choose Us?
          </Heading>
          <Text fontSize="lg" color="gray.500">
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
              "We prioritize a safe, inclusive, and supportive atmosphere where every child can thrive and and feel valued."
            }
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};
