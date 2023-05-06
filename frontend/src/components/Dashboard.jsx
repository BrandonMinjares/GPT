import { Container, Box } from '@chakra-ui/react'
import Header from './Header'
import StartGame from './StartGame'
import JoinSessionTextInput from './JoinSessionTextInput'

const Dashboard = () => {
  return (
    <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
      <Container maxW='3xl' centerContent>
        <Header />
        <StartGame />
        <JoinSessionTextInput />
      </Container>
    </Box>
  )
}

export default Dashboard