// src/App.js
import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  FormControl, 
  FormLabel, 
  Input, 
  SimpleGrid, 
  Text, 
  VStack, 
  useToast, 
  Card, 
  CardBody, 
  Image,
  Badge,
  Center,
  Heading
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

// --- IMPORTS ---
import logoImg from './oflogo.png'; 
import fanImg1 from './fan1.jpg';
import fanImg2 from './fan2.jpg';
import fanImg3 from './fan3.jpg';
import fanImg4 from './fan4.jpg';

const LOGO_URL = logoImg;
const FANS_LIST = [fanImg1, fanImg2, fanImg3, fanImg4];

const MotionImage = motion(Image);

// --- GLOBAL FONT STYLE ---
const FontStyle = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
    `}
  </style>
);

const Fan = ({ id, index, isOn }) => {
  const fanSrc = FANS_LIST[index % FANS_LIST.length];
  const speed = 0.2 + (index * 0.05);

  return (
    <Card 
      bg="white" 
      border="1px solid" 
      borderColor="gray.200"
      boxShadow="lg"
      overflow="hidden"
      _hover={{ boxShadow: "xl" }}
    >
      <CardBody p={2}>
        <VStack spacing={4}>
          <Box 
            position="relative" 
            height="180px" 
            width="100%" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            bg="gray.50"
            borderRadius="md"
            overflow="hidden"
          >
            <MotionImage 
              src={fanSrc}
              alt={`Fan Model ${id}`}
              boxSize="150px"
              objectFit="contain"
              animate={{ rotate: isOn ? 360 : 0 }}
              transition={{ duration: speed, repeat: isOn ? Infinity : 0, ease: "linear" }}
            />
            <Badge 
              position="absolute" top={2} right={2} 
              colorScheme={isOn ? "green" : "red"} variant="solid"
            >
              {isOn ? "LIVE" : "OFFLINE"}
            </Badge>
          </Box>
          <VStack spacing={0} align="start" w="100%" px={2}>
            <Text fontWeight="bold" fontSize="sm" color="gray.700">Fan Model #{id}</Text>
            <Text fontSize="xs" color="gray.500">{isOn ? "Turbo Mode Active" : "Waiting for Power"}</Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

// --- AUTH FORM ---
const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Welcome to OnlyFans!",
      description: "Access granted to premium cooling content.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onLogin();
  };

  return (
    <Container maxW="md" py={10}>
      <VStack spacing={6} align="stretch">
        <Center flexDirection="column" mb={4}>
          <Image src={LOGO_URL} alt="OnlyFans Logo" w="60px" mb={3} />
          
          {/* UPDATED: Two Hues of Blue */}
          <Heading 
            as="h1" 
            size="2xl" 
            fontFamily="'Varela Round', sans-serif" 
            letterSpacing="-1px"
            fontWeight="400"
          >
            <Text as="span" color="#0085B6">Only</Text> 
            <Text as="span" color="#00AFF0">Fans</Text>
          </Heading>
          
          <Text color="gray.500" fontSize="sm" mt={2}>
            {isLogin ? "Log in to view exclusive content" : "Sign up for premium access"}
          </Text>
        </Center>

        <Box as="form" onSubmit={handleSubmit} p={8} borderWidth={1} borderRadius="xl" boxShadow="lg" bg="white">
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel fontSize="xs" fontWeight="bold" color="gray.500" letterSpacing="wide">EMAIL</FormLabel>
              <Input type="email" placeholder="fanlover@example.com" bg="gray.50" _focus={{ borderColor: "#00AFF0", boxShadow: "0 0 0 1px #00AFF0" }} />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel fontSize="xs" fontWeight="bold" color="gray.500" letterSpacing="wide">PASSWORD</FormLabel>
              <Input type="password" placeholder="********" bg="gray.50" _focus={{ borderColor: "#00AFF0", boxShadow: "0 0 0 1px #00AFF0" }} />
            </FormControl>

            <Button 
              type="submit" bg="#00AFF0" color="white" _hover={{ bg: "#008ccf" }}
              width="full" mt={2} size="lg" borderRadius="full" fontWeight="bold" textTransform="uppercase" fontSize="sm"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </Button>
            
            <Flex w="full" justify="space-between" fontSize="sm" color="#00AFF0">
              <Button variant="link" size="sm" color="#00AFF0" fontWeight="normal">Forgot password?</Button>
              <Button variant="link" size="sm" color="#00AFF0" fontWeight="normal" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up for OnlyFans" : "Log in"}
              </Button>
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

// --- MAIN APP ---
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allFansOn, setAllFansOn] = useState(false);
  const fansList = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <Box minH="100vh" bg="gray.50" p={8}>
      <FontStyle />

      {!isAuthenticated ? (
        <AuthForm onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Container maxW="container.xl">
          <Flex justifyContent="space-between" alignItems="center" mb={10} bg="white" p={4} borderRadius="lg" shadow="sm">
            <Flex align="center">
              <Image src={LOGO_URL} alt="OnlyFans Logo" h="35px" objectFit="contain" mr={3} />
              {/* UPDATED: Two Hues of Blue */}
              <Text 
                fontFamily="'Varela Round', sans-serif" 
                fontWeight="400" 
                fontSize="2xl" 
                letterSpacing="-0.5px"
              >
                <Text as="span" color="#0085B6">Only</Text>
                <Text as="span" color="#00AFF0">Fans</Text>
             </Text>
            </Flex>
            <Button colorScheme="gray" variant="ghost" onClick={() => setIsAuthenticated(false)}>Log Out</Button>
          </Flex>

          <Box mb={10} textAlign="center">
            <Button 
              size="lg" w="full" maxW="600px" h="80px" fontSize="2xl"
              bg={allFansOn ? "red.500" : "#00AFF0"} color="white"
              onClick={() => setAllFansOn(!allFansOn)}
              boxShadow="xl" 
              _hover={{ 
                bg: allFansOn ? "red.600" : "#008ccf",
                transform: 'scale(1.02)' 
              }} 
              transition="all 0.2s"
            >
              {allFansOn ? "STOP ALL FANS 🥵" : "TURN ON ALL FANS 🥶"}
            </Button>
            <Text mt={2} color="gray.500" fontStyle="italic">Warning: Keep clear of blades.</Text>
          </Box>

          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {fansList.map((fanId, index) => (
              <Fan key={fanId} id={fanId} index={index} isOn={allFansOn} />
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}

export default App;