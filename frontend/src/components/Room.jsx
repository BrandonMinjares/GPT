import { Box, Button, GridItem, Grid } from '@chakra-ui/react'
import { Image} from '@chakra-ui/react'
import MovieLogo from './../assets/film-reel-svgrepo-com.svg';

const Room = () => {



    const createGame = async () => {
      console.log(process.env)
      console.log(process.env.REACT_APP_OPENAI_API_URL);
        const options =  {
          method: 'POST', 
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'Give me 5 movie trivia questions and provide 3 incorrect answers and 1 correct answer. Label each answer as A, B, C, or D. Store all the questions in 1 array, all the answer options in another array, and all the correct answers in another array and return the 3 arrays',
            max_tokens: 2048,
            model: 'text-davinci-003',
            n: 1,
          })
        }
    
        await fetch(`${process.env.REACT_APP_OPENAI_API_URL}`, options)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    const answersString = data.choices[0].text.trim();

                                    const answers = answersString.split("\n\n");
                                    console.log(answers);
                                    
                                    /*
                                    const [questionsArray, answerOptionsArray, correctAnswersArray] = data.choices[0].text.trim().split(/\n\n(.*?)(?=\[)/).slice(1);
                                    console.log(questionsArray);
                                    console.log(answerOptionsArray);
                                    console.log(correctAnswersArray);
                                    */
                                })
                                .catch(error => console.log(error));
        }
  return (
    <Box>
    <Box bg='tomato' p='2vh' color='white'>
    <Image src={MovieLogo} alt="React Logo" style={{width: 45 }}/>
        <Button color='black' onClick={createGame}>Start Game</Button>
    </Box>
    <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'>
        <GridItem colSpan={1} bg='purple.600'  height='50vh' width='50vw' border='1px' borderColor='gray.200'>A</GridItem>
        <GridItem colSpan={1} bg='green.500'  height='50vh' width='50vw' border='1px' borderColor='gray.200'>B</GridItem>
        <GridItem colSpan={1} bg='blue.500'  height='50vh' width='50vw' border='1px' borderColor='gray.200'>C</GridItem>
        <GridItem colSpan={1} bg='yellow.400'  height='50vh' width='50vw' border='1px' borderColor='gray.200'>D</GridItem>
    </Grid>
    </Box>
  )
}

export default Room