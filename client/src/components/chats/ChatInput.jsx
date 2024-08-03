import useAppContext from "@/hooks/useAppContext"
import useChatRoom from "@/hooks/useChatRoom"
import useSocket from "@/hooks/useSocket"
import ACTIONS from "@/utils/actions"
import { formatDate } from "@/utils/formateDate"
import { useRef } from "react"
import { LuSendHorizonal } from "react-icons/lu"

import styled from "styled-components"
export const Button = styled.button`

    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
    align-items: center;
    justify-content: center;
    display: flex; 
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-top-right-radius: 0.375rem ;
    border-bottom-right-radius: 0.375rem; 
    /* background-color: ${({ theme }) => theme.primary};  */
    background-color: aliceblue;
`;

const Form = styled.form` 
  width: 100%;
  /* max-width: 600px; */
  justify-content: space-between;
  display: flex;
  border-width: 1px;
  border-radius: 0.375rem;
  --tw-border-opacity: 1; 
  /* border-color: ${({ theme }) => theme.primary}; */
  border-color: #fdfdfd;
  flex-direction: row;
`
function ChatInput() {
    const { currentUser } = useAppContext()
    const { socket } = useSocket()
    const { setMessages } = useChatRoom()
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current.value.trim()

        if (inputVal.length > 0) {
            const message = {
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            }
            socket.emit(ACTIONS.SEND_MESSAGE, { message })
            setMessages((messages) => [...messages, message])
            inputRef.current.value = ""
        }
    }

    return (
        <Form
            onSubmit={handleSendMessage}
            // className="flex justify-between rounded-md border border-primary"
        >
            <input
                type="text"
                className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none"
                placeholder="Enter a message..."
                ref={inputRef}
            />
            <Button
                // className="flex items-center justify-center rounded-r-md  bg-primary p-2 text-black"
                type="submit"
            >
                <LuSendHorizonal size={24} />
            </Button>
        </Form>
    )
}

export default ChatInput
