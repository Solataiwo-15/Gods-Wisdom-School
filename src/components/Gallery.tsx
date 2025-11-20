import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";

// 1. Import your new gallery images
import galleryImage1 from "../assets/gallery-students.png";
import galleryImage2 from "../assets/gallery-sports.png";
// We can add more placeholder images to see how the layout looks
import galleryImage3 from "../assets/gallery-sports.png";
import galleryImage4 from "../assets/gallery-students.png";

// This is an array of our image sources. It's easy to add more later.
const galleryImages = [
  { src: galleryImage1, alt: "Students in the classroom" },
  { src: galleryImage2, alt: "Students during a sports day event" },
  { src: galleryImage3, alt: "Another view of the school" }, // Placeholder
  { src: galleryImage4, alt: "A view of the school library" }, // Placeholder
];

export const Gallery = () => {
  return (
    // We'll use a clean white background to make the photos pop
    <Box bg="white" py={20}>
      <Container maxW="container.lg">
        <VStack spacing={8}>
          <Heading as="h2" size="2xl" color="brand.800" textAlign="center">
            Glimpses of Our School Life
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A picture is worth a thousand words.
          </Text>
        </VStack>

        {/* The responsive image grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 2 }} // 1 col on mobile, 2 on tablet and up
          spacing={6}
          mt={12}
        >
          {galleryImages.map((image, index) => (
            <Box
              key={index}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              _hover={{
                transform: "scale(1.03)", // A nice hover effect
                boxShadow: "2xl",
              }}
              transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width="100%"
                height="300px" // Give all images a consistent height
                objectFit="cover" // Ensure the image covers the box without distortion
              />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
