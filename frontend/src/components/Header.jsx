import { Heading, Image } from "@chakra-ui/react"

const Header = () => {
  return (
    <>
    <Image alt='logo' width={100} marginBottom='1rem' />
    <Heading color='white' marginBottom='1rem'>
        GPT3MOVIES
    </Heading>
    </>
  )
}

export default Header