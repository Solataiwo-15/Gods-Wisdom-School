// src/pages/AdmissionsPage.tsx
import { useState, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Flex,
  Image,
  Icon,
} from "@chakra-ui/react";
import { FaChild, FaUserGraduate } from "react-icons/fa";

import { PrimaryAdmissionForm } from "../components/forms/PrimaryAdmissionForm";
import { SecondaryAdmissionForm } from "../components/forms/SecondaryAdmissionForm";
import admissionsBgImage from "../assets/about-bg.png";

export const AdmissionsPage = () => {
  // Type the state: it can be null, 'primary', or 'secondary'
  const [selectedForm, setSelectedForm] = useState<
    null | "primary" | "secondary"
  >(null);

  // 1. Give useRef the correct type: it will reference an HTMLDivElement
  const formRef = useRef<HTMLDivElement>(null);

  // 2. Type the formType parameter as a string
  const handleSelectForm = (formType: "primary" | "secondary") => {
    setSelectedForm(formType);
    setTimeout(() => {
      // TypeScript now knows that formRef.current can be a div with this method
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Box>
      {/* SECTION 1: Welcoming Hero */}
      {/* Make sure you've pasted your full Hero code here */}
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
          src={admissionsBgImage}
          alt="Admissions Background"
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
            Admissions
          </Heading>
          <Text fontSize="xl" mt={4}>
            Your journey to excellence starts here.
          </Text>
        </Container>
      </Flex>

      {/* SECTION 2: The Choice Point (No changes here) */}
      <Box bg="white" py={20}>
        <Container maxW="container.lg">
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="2xl" color="brand.800">
              Application Portal
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Please select the appropriate application for your ward.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={12}>
            <Flex
              direction="column"
              align="center"
              p={10}
              boxShadow="xl"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => handleSelectForm("primary")}
              _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
              transition="all 0.3s ease"
            >
              <Icon as={FaChild} w={16} h={16} color="brand.500" />
              <Heading size="lg" mt={6} color={"brand.700"}>
                Primary School
              </Heading>
            </Flex>
            <Flex
              direction="column"
              align="center"
              p={10}
              boxShadow="xl"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => handleSelectForm("secondary")}
              _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
              transition="all 0.3s ease"
            >
              <Icon as={FaUserGraduate} w={16} h={16} color="brand.500" />
              <Heading size="lg" mt={6} color={"brand.700"}>
                Secondary School
              </Heading>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* SECTION 3: The Dynamic Form Area (No changes here) */}
      {selectedForm && (
        <Box ref={formRef} bg="brand.50" py={20}>
          <Container maxW="container.lg">
            <Box
              bg="white"
              p={{ base: 6, md: 10 }}
              borderRadius="lg"
              boxShadow="xl"
            >
              {selectedForm === "primary" && (
                <PrimaryAdmissionForm onBack={() => setSelectedForm(null)} />
              )}
              {selectedForm === "secondary" && (
                <SecondaryAdmissionForm onBack={() => setSelectedForm(null)} />
              )}
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};
