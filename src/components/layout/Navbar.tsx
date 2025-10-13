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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
// 1. Import the type for the 'children' prop from React
import type { ReactNode } from "react";

// 2. Define the types for our link component props
interface NavLinkProps {
  to: string;
  children: ReactNode;
}

interface MobileNavLinkProps {
  to: string;
  children: ReactNode;
  onClose: () => void; // The onClick handler is a function that returns nothing
}

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 3. Apply the types to the component's props
  const NavLink = ({ to, children }: NavLinkProps) => (
    <Link to={to}>
      <Button variant="link" color="white">
        {children}
      </Button>
    </Link>
  );

  // 4. Apply the types here as well
  const MobileNavLink = ({ to, children, onClose }: MobileNavLinkProps) => (
    <Link to={to} onClick={onClose}>
      {" "}
      {/* Close drawer on click */}
      <Button variant="link" color="white" size="lg">
        {children}
      </Button>
    </Link>
  );

  return (
    <Box bg="brand.500" p={4} color="white">
      <Flex maxW="1200px" margin="0 auto" align="center">
        <Link to="/">
          <Heading as="h1" size="lg">
            God's Wisdom School
          </Heading>
        </Link>

        <Spacer />

        {/* Desktop Navigation Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/admissions">Admissions</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </HStack>

        {/* Mobile Hamburger Icon */}
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          size="lg"
          variant="ghost"
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
        />
      </Flex>

      {/* Mobile Navigation Drawer */}
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
              {/* 5. Pass the onClose function to the MobileNavLink */}
              <MobileNavLink to="/" onClose={onClose}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/about" onClose={onClose}>
                About
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
