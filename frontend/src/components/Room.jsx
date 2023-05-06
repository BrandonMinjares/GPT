import { Box, Button, GridItem, Grid } from '@chakra-ui/react'
import { Image} from '@chakra-ui/react'
import { useState } from 'react';
import MovieLogo from './../assets/film-reel-svgrepo-com.svg';

const Room = () => {
    const [movieQuestions, setMovieQuestions] = useState([]);
    const [movieAnswerOptions, setMovieAnswerOptions] = useState([]);
    const [movieCorrectAnswers, setMovieCorrectAnswers] = useState([]);


    const createGame = async () => {
        const options =  {
          method: 'POST', 
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'Give me 5 movie trivia questions and provide 3 incorrect answers and 1 correct answer. Label each answer as A, B, C, or D. Store all the questions in 1 array, all the answer options in another array, and all the correct answers in another array and return the 3 arrays',
            max_tokens: 2048,
            model: 'text-davinci-003',
            n: 1,
          })
        }
    
        await fetch(`${import.meta.env.VITE_OPENAI_API_URL}`, options)
                                .then(response => response.json())
                                .then(data => {
                                    const results = data.choices[0].text.trim().split('\n');
                                    console.log(results);
                                    const questions = [];
                                    const answerOptions = [];
                                    const correctAnswers = [];
                                    
                                    for (let i = 0; i < results.length; i += 4) {
                                      questions.push(results[i]);
                                      answerOptions.push([results[i], results[i + 1], results[i + 2], results[i + 3]]);
                                      correctAnswers.push(results[i]);
                                    }
                                    setMovieQuestions(questions);
                                    setMovieAnswerOptions(answerOptions);
                                    setMovieCorrectAnswers(correctAnswers);

                                    console.log(movieQuestions);
                                    console.log(movieAnswerOptions);
                                    console.log(movieCorrectAnswers);
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