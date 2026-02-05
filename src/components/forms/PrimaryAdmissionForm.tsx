// src/components/forms/PrimaryAdmissionForm.tsx
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  VStack,
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
  Text,
  Alert,
  AlertIcon,
  Divider,
  HStack,
  useToast,
} from "@chakra-ui/react";

import axios from "axios"; // 2. Import axios

interface FormProps {
  onBack: () => void;
}

export const PrimaryAdmissionForm = ({ onBack }: FormProps) => {
  // 1. STATE: Holding all the fields from the physical form
  const [formData, setFormData] = useState({
    pupilName: "",
    homeAddress: "",
    dob: "",
    placeOfBirth: "",
    town: "",
    state: "",
    nationality: "Nigerian", // Default value
    complexion: "",
    bestHobby: "",
    livingWithParents: "yes", // Radio button state
    reasonsNotLiving: "",
    prevSchoolName: "",
    prevSchoolYears: "",
    fatherName: "",
    fatherOccupation: "",
    fatherOfficeAddress: "",
    fatherHomeAddress: "",
    fatherPhone: "",
    motherName: "",
    motherHomeAddress: "",
    motherPhone: "",
    agreedToRules: false, // Checkbox state
    medicalNoteAcknowledged: false, // Signature checkbox
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast(); // For showing success/error popups

  // 2. HANDLERS: For text, select, and textarea inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler specifically for the Checkboxes
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

  // 4. STYLES: This guarantees perfect visibility and contrast.
  const inputStyles = {
    bg: "white",
    color: "gray.800",
    borderColor: "gray.300",
    _placeholder: { color: "gray.400" },
    _hover: { borderColor: "brand.400" },
    focusBorderColor: "brand.500",
    // --- START OF THE FIX ---
    __css: {
      option: {
        background: "white",
        color: "gray.800",
      },
    },
    // --- END OF THE FIX ---
  };

  return (
    <Box bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={8} align="stretch">
          <Heading as="h2" size="xl" color="brand.700" textAlign="center">
            Primary School Registration Form
          </Heading>

          <Divider />

          {/* ================= SECTION 1: PUPIL'S INFORMATION ================= */}
          <Heading as="h3" size="md" color="brand.600">
            Pupil's Information
          </Heading>

          <FormControl isRequired>
            <FormLabel color="gray.700">Pupil's Name (Full Name)</FormLabel>
            <Input
              name="pupilName"
              placeholder="e.g. John Oluwafemi Doe"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.700">Home Address</FormLabel>
            <Textarea
              name="homeAddress"
              placeholder="Enter full home address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

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

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Town</FormLabel>
              <Input
                name="town"
                placeholder="Enter town"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">State</FormLabel>
              <Input
                name="state"
                placeholder="Enter state"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Nationality</FormLabel>
              <Input
                name="nationality"
                value={formData.nationality}
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Complexion</FormLabel>
              <Select
                name="complexion"
                placeholder="Select complexion"
                {...inputStyles}
                onChange={handleInputChange}
              >
                <option value="Fair">Fair</option>
                <option value="Dark">Dark</option>
                <option value="Brown">Brown</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Best Hobby</FormLabel>
              <Input
                name="bestHobby"
                placeholder="e.g. Reading, Football"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">
              Are you living with your parents?
            </FormLabel>
            <HStack spacing={4}>
              <Button
                flex="1"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, livingWithParents: "yes" }))
                }
                // --- Start of new styles for "Yes" Button ---
                bg={
                  formData.livingWithParents === "yes" ? "brand.500" : "white"
                }
                color={
                  formData.livingWithParents === "yes" ? "white" : "gray.600"
                }
                borderColor={
                  formData.livingWithParents === "yes"
                    ? "brand.500"
                    : "gray.300"
                }
                borderWidth="1px"
                _hover={{
                  bg:
                    formData.livingWithParents === "yes"
                      ? "brand.600"
                      : "gray.100",
                }}
                // --- End of new styles ---
              >
                Yes
              </Button>
              <Button
                flex="1"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, livingWithParents: "no" }))
                }
                // --- Start of new styles for "No" Button ---
                bg={formData.livingWithParents === "no" ? "brand.500" : "white"}
                color={
                  formData.livingWithParents === "no" ? "white" : "gray.600"
                }
                borderColor={
                  formData.livingWithParents === "no" ? "brand.500" : "gray.300"
                }
                borderWidth="1px"
                _hover={{
                  bg:
                    formData.livingWithParents === "no"
                      ? "brand.600"
                      : "gray.100",
                }}
                // --- End of new styles ---
              >
                No
              </Button>
            </HStack>
          </FormControl>

          {/* Conditional Field: Only shows if "No" is selected above */}
          {formData.livingWithParents === "no" && (
            <FormControl isRequired>
              <FormLabel color="gray.700">If not, state the reasons:</FormLabel>
              <Textarea
                name="reasonsNotLiving"
                placeholder="Please state your reasons here..."
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          )}

          {/* ================= SECTION 2: PREVIOUS SCHOOL ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Previous School Information
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Previous School Attended</FormLabel>
              <Input
                name="prevSchoolName"
                placeholder="Name of previous school"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Years of Attendance</FormLabel>
              <Input
                name="prevSchoolYears"
                placeholder="e.g. 2019 - 2022"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          {/* ================= SECTION 3: PUPIL'S CONFESSION ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Pupil's Confession
          </Heading>

          <Box
            bg="gray.50"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            {/* --- START OF THE FIX --- */}
            <HStack align="flex-start" spacing={4}>
              <Checkbox
                name="agreedToRules"
                colorScheme="blue"
                size="lg"
                isRequired
                onChange={handleCheckboxChange}
                // We apply the visibility fix directly here
                __css={{
                  "& .chakra-checkbox__control": {
                    borderColor: "gray.400",
                    bg: "white",
                  },
                }}
              />
              <Text fontSize="sm" color="gray.700" mt={-1}>
                I hereby testify that all the information given above are
                authentic and genuine. I therefore promise to abide with all the
                rules and regulations of this great school, and if I do anything
                that can tarnish her good image, my admission should be
                forfeited, while the school's authority should bestow other
                punishments on me immediately.
              </Text>
            </HStack>
            {/* --- END OF THE FIX --- */}
          </Box>

          {/* ================= SECTION 4: PARENT'S INFORMATION ================= */}
          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Parent's/Guardian's Information
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Name</FormLabel>
              <Input
                name="fatherName"
                placeholder="Enter full name"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Occupation</FormLabel>
              <Input
                name="fatherOccupation"
                placeholder="Enter occupation"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">
              Father's Office Address (In Full)
            </FormLabel>
            <Textarea
              name="fatherOfficeAddress"
              placeholder="Enter office address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Home Address</FormLabel>
              <Input
                name="fatherHomeAddress"
                placeholder="Enter home address"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Telephone Number</FormLabel>
              <Input
                name="fatherPhone"
                type="tel"
                placeholder="e.g. 08012345678"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Mother's Name</FormLabel>
              <Input
                name="motherName"
                placeholder="Enter full name"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Mother's Telephone Number</FormLabel>
              <Input
                name="motherPhone"
                type="tel"
                placeholder="e.g. 08012345678"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">Mother's Home Address</FormLabel>
            <Input
              name="motherHomeAddress"
              placeholder="Enter home address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          {/* ================= SECTION 5: DECLARATIONS & SUBMIT ================= */}
          <Divider />

          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm" color="gray.800" fontWeight="bold">
              NOTE: A medical report letter that must show the health condition
              of your child must be collected from a public hospital or an
              approved private hospital.
            </Text>
          </Alert>

          <FormControl isRequired>
            {/* --- START OF THE FIX --- */}
            <HStack align="flex-start" spacing={4}>
              <Checkbox
                name="medicalNoteAcknowledged"
                colorScheme="blue"
                size="lg"
                isRequired
                onChange={handleCheckboxChange}
                // We apply the visibility fix directly here
                __css={{
                  "& .chakra-checkbox__control": {
                    borderColor: "gray.400",
                    bg: "white",
                  },
                }}
              />
              <Text fontSize="md" color="gray.700" fontWeight="medium" mt={-1}>
                I/We acknowledge the medical report requirement and certify that
                all information provided is accurate. (Sign by checking)
              </Text>
            </HStack>
            {/* --- END OF THE FIX --- */}
          </FormControl>

          {/* --- ACTION BUTTONS --- */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} w="100%" pt={6}>
            {/* --- START OF THE FIX --- */}
            <Button
              size="lg"
              onClick={onBack}
              // Explicit styles for a highly visible secondary button
              bg="white"
              color="gray.700"
              borderColor="gray.300"
              borderWidth="1px"
              _hover={{ bg: "gray.100" }}
              isDisabled={isLoading} // Disable while submitting
            >
              Go Back
            </Button>
            {/* --- END OF THE FIX --- */}

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              // This button is disabled if 'agreedToRules' is FALSE OR 'medicalNoteAcknowledged' is FALSE
              isDisabled={
                !formData.agreedToRules || !formData.medicalNoteAcknowledged
              }
              isLoading={isLoading} // 7. Add loading state to the submit button
              loadingText="Submitting..."
            >
              Submit Primary Application
            </Button>
          </SimpleGrid>
        </VStack>
      </form>
    </Box>
  );
};
