import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
// 1. Import useState AND ChangeEvent from React
import { useState } from "react";
import type { ChangeEvent } from "react";

export const AdmissionsPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    classApplyingFor: "",
    parentName: "",
    parentRelationship: "",
    parentEmail: "",
    parentPhone: "",
  });

  // 2. Explicitly type the event parameter 'e'.
  // It is a 'ChangeEvent' that happens on an HTMLInputElement or HTMLSelectElement.
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. We can also type the submit event for good practice.
  // It is a 'FormEvent' on an HTMLFormElement.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Application Data Submitted:", formData);
    alert("Thank you for your application! We will be in touch shortly.");
  };

  return (
    <Box bg="brand.50">
      <Container maxW="container.lg" py={{ base: 16, md: 24 }}>
        {/* ... The rest of the page header is the same ... */}
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" color="brand.800">
            Admissions
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Join the God's Wisdom Schools family. Please fill out the form below
            to begin the application process.
          </Text>
        </VStack>

        <Box
          bg="white"
          p={{ base: 6, md: 10 }}
          borderRadius="lg"
          boxShadow="xl"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={8}>
              {/* --- All the form fields remain exactly the same --- */}
              <Heading
                as="h2"
                size="lg"
                color="brand.700"
                alignSelf="flex-start"
              >
                Student Information
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="firstName"
                    placeholder="e.g., John"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    name="lastName"
                    placeholder="e.g., Doe"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    placeholder="Select gender"
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired>
                <FormLabel>Class Applying For</FormLabel>
                <Select
                  name="classApplyingFor"
                  placeholder="Select a class"
                  onChange={handleInputChange}
                >
                  <option value="creche">Crèche</option>
                  <option value="nursery1">Nursery 1</option>
                  <option value="nursery2">Nursery 2</option>
                  <option value="primary1">Primary 1</option>
                  <option value="primary2">Primary 2</option>
                </Select>
              </FormControl>
              <Heading
                as="h2"
                size="lg"
                color="brand.700"
                alignSelf="flex-start"
                pt={6}
              >
                Parent/Guardian Information
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>Parent/Guardian's Full Name</FormLabel>
                  <Input
                    name="parentName"
                    placeholder="e.g., Jane Doe"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Relationship to Student</FormLabel>
                  <Input
                    name="parentRelationship"
                    placeholder="e.g., Mother"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    name="parentEmail"
                    type="email"
                    placeholder="e.g., jane.doe@example.com"
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    name="parentPhone"
                    type="tel"
                    placeholder="e.g., 08012345678"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
              <Button
                colorScheme="blue"
                size="lg"
                fontSize="md"
                w="100%"
                mt={8}
                type="submit"
              >
                Submit Application
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};
