import React from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Flex, 
  Grid, 
  GridItem, 
  Button
} from '@chakra-ui/react';
import { 
  FaChartLine, 
  FaClipboardList, 
  FaUserGraduate 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InstructorHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: FaChartLine,
      title: "Access Dashboard",
      description: "View your instructor dashboard overview",
      color: "#640101",
      action: () => navigate('/instructor-dashboard')
    },
    {
      icon: FaClipboardList,
      title: "Manage Courses",
      description: "View and manage your current courses",
      color: "#640101",
      action: () => navigate('/instructor-dashboard')
    },
    {
      icon: FaUserGraduate,
      title: "Student Tracking",
      description: "Monitor student progress and performance",
      color: "#640101",
      action: () => navigate('/instructor-dashboard')
    }
  ];

  const recentActivity = [
    {
      title: "Advanced Python Programming",
      students: 24,
      lastUpdated: "2 hours ago"
    },
    {
      title: "Web Development Fundamentals",
      students: 36,
      lastUpdated: "Yesterday"
    }
  ];

  return (
    <Container maxW="container.xl" ml="80px" mt="75px" width="calc(100% - 80px)" py={8} bg="white">
      <VStack spacing={8} align="stretch">
        <Box bg="rgba(100, 1, 1, 0.05)" p={6} borderRadius="lg" border="2px solid #640101">
          <Heading size="lg" mb={4} color="#640101" borderBottom="2px solid #640101" pb={2}>
            Welcome, Instructor
          </Heading>
          <Text color="black">
            Empower your students' learning journey. Create, manage, and track courses with ease.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={4} color="#640101" borderBottom="2px solid #640101" pb={2}>
            Quick Actions
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {quickActions.map((action, index) => (
              <GridItem key={index}>
                <Box 
                  border="2px solid #640101"
                  borderRadius="xl" 
                  bg={index % 2 === 0 ? 'white' : 'rgba(100, 1, 1, 0.05)'}
                  p={6}
                  _hover={{ 
                    transform: 'scale(1.03)', 
                    bg: 'rgba(100, 1, 1, 0.05)'
                  }}
                >
                  <Flex align="center" gap={4} mb={4}>
                    <Box as={action.icon} color={action.color} boxSize={8} />
                    <Heading size="sm" color="#640101">{action.title}</Heading>
                  </Flex>
                  <Button 
                    width="full"
                    bg="#640101"
                    color="white"
                    _hover={{ bg: 'black' }}
                    onClick={action.action}
                  >
                    Go to Dashboard
                  </Button>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Box>
          <Heading size="md" mb={4} color="#640101" borderBottom="2px solid #640101" pb={2}>
            Recent Courses
          </Heading>
          <VStack spacing={4}>
            {recentActivity.map((course, index) => (
              <Box 
                key={index} 
                border="2px solid #640101"
                borderRadius="lg" 
                p={4}
                bg={index % 2 === 0 ? 'white' : 'rgba(100, 1, 1, 0.05)'}
                width="full"
              >
                <Flex justify="space-between" align="center">
                  <VStack align="start" spacing={1}>
                    <Heading size="sm" color="#640101">{course.title}</Heading>
                    <Text color="black">{course.students} students</Text>
                  </VStack>
                  <Button 
                    bg="#640101"
                    color="white"
                    _hover={{ bg: 'black' }}
                  >
                    View
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default InstructorHome;
