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
import axios from "axios";

interface FormProps {
  onBack: () => void;
}

// 1. Define initial values in one place
const initialFormValues = {
  pupilName: "",
  homeAddress: "",
  dob: "",
  placeOfBirth: "",
  town: "",
  state: "",
  nationality: "Nigerian",
  complexion: "",
  bestHobby: "",
  livingWithParents: "yes",
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
  agreedToRules: false,
  medicalNoteAcknowledged: false,
};

export const PrimaryAdmissionForm = ({ onBack }: FormProps) => {
  const [formData, setFormData] = useState(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // HANDLERS
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/submit-application", formData);
      console.log("Server response:", response.data);

      setIsLoading(false);

      toast({
        title: "Application Submitted.",
        description: "We've received your application successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // 2. RESET THE FORM DATA HERE
      setFormData(initialFormValues);
    } catch (err) {
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
    __css: {
      option: {
        background: "white",
        color: "gray.800",
      },
    },
  };

  return (
    <Box bg="white">
      <form onSubmit={handleSubmit}>
        <VStack spacing={8} align="stretch">
          <Heading as="h2" size="xl" color="brand.700" textAlign="center">
            Primary School Registration Form
          </Heading>

          <Divider />

          <Heading as="h3" size="md" color="brand.600">
            Pupil's Information
          </Heading>

          <FormControl isRequired>
            <FormLabel color="gray.700">Pupil's Name (Full Name)</FormLabel>
            <Input
              name="pupilName"
              value={formData.pupilName}
              placeholder="e.g. John Oluwafemi Doe"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="gray.700">Home Address</FormLabel>
            <Textarea
              name="homeAddress"
              value={formData.homeAddress}
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
                value={formData.dob}
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Place of Birth</FormLabel>
              <Input
                name="placeOfBirth"
                value={formData.placeOfBirth}
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
                value={formData.town}
                placeholder="Enter town"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">State</FormLabel>
              <Input
                name="state"
                value={formData.state}
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
                value={formData.complexion}
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
                value={formData.bestHobby}
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
              >
                Yes
              </Button>
              <Button
                flex="1"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, livingWithParents: "no" }))
                }
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
              >
                No
              </Button>
            </HStack>
          </FormControl>

          {formData.livingWithParents === "no" && (
            <FormControl isRequired>
              <FormLabel color="gray.700">If not, state the reasons:</FormLabel>
              <Textarea
                name="reasonsNotLiving"
                value={formData.reasonsNotLiving}
                placeholder="Please state your reasons here..."
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          )}

          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Previous School Information
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Previous School Attended</FormLabel>
              <Input
                name="prevSchoolName"
                value={formData.prevSchoolName}
                placeholder="Name of previous school"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Years of Attendance</FormLabel>
              <Input
                name="prevSchoolYears"
                value={formData.prevSchoolYears}
                placeholder="e.g. 2019 - 2022"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

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
            <HStack align="flex-start" spacing={4}>
              <Checkbox
                name="agreedToRules"
                isChecked={formData.agreedToRules}
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
              <Text fontSize="sm" color="gray.700" mt={-1}>
                I hereby testify that all the information given above are
                authentic and genuine. I therefore promise to abide with all the
                rules and regulations...
              </Text>
            </HStack>
          </Box>

          <Divider />
          <Heading as="h3" size="md" color="brand.600">
            Parent's/Guardian's Information
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Name</FormLabel>
              <Input
                name="fatherName"
                value={formData.fatherName}
                placeholder="Enter full name"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Occupation</FormLabel>
              <Input
                name="fatherOccupation"
                value={formData.fatherOccupation}
                placeholder="Enter occupation"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired>
            <FormLabel color="gray.700">Father's Office Address</FormLabel>
            <Textarea
              name="fatherOfficeAddress"
              value={formData.fatherOfficeAddress}
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
                value={formData.fatherHomeAddress}
                placeholder="Enter home address"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Father's Telephone Number</FormLabel>
              <Input
                name="fatherPhone"
                value={formData.fatherPhone}
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
                value={formData.motherName}
                placeholder="Enter full name"
                {...inputStyles}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="gray.700">Mother's Telephone Number</FormLabel>
              <Input
                name="motherPhone"
                value={formData.motherPhone}
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
              value={formData.motherHomeAddress}
              placeholder="Enter home address"
              {...inputStyles}
              onChange={handleInputChange}
            />
          </FormControl>

          <Divider />

          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm" color="gray.800" fontWeight="bold">
              NOTE: A medical report letter must be collected from a public or
              approved private hospital.
            </Text>
          </Alert>

          <FormControl isRequired>
            <HStack align="flex-start" spacing={4}>
              <Checkbox
                name="medicalNoteAcknowledged"
                isChecked={formData.medicalNoteAcknowledged}
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
                I/We acknowledge the medical report requirement... (Sign by
                checking)
              </Text>
            </HStack>
          </FormControl>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm" color="red.500">
                {error}
              </Text>
            </Alert>
          )}

          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6} w="100%" pt={6}>
            <Button
              size="lg"
              onClick={onBack}
              bg="white"
              color="gray.700"
              borderColor="gray.300"
              borderWidth="1px"
              _hover={{ bg: "gray.100" }}
              isDisabled={isLoading}
            >
              Go Back
            </Button>

            <Button
              colorScheme="blue"
              size="lg"
              type="submit"
              isDisabled={
                !formData.agreedToRules || !formData.medicalNoteAcknowledged
              }
              isLoading={isLoading}
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
