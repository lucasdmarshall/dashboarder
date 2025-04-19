import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  VStack, 
  Text, 
  Icon, 
  Flex, 
  Heading,
  useColorModeValue,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { 
  FaHome,
  FaBook, 
  FaTasks, 
  FaUserGraduate,
  FaCertificate,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaCalendar,
  FaEnvelope,
  FaMoneyBillWave,
  FaChalkboard,
  FaGlobeAmericas,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaBars
} from 'react-icons/fa';

const SidebarItem = ({ icon, label, path, isActive, onClick, isCollapsed }) => {
  const isLogout = label === 'Logout';
  
  return (
    <Flex
      w="full"
      alignItems="center"
      px={isCollapsed ? 2 : 5}
      py={3}
      cursor="pointer"
      bg={isActive ? '#640101' : (isLogout ? 'red.50' : 'transparent')}
      color={isActive ? 'white' : (isLogout ? 'red.600' : 'gray.700')}
      _hover={{ 
        bg: isActive ? '#8B0000' : (isLogout ? 'red.100' : 'rgba(100, 1, 1, 0.1)'), 
        color: isActive ? 'white' : (isLogout ? 'red.700' : '#640101') 
      }}
      borderRight={isActive ? '4px solid' : 'none'}
      borderColor={isActive ? 'white' : (isLogout ? 'red.500' : 'transparent')}
      onClick={onClick}
      title={isCollapsed ? label : undefined}
      justifyContent={isCollapsed ? "center" : "flex-start"}
    >
      <Icon as={icon} boxSize={5} />
      {!isCollapsed && <Text fontWeight={isActive ? 'semibold' : 'normal'} ml={4}>{label}</Text>}
    </Flex>
  );
};

const StudentSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Load from localStorage on initial render
    const storedState = localStorage.getItem('sidebarCollapsed');
    return storedState === 'true';
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Responsive behavior
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  useEffect(() => {
    // Close mobile drawer when route changes
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('userRole');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { 
      icon: FaHome, 
      label: 'Dash Home', 
      path: '/student-home' 
    },
    { 
      icon: FaBook, 
      label: 'My Workspace', 
      path: '/student-courses' 
    },
    { 
      icon: FaChalkboard, 
      label: 'Browse Courses', 
      path: '/browse-courses' 
    },
    { 
      icon: FaCalendar, 
      label: 'Schedule', 
      path: '/student-schedule' 
    },
    { 
      icon: FaEnvelope, 
      label: 'Dash Chat', 
      path: '/student-messages' 
    },
    { 
      icon: FaMoneyBillWave, 
      label: 'Payments', 
      path: '/student-payments' 
    },
    { 
      icon: FaTasks, 
      label: 'Assignments', 
      path: '/student-assignments' 
    },
    { 
      icon: FaUserGraduate, 
      label: 'Progress', 
      path: '/student-progress' 
    },
    { 
      icon: FaCertificate, 
      label: 'Certificates', 
      path: '/student-certificates' 
    },
    { 
      icon: FaGlobeAmericas, 
      label: 'Find a Tutor', 
      path: '/student-find-tutor' 
    },
    { 
      icon: FaChalkboard, 
      label: 'Board Room', 
      path: '/boardroom' 
    },
    { 
      icon: FaUser,  
      label: 'Profile', 
      path: '/student-profile-new' 
    },
    { 
      icon: FaSignOutAlt, 
      label: 'Logout', 
      path: '/' 
    }
  ];

  // Sidebar content shared between both mobile and desktop versions
  const sidebarContent = (
    <VStack 
      spacing={0} 
      align="stretch"
      boxShadow="md"
    >
      {menuItems.map((item) => (
        <SidebarItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          path={item.path}
          isActive={location.pathname === item.path}
          onClick={item.label === 'Logout' ? handleLogout : () => navigate(item.path)}
          isCollapsed={isCollapsed}
        />
      ))}
    </VStack>
  );

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // Store in localStorage for persistence
    localStorage.setItem('sidebarCollapsed', String(newState));
    
    // Dispatch a custom event so other components can react to the sidebar state
    window.dispatchEvent(new CustomEvent('sidebarToggle', { 
      detail: { isCollapsed: newState }
    }));
  };

  return (
    <>
      <Box 
        w={isCollapsed ? "60px" : "250px"} 
        bg="white" 
        h="calc(100vh - 85px)"  
        borderRight="1px" 
        borderColor="#640101"
        position="fixed"
        left={0}
        top="85px"  
        pt={8}
        zIndex="999"
        overflowY="auto"
        transition="width 0.3s ease"
      >
        {!isCollapsed && (
          <Heading 
            size="lg" 
            textAlign="center" 
            mb={8} 
            color="#640101"
            fontWeight="bold"
          >
            Student Dashboard
          </Heading>
        )}

        {sidebarContent}
      </Box>
      
      <IconButton
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        icon={isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        position="fixed"
        left={isCollapsed ? "60px" : "250px"}
        top="50%"
        transform="translateX(-50%)"
        zIndex={1000}
        colorScheme="red"
        size="sm"
        borderRadius="full"
        boxShadow="md"
        bg="white"
        _hover={{ bg: "gray.100" }}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default StudentSidebar;

/**
 * Dashboarder LMS - Learning Management System
 * 
 * @copyright 2025 Dashboarder Technologies. All Rights Reserved.
 * @license Proprietary and Confidential
 * 
 * This file is part of the Dashboarder LMS project.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */