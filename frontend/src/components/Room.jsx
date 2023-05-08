import { Box, Button, GridItem, Grid, Text, Flex } from '@chakra-ui/react'
import { Image} from '@chakra-ui/react'
import MovieLogo from './../assets/film-reel-svgrepo-com.svg';
import { useState } from 'react';

const Room = () => {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [scoreVisible, setScoreVisible] = useState(false);

  const handleClick = () => {
    setButtonVisible(false);
    setScoreVisible(true);
    createGame();
  };

  const [question, setQuestion] = useState('');
  const [option, setOption] = useState([]);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  const correctAnswer = () => {
    alert('Correct!')
    setScore(score + 1)
    createGame()
  }

  const incorrectAnswer = () => {
    alert('inorrect!')
    createGame()
  }


    const createGame = async () => {
      
      // console.log(process.env)
      // console.log(process.env.REACT_APP_OPENAI_API_URL);
        const options =  {
          method: 'POST', 
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: 'Provide me with a movie trivia question in an array named questions, 4 unique answer options where 1  answer option is correct and 3  answer options are incorrect and they are labeled A, B, C, or D in an array named options. Then give me 1 correct  answer options labeled A, B, C, or D in an array named answers. Make each array name lowercase.  Each array should be using the notation "[]"',
            max_tokens: 4000,
            model: 'text-davinci-003',
            n: 1,
          })
        }
    
        await fetch(`${process.env.REACT_APP_OPENAI_API_URL}`, options)
                                .then(response => response.json())
                                .then(data => {
                                  // console.log(data);
                                  const result = data.choices[0].text;
                                  // console.log(result);
                                  const regex = /\[(.*?)\]/g;
                                  const matches = [...result.matchAll(regex)].map(match => match[1]);
                                  // console.log(matches);
                                  // console.log('matches length' + matches.length)
                                  if (matches.length !== 3) {
                                    createGame();
                                  } else {
                                    const question = matches[0].replace(/"/g, '');

                                    setQuestion(question)
                                    // console.log(matches[1])
                                    const options = matches[1].split(/"([^"]*)"/);
                                    // console.log(options)
                                    // console.log('answer option length' + options.length)
                                    setOption(options)

                                    const answer = (matches[2][1]).toUpperCase();
                                    setAnswer(answer)
                                  }

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
    <Flex bg='black'>
      <Box maxHeight='100vh' bg='white'>
        <Grid bg='tomato' p='3vh' templateColumns='repeat(5, 1fr)' color='white' alignItems="center" justifyContent="center">
          <GridItem colSpan={1} ><Image src={MovieLogo} alt="React Logo" style={{width: 60, height: 60, paddingLeft: 1}}/> </GridItem>
          <GridItem colSpan={3}><Text fontSize={40} color='white'>{question}</Text>
          {buttonVisible && (
            <Button color='white' width='22vw' onClick={handleClick}><Text fontSize={20} color='black'>Start Game</Text></Button>
            )}
          </GridItem>
          <GridItem colSpan={1} >{scoreVisible && (<Text fontSize={40} color='white'>Score: {score}</Text>)}</GridItem>
        </Grid>
        <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'>
            <GridItem>
              <Box colSpan={1} bg='purple.600'  height='45vh' width='50vw' border='1px' borderColor='gray.200' 
              onClick={() => option[1].substring(0, 1) === answer ? correctAnswer() : incorrectAnswer()}>
              <Text color='white' fontSize={44} borderRadius="md" textAlign="center" display="flex" alignItems="center" justifyContent="center">{option[1]}</Text>
              </Box>
            </GridItem>
            <GridItem>
              <Box colSpan={1} bg='green.500'  height='45vh' width='50vw' border='1px' borderColor='gray.200'
                onClick={() => option[3].substring(0, 1) === answer ? correctAnswer() : incorrectAnswer()}>
              <Text color='white' fontSize={44} borderRadius="md" textAlign="center" display="flex" alignItems="center" justifyContent="center">{option[3]}</Text>
              </Box>

            </GridItem>
            <GridItem>
              <Box colSpan={1} bg='blue.500'  height='45vh' width='50vw' border='1px' borderColor='gray.200' fontSize={35}
                onClick={() => option[3].substring(0, 1) === answer ? correctAnswer() : incorrectAnswer()}>
              <Text color='white' fontSize={44} borderRadius="md" textAlign="center" display="flex" alignItems="center" justifyContent="center">{option[5]}</Text>
              </Box>

            </GridItem>
            <GridItem>
              <Box  colSpan={1} bg='yellow.400'  height='45vh' width='50vw' border='1px' borderColor='gray.200' fontSize={35}
                onClick={() => option[3].substring(0, 1) === answer ? correctAnswer() : incorrectAnswer()}>
              <Text color='white' fontSize={44} borderRadius="md" textAlign="center" display="flex" alignItems="center" justifyContent="center">{option[7]}</Text>
              </Box>

            </GridItem>
        </Grid>
      </Box>
      </Flex>
  )
}

export default Room