import { Button } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';

export default function StartGame() {
  const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/game');
  };
  return (
    <Button 
        fontSize={25} 
        color={"black"}
        textAlign='center'
        _hover={{bg: 'blue.400'}}
        onClick={navigateToContacts}

    >
        Start a game!
    </Button>
  )
}