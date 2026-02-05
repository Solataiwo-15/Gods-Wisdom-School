// src/components/forms/SecondaryAdmissionForm.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  VStack,
  HStack,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Textarea,
  Checkbox,
  Alert,
  AlertIcon,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";

import axios from "axios"; // 2. Import axios

interface FormProps {
  onBack: () => void;
}

export const SecondaryAdmissionForm = ({ onBack }: FormProps) => {
  const [formData, setFormData] = useState({
    surname: "",
    otherName: "",
    dob: "",
    placeOfBirth: "",
    sex: "",
    stateOfOrigin: "",
    nationality: "Nigerian",
    religion: "",
    sponsorName: "",
    relationship: "",
    occupation: "",
    sponsorPhone: "",
    sponsorEmail: "",
    businessAddress: "",
    residentialAddress: "",
    prevSchoolName: "",
    prevSchoolDateFrom: "",
    prevSchoolDateTo: "",
    prevSchoolClassEntry: "",
    prevSchoolClassExit: "",
    healthConditions: "",
    agreedToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast(); // For showing success/error popups

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // --- THIS IS THE UPGRADED SUBMIT FUNCTION ---
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    setIsLoading(true); // Set loading state to true, disables the button
    setError(null); // Clear any previous errors

    try {
      // 4. Send a POST request to our API endpoint
      const response = await axios.post("/api/submit-application", formData);

      // 5. If successful, log the response and show a success toast
      console.log("Server response:", response.data);
      setIsLoading(false);
      toast({
        title: "Application Submitted.",
        description: "We've received your application successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Optionally, you can clear the form or redirect the user here
    } catch (err) {
      // 6. If an error occurs, log it and show an error toast
      console.error("Submission error:", err);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
      toast({
        title: "Submission Failed.",
        description:
          "Something went wrong. Please check your connection and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const inputStyles = {
    bg: "white",
    color: "gray.800",
    borderColor: "gray.300",
    _placeholder: { color: "gray.400" },
    _hover: { borderColor: "brand.400" },
    focusBorderColor: "brand.500",
  };

  return (
    <Box bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={8} align="stretch">
          <Heading as="h2" size="xl" color="brand.700" textAlign="center">
            Secondary School Admission Form
          </Heading>
          <Divider />

          {/* ================= SECTION 1: STUDENT'S DATA ================= */}
          <Heading as="h3" size="md" color="brand.600">
            Student's Data
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Surname</FormLabel>
              <Input
                name="surname"
                placeholder="Enter surname"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Other Name</FormLabel>
              <Input
                name="otherName"
                placeholder="Enter other name(s)"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Date of Birth</FormLabel>
              <Input
                name="dob"
                type="date"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Place of Birth</FormLabel>
              <Input
                name="placeOfBirth"
                placeholder="e.g. Ibadan"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Sex</FormLabel>
              <Select
                name="sex"
                placeholder="Select gender"
                {...inputStyles}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">State of Origin</FormLabel>
              <Input
                name="stateOfOrigin"
                placeholder="e.g. Oyo State"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Nationality</FormLabel>
              <Input
                name="nationality"
                value={formData.nationality}
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Religion</FormLabel>
              <Select
                name="religion"
                placeholder="Select religion"
                {...inputStyles}
                onChange={handleInputChange}
              >
                <option value="Christianity">Christianity</option>
                <option value="Islam">Islam</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
          </SimpleGrid>

          {/* ================= SECTION 2: PARENT'S/GUARDIAN'S DETAILS ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Details of Parents/Guardian
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Sponsor's Name</FormLabel>
              <Input
                name="sponsorName"
                placeholder="Enter full name"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Relationship with Child</FormLabel>
              <Input
                name="relationship"
                placeholder="e.g. Father, Mother"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">Sponsor's Occupation</FormLabel>
            <Input
              name="occupation"
              placeholder="Enter occupation"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">
                Sponsor's Phone Number (GSM)
              </FormLabel>
              <Input
                name="sponsorPhone"
                type="tel"
                placeholder="e.g. 08012345678"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Sponsor's E-mail</FormLabel>
              <Input
                name="sponsorEmail"
                type="email"
                placeholder="e.g. name@example.com"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">Business Address</FormLabel>
            <Textarea
              name="businessAddress"
              placeholder="Enter business address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="gray.700">Residential Address</FormLabel>
            <Textarea
              name="residentialAddress"
              placeholder="Enter home address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* ================= SECTION 3: PREVIOUS SCHOOL ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Student's Previous School Attended
          </Heading>

          <FormControl isRequired>
            <FormLabel color="gray.700">
              Name & Address of Institution
            </FormLabel>
            <Textarea
              name="prevSchoolName"
              placeholder="Enter school name and address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Date Attended From</FormLabel>
              <Input
                name="prevSchoolDateFrom"
                type="date"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Date Attended To</FormLabel>
              <Input
                name="prevSchoolDateTo"
                type="date"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Class of Entry</FormLabel>
              <Input
                name="prevSchoolClassEntry"
                placeholder="e.g. JSS 1"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Class of Exit</FormLabel>
              <Input
                name="prevSchoolClassExit"
                placeholder="e.g. JSS 3"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          {/* ================= SECTION 4: HEALTH & DECLARATION ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Health & Declaration
          </Heading>

          <FormControl isRequired>
            <FormLabel color="gray.700">
              Student's Special Health Condition / Remarks (If any)
            </FormLabel>
            <Textarea
              name="healthConditions"
              placeholder="Please state any special health conditions, allergies, etc."
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <HStack align="flex-start" spacing={4} mt={4}>
              <Checkbox
                name="agreedToTerms"
                colorScheme="blue"
                size="lg"
                isRequired
                onChange={handleCheckboxChange}
                __css={{
                  "& .chakra-checkbox__control": {
                    borderColor: "gray.400",
                    bg: "white",
                  },
                }}
              />
              <Text fontSize="md" color="gray.700" fontWeight="medium" mt={-1}>
                I certify that all information provided in this form is true and
                accurate. (Sign by checking)
              </Text>
            </HStack>
          </FormControl>

          {/* --- START OF THE FIX --- */}
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm" color="red.500">
                {" "}
                {error}
              </Text>
            </Alert>
          )}
          {/* --- END OF THE FIX --- */}

          {/* ================= ACTION BUTTONS ================= */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} w="100%" pt={6}>
            <Button
              size="lg"
              onClick={onBack}
              bg="white"
              color="gray.700"
              borderColor="gray.300"
              borderWidth="1px"
              _hover={{ bg: "gray.100" }}
              isDisabled={isLoading} // Disable while submitting
            >
              Go Back
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              // This button is disabled if 'agreedToTerms' is FALSE
              isDisabled={!formData.agreedToTerms}
              isLoading={isLoading} // 7. Add loading state to the submit button
              loadingText="Submitting..."
            >
              Submit Secondary Application
            </Button>
          </SimpleGrid>
        </VStack>
      </form>
    </Box>
  );
};
