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
    <Container maxW="md" py={[5, 10]} px={[4, 0]}>
      <VStack spacing={6} align="stretch">
        <Center flexDirection="column" mb={4}>
          {/* Logo scales down slightly on mobile */}
          <Image src={LOGO_URL} alt="OnlyFans Logo" w={["50px", "60px"]} mb={3} />
          
          <Heading 
            as="h1" 
            size={["xl", "2xl"]} 
            fontFamily="'Varela Round', sans-serif" 
            letterSpacing="-1px"
            fontWeight="400"
            textAlign="center"
          >
            <Text as="span" color="#0085B6">Only</Text> 
            <Text as="span" color="#00AFF0">Fans</Text>
          </Heading>
          
          <Text color="gray.500" fontSize={["xs", "sm"]} mt={2} textAlign="center">
            {isLogin ? "Log in to view exclusive content" : "Sign up for premium access"}
          </Text>
        </Center>

        <Box 
          as="form" 
          onSubmit={handleSubmit} 
          p={[6, 8]} 
          borderWidth={1} 
          borderRadius="xl" 
          boxShadow="lg" 
          bg="white"
        >
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
            
            <Flex w="full" justify="space-between" fontSize={["xs", "sm"]} color="#00AFF0" direction={["column", "row"]} align="center" gap={2}>
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
    // Responsive padding on the main background: p={[4, 8]}
    <Box minH="100vh" bg="gray.50" p={[4, 8]}>
      <FontStyle />

      {!isAuthenticated ? (
        <AuthForm onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Container maxW="container.xl" px={[0, 4]}>
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            mb={[6, 10]} 
            bg="white" 
            p={[3, 4]} 
            borderRadius="lg" 
            shadow="sm"
          >
            <Flex align="center">
              <Image src={LOGO_URL} alt="OnlyFans Logo" h={["25px", "35px"]} objectFit="contain" mr={2} />
              
              {/* Responsive Text Size: fontSize={["xl", "2xl"]} */}
              <Text 
                fontFamily="'Varela Round', sans-serif" 
                fontWeight="400" 
                fontSize={["xl", "2xl"]} 
                letterSpacing="-0.5px"
              >
                <Text as="span" color="#0085B6">Only</Text>
                <Text as="span" color="#00AFF0">Fans</Text>
             </Text>
            </Flex>
            <Button size={["sm", "md"]} colorScheme="gray" variant="ghost" onClick={() => setIsAuthenticated(false)}>Log Out</Button>
          </Flex>

          <Box mb={[6, 10]} textAlign="center">
            <Button 
              w="full" maxW="600px" 
              // Responsive Height and Font Size
              h={["60px", "80px"]} 
              fontSize={["lg", "2xl"]}
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
            <Text mt={2} color="gray.500" fontStyle="italic" fontSize={["xs", "md"]}>Warning: Keep clear of blades.</Text>
          </Box>
              {/* skibidi meowmeow*/}
              {/* skibidi meowmeow2*/}
          {/* SimpleGrid is already responsive: columns={[1, 2, 3, 4]} */}
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={[4, 6]}>
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