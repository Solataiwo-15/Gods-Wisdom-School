import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  VStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from "react";

import galleryImage1 from "../assets/gallery-students.png";
import galleryImage2 from "../assets/gallery-sports.png";
import galleryImage3 from "../assets/GSW2.jpeg";
import galleryImage4 from "../assets/GWS1.jpeg";
import galleryImage5 from "../assets/GSW3.jpeg";
import galleryImage6 from "../assets/GSW4.jpeg";
import galleryImage7 from "../assets/GSW5.jpeg";

// This is an array of our image sources. It's easy to add more later.
const galleryImages = [
  { src: galleryImage1, alt: "Students in the classroom" },
  { src: galleryImage2, alt: "Students during a sports day event" },
  { src: galleryImage3, alt: "Another view of the school" }, // Placeholder
  { src: galleryImage4, alt: "A view of the school library" }, // Placeholder
  { src: galleryImage5, alt: "Students participating in a science fair" }, // Placeholder
  { src: galleryImage6, alt: "Art class in session" }, // Placeholder
  { src: galleryImage7, alt: "Students on a field trip" }, // Placeholder
];

export const Gallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // --- All the logic (handleScroll, useEffect, scroll function) remains exactly the same ---
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setIsAtStart(scrollLeft < 10); // Give a small buffer
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10); // Give a small buffer
    }
  };

  useEffect(() => {
    handleScroll();
    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);
    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = container.clientWidth; // Scroll by the width of the visible container
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // --- START OF THE LAYOUT CHANGES ---
  return (
    <Box bg="white" py={20}>
      <Container maxW="container.lg">
        <VStack spacing={8} mb={12}>
          <Heading as="h2" size="2xl" color="brand.800" textAlign="center">
            Glimpses of Our School Life
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A picture is worth a thousand words.
          </Text>
        </VStack>

        {/* New Flex container to create space between buttons and images */}
        <Flex align="center" justify="center" w="100%">
          {/* 1. Left Arrow Button - Now with transparent styling */}
          <IconButton
            aria-label="Scroll left"
            icon={<ChevronLeftIcon w={8} h={8} />} // Make icon larger
            isRound
            size="lg"
            variant="ghost" // Use ghost variant for transparency
            color="gray.500"
            _hover={{ bg: "gray.200", color: "gray.800" }}
            onClick={() => scroll("left")}
            isDisabled={isAtStart}
            mr={4} // Add margin to the right to create space
          />

          {/* 2. The Scrolling Container */}
          <Box flex="1" overflow="hidden">
            {" "}
            {/* Hide overflow on the wrapper */}
            <Flex
              ref={scrollContainerRef}
              overflowX="scroll"
              css={{
                "scroll-snap-type": "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              {galleryImages.map((image, index) => (
                <Box
                  key={index}
                  flex={{ base: "0 0 100%", md: "0 0 50%" }}
                  scrollSnapAlign="start"
                  p={2}
                >
                  <Box borderRadius="lg" overflow="hidden" boxShadow="lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width="100%"
                      height="350px"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>

          {/* 3. Right Arrow Button - Now with transparent styling */}
          <IconButton
            aria-label="Scroll right"
            icon={<ChevronRightIcon w={8} h={8} />} // Make icon larger
            isRound
            size="lg"
            variant="ghost"
            color="gray.500"
            _hover={{ bg: "gray.200", color: "gray.800" }}
            onClick={() => scroll("right")}
            isDisabled={isAtEnd}
            ml={4} // Add margin to the left to create space
          />
        </Flex>
      </Container>
    </Box>
  );
};
