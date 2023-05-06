import { useState } from "react"
import { Textarea, Button, useToast } from "@chakra-ui/react"

const JoinSessionTextInput = () => {
    const [text, setText] = useState('');
    const toast = useToast();
    const submitText = () => {
        if (text === '') {
            toast({
                title: 'Text field is empty',
                description: 'Please enter Game Room id',
                duration: 4000,
                status: 'error',
            })
        } else if (text.length < 8) {
            toast({
                title: 'Text field is not correct size',
                description: 'Please enter Game Room id of valid size',
                duration: 4000,
                status: 'error',
            })
        }
    }

    return (
        <>
            <Textarea 
                bg='white.400'
                color='black'
                padding={4}
                marginTop={6}
                height={20}
                width={80}
                fontSize='30px'
                maxLength='8'
                placeholder="Enter Game Room"
                onChange={ (e) => setText(e.target.value)}
            />

            <Button
                color='black'
                marginTop={4}
                width={80}
                fontSize={25}
                _hover={{bg: 'blue.400'}}
                onClick={submitText}
            >
                Join a game!
            </Button>
        </>
    )
}

export default JoinSessionTextInput