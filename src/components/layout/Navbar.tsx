import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  VStack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
// I'm using the original 'logo.png' name, but if you renamed yours to 'school-logo.jpg',
// make sure this line matches your actual file name.
import schoolLogo from "../../assets/school-logo.jpg";

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

interface MobileNavLinkProps {
  to: string;
  children: ReactNode;
  onClose: () => void;
}

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLink = ({ to, children }: NavLinkProps) => (
    <Link to={to}>
      <Button variant="link" color="brand.700">
        {children}
      </Button>
    </Link>
  );

  const MobileNavLink = ({ to, children, onClose }: MobileNavLinkProps) => (
    <Link to={to} onClick={onClose}>
      <Button variant="link" color="white" size="lg">
        {children}
      </Button>
    </Link>
  );

  return (
    <Box
      bg="white"
      px={5}
      py={3}
      boxShadow="sm"
      position="sticky"
      top="0"
      zIndex="banner"
    >
      <Flex maxW="1200px" margin="0 auto" align="center">
        <Link to="/">
          {/* We need to apply Flex here to group the logo and text */}
          <Flex align="center">
            <Image
              src={schoolLogo}
              alt="God's Wisdom School Logo"
              // Change 1: Responsive boxSize. 45px on mobile, 60px on desktop.
              boxSize={{ base: "40px", md: "55px" }}
            />
            <Heading
              as="h1"
              size="md"
              ml={3} // Reduced margin a bit
              // Change 2: Explicitly set the color to our brand blue.
              color="brand.700"
              display={{ base: "none", md: "block" }}
            >
              God's Wisdom Schools
            </Heading>
          </Flex>
        </Link>

        <Spacer />

        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <NavLink to="/">Home</NavLink>
          {/* Change 3: Let's make the link text consistent */}
          <NavLink to="/about">About</NavLink>
          <NavLink to="/admissions">Admissions</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </HStack>

        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="lg"
          variant="ghost"
          color="brand.700"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </Flex>
      {/* The rest of the Drawer code is the same */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="brand.500" color="white">
          <DrawerHeader borderBottomWidth="1px">
            <Flex align="center">
              <Spacer />
              <IconButton
                aria-label="Close Menu"
                icon={<CloseIcon />}
                variant="ghost"
                onClick={onClose}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="start" mt={6}>
              <MobileNavLink to="/" onClose={onClose}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" onClose={onClose}>
                About Us
              </MobileNavLink>
              <MobileNavLink to="/admissions" onClose={onClose}>
                Admissions
              </MobileNavLink>
              <MobileNavLink to="/contact" onClose={onClose}>
                Contact
              </MobileNavLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
