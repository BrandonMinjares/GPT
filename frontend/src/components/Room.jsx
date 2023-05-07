import { Box, Button, GridItem, Grid, Text } from '@chakra-ui/react'
import { Image} from '@chakra-ui/react'
import MovieLogo from './../assets/film-reel-svgrepo-com.svg';
import { useState } from 'react';

const Room = () => {
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setButtonVisible(false);
    createGame();
  };

  const [question, setQuestion] = useState('');
  const [option, setOption] = useState([]);
  const [answer, setAnswer] = useState('');


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
            prompt: 'Provide me with 1 movie trivia question in an array named questions, 4 unique answer options labeled A, B, C, or D in an array named options, and then 1 correct answer labeled A, B, C, or D in an array named answers. Make each array name lowercase.  Each array should be using the notation "[]"',
            max_tokens: 4000,
            model: 'text-davinci-003',
            n: 1,
          })
        }
    
        await fetch(`${process.env.REACT_APP_OPENAI_API_URL}`, options)
                                .then(response => response.json())
                                .then(data => {
                                  console.log(data);
                                  const result = data.choices[0].text;
                                  console.log(result);
                                  const regex = /\[(.*?)\]/g;
                                  const matches = [...result.matchAll(regex)].map(match => match[1]);
                                  console.log(matches);
                                  const question = matches[0].replace(/"/g, '');

                                  setQuestion(question)
                                  console.log(matches[1])
                                  const options = matches[1].split(/"([^"]*)"/);
                                  console.log(options)
                                  setOption(options)

                                  setAnswer(matches[2][1])
/*

                                  const optionArray = options.split(', ')

                                  for (let i = 0; i < optionArray.length; i++) {
                                    if (optionArray[i][0] === answer) {
                                      setAnswer(optionArray[i])
                                    }
                                  }
                                  */
                                })
                                .catch(error => console.log(error));
        }
  return (
    <Box>
    <Box bg='tomato' p='2vh' color='white'>
    <Image src={MovieLogo} alt="React Logo" style={{width: 45 }}/>
    <Text fontSize={46} color='white'>{question}</Text>
        {buttonVisible && (
        <Button color='black' onClick={handleClick}>Start Game</Button>
        )}
        {answer}
    </Box>
    <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'>
        <GridItem colSpan={1} bg='purple.600'  height='50vh' width='50vw' border='1px' borderColor='gray.200' 
          onClick={() => option[1].substring(0, 1) === answer ? console.log('good') : console.log('bad')}>
          <Text fontSize={45} color='white'>
          {option[1]}
          </Text>
        </GridItem>
        <GridItem colSpan={1} bg='green.500'  height='50vh' width='50vw' border='1px' borderColor='gray.200' fontSize={35}
          onClick={() => option[3].substring(0, 1) === answer ? console.log('good') : console.log('bad')}>
        <Text fontSize={45} color='white'>
          {option[3]}
          </Text>
        </GridItem>
        <GridItem colSpan={1} bg='blue.500'  height='50vh' width='50vw' border='1px' borderColor='gray.200' fontSize={35}
          onClick={() => option[5].substring(0, 1) === answer ? console.log('good') : console.log('bad')}>
        <Text fontSize={45} color='white'>
          {option[5]}
          </Text>
        </GridItem>
        <GridItem colSpan={1} bg='yellow.400'  height='50vh' width='50vw' border='1px' borderColor='gray.200' fontSize={35}
            onClick={() => option[7].substring(0, 1) === answer ? console.log('good') : console.log('bad')}>
        <Text fontSize={45} color='white'>
          {option[7]}
          </Text>
        </GridItem>
    </Grid>
    </Box>
  )
}

export default Room