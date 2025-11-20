import { Box } from "@chakra-ui/react";
import { Hero } from "../components/sections/Hero";
import { Features } from "../components/sections/Features"; // 1. Import Features
import { Gallery } from "../../src/components/Gallery";
import { CTA } from "../components/sections/CTA";

export const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Features /> {/* 2. Add it right after the Hero */}
      <Gallery />
      <CTA />
    </Box>
  );
};
