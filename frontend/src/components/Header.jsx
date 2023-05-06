import { Heading, Image } from "@chakra-ui/react"
import logo from './../assets/film-reel-svgrepo-com.svg';

const Header = () => {
  return (
    <>
    <Image src={logo} alt='logo' width={100} marginBottom='1rem' />
    <Heading color='white' marginBottom='1rem'>
        GPT3MOVIES
    </Heading>
    </>
  )
}

export default Header