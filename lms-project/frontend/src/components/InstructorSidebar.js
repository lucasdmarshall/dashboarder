// External library imports
import React from 'react';
import { Global } from '@emotion/react';
import '@fontsource/montserrat-alternates/400.css';
import { useNavigate, useLocation } from 'react-router-dom';

// Chakra UI imports
import { 
  Box, 
  VStack, 
  Text, 
  Icon, 
  Flex, 
  Heading,
  useColorModeValue 
} from '@chakra-ui/react';

// React Icons imports
import { 
  FaChartLine, 
  FaPlusCircle, 
  FaBook, 
  FaUsers, 
  FaClipboardList, 
  FaFileUpload, 
  FaSignOutAlt,
  FaUserCircle,
  FaHome,
  FaShoppingCart,
  FaComments,
  FaEnvelope
} from 'react-icons/fa';

const THEME_COLORS = {
  primary: '#640101',     // Deep Red
  secondary: '#4A0000',   // Darker Red
  accent: '#8B0000',      // Dark Red
  black: '#000000',
  white: '#FFFFFF'
};

const FontStyles = () => (
  <Global
    styles={`
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');
      @font-face {
        font-family: 'Lora';
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Montserrat Alternates';
        font-weight: 400;
        font-style: normal;
      }
    `}
  />
);

const SidebarItem = ({ icon, label, path, isActive, onClick, activeColor, inactiveColor }) => {
  const isLogout = label === 'Logout';
  
  return (
    <Flex
      w="full"
      alignItems="center"
      px={5}
      py={3}
      cursor="pointer"
      bg={isActive ? "rgba(100, 1, 1, 0.1)" : (isLogout ? "rgba(100, 1, 1, 0.05)" : "transparent")}
      color={isActive ? "#640101" : (isLogout ? "#640101" : "#2D3748")}
      _hover={{ 
        bg: isActive ? "rgba(100, 1, 1, 0.2)" : (isLogout ? "rgba(100, 1, 1, 0.1)" : "rgba(100, 1, 1, 0.1)"), 
        color: "#640101"
      }}
      borderRight={isActive ? '4px solid' : 'none'}
      borderColor={isActive ? "#640101" : "transparent"}
      onClick={onClick}
    >
      <Icon 
        as={icon} 
        mr={4} 
        color={isActive ? "#640101" : "#2D3748"}
      />
      <Text 
        color={isActive ? "#640101" : "#2D3748"}
        fontWeight={isActive ? 'semibold' : 'normal'}
      >
        {label}
      </Text>
    </Flex>
  );
};

const InstructorSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Move color mode values outside of any callback
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');
  const hoverTextColor = useColorModeValue('blue.600', 'blue.300');
  const activeBgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    
    // Navigate to landing page
    navigate('/');
  };

  const menuItems = [
    { 
      icon: FaHome, 
      label: 'Dash Home', 
      path: '/instructor-dashboard' 
    },
    { 
      icon: FaBook, 
      label: 'Courses', 
      path: '/instructor-courses' 
    },
    { 
      icon: FaEnvelope, 
      label: 'Dash Chat', 
      path: '/instructor/messages' 
    },
    { 
      icon: FaPlusCircle, 
      label: 'Create Course', 
      path: '/instructor-create-course' 
    },
    { 
      icon: FaUsers, 
      label: 'Students', 
      path: '/instructor-students' 
    },
    { 
      icon: FaUserCircle, 
      label: 'Profile', 
      path: '/instructor-profile' 
    },
    { 
      icon: FaChartLine, 
      label: 'Board Room', 
      path: '/instructor-board-room' 
    },
    { 
      icon: FaShoppingCart, 
      label: 'Marketplace', 
      path: '/instructor-marketplace' 
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      w="250px"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      bg="#F7FAFC"  // Light background
      borderRight="1px"
      borderColor="#640101"
      boxShadow="md"
      zIndex={10}
      overflowY="auto"
      pt={20}
    >
      <FontStyles />
      <Heading 
        size="xl" 
        textAlign="left" 
        mb={8} 
        color="#640101"
        fontFamily="Lora, serif"
        fontWeight={400}
        px={4}
        mt={5}
      >
        Instructor Dashboard
      </Heading>
      <VStack spacing={2} align="stretch" px={4}>
        {menuItems.map((item, index) => (
          <Flex
            key={index}
            align="center"
            px={4}
            py={2}
            cursor="pointer"
            borderRadius="md"
            color={isActive(item.path) ? "#640101" : "#2D3748"}
            bg={isActive(item.path) ? "rgba(100, 1, 1, 0.1)" : "transparent"}
            _hover={{
              bg: "rgba(100, 1, 1, 0.2)",
              color: "#640101"
            }}
            onClick={() => navigate(item.path)}
          >
            <Icon 
              as={item.icon} 
              mr={3} 
              color={isActive(item.path) ? "#640101" : "#2D3748"}
            />
            <Text 
              fontWeight={isActive(item.path) ? 'bold' : 'normal'}
              color={isActive(item.path) ? "#640101" : "#2D3748"}
            >
              {item.label}
            </Text>
          </Flex>
        ))}
        <SidebarItem
          icon={FaSignOutAlt}
          label="Logout"
          path="/login"
          isActive={false}
          onClick={handleLogout}
          activeColor="#640101"
          inactiveColor="#2D3748"
        />
      </VStack>
    </Box>
  );
};

export default InstructorSidebar;

/**
 * Dashboarder LMS - Learning Management System
 * 
 * @copyright 2025 Dashboarder Technologies. All Rights Reserved.
 * @license Proprietary and Confidential
 * 
 * This file is part of the Dashboarder LMS project.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */