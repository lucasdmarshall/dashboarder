import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaVideo, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';
import StudentSidebar from '../components/StudentSidebar';
import PageWithSidebar from '../templates/PageWithSidebar';

const scheduleData = [
  {
    id: 1,
    course: 'Machine Learning',
    instructor: 'Elena Rodriguez',
    date: '2024-03-15',
    time: '14:00 - 15:30',
    type: 'Online',
    status: 'Upcoming'
  },
  {
    id: 2,
    course: 'Web Development',
    instructor: 'John Smith',
    date: '2024-03-16',
    time: '10:00 - 11:30',
    type: 'In-Person',
    status: 'Confirmed'
  },
  {
    id: 3,
    course: 'Data Science',
    instructor: 'Sarah Chen',
    date: '2024-03-17',
    time: '16:00 - 17:30',
    type: 'Online',
    status: 'Upcoming'
  }
];

const StudentSchedule = () => {
  const [schedule, setSchedule] = useState(scheduleData);

  return (
    <PageWithSidebar bg="white">
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex 
            alignItems="center" 
            justifyContent="space-between" 
            bg="#640101" 
            color="white" 
            p={4} 
            borderRadius="lg"
            boxShadow="md"
          >
            <Heading as="h1" size="xl">My Schedule</Heading>
            <Flex alignItems="center">
              <FaCalendar size="24px" style={{ marginRight: '10px' }} />
              <Text fontSize="lg">Upcoming Sessions</Text>
            </Flex>
          </Flex>
          
          <TableContainer 
            bg="white" 
            borderRadius="lg" 
            boxShadow="xl"
            overflow="hidden"
          >
            <Table variant="unstyled">
              <Thead bg="#640101" color="white">
                <Tr>
                  {['Course', 'Instructor', 'Date', 'Time', 'Type', 'Status'].map((header) => (
                    <Th 
                      key={header} 
                      color="white" 
                      textTransform="uppercase" 
                      letterSpacing="wider"
                      fontWeight="bold"
                    >
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {schedule.map((session, index) => (
                  <Tr 
                    key={session.id} 
                    bg={index % 2 === 0 ? 'gray.50' : 'white'}
                    _hover={{ 
                      bg: 'rgba(100, 1, 1, 0.05)', 
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease' 
                    }}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                  >
                    <Td>
                      <Flex alignItems="center">
                        <Box 
                          w="10px" 
                          h="10px" 
                          bg="#640101" 
                          borderRadius="full" 
                          mr={3} 
                        />
                        <Text fontWeight="semibold" color="gray.700">
                          {session.course}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color="gray.600">{session.instructor}</Td>
                    <Td>
                      <Flex alignItems="center" color="gray.700">
                        <FaCalendarAlt 
                          style={{ 
                            marginRight: '8px', 
                            color: '#640101' 
                          }} 
                        />
                        {session.date}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex alignItems="center" color="gray.700">
                        <FaClock 
                          style={{ 
                            marginRight: '8px', 
                            color: '#640101' 
                          }} 
                        />
                        {session.time}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex alignItems="center" color="gray.700">
                        <FaVideo 
                          style={{ 
                            marginRight: '8px', 
                            color: '#640101' 
                          }} 
                        />
                        {session.type}
                      </Flex>
                    </Td>
                    <Td>
                      <Badge 
                        bg={
                          session.status === 'Confirmed' ? '#640101' : 
                          session.status === 'Upcoming' ? '#640101' : 
                          'gray.500'
                        }
                        color="white"
                        variant="solid"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {session.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Container>
    </PageWithSidebar>
  );
};

export default StudentSchedule;
