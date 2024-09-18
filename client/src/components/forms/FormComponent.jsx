import useAppContext from "../../hooks/useAppContext";
import useSocket from "../../hooks/useSocket";
import ACTIONS from "../../utils/actions";
import UserStatus from "../../utils/status";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../../utils/Themes";
import styled from "styled-components";

export const Button = styled.button`
    align-items: center;
    text-decoration: none;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    padding-top: 12px;
    padding-bottom: 12px;
    color: ${({ theme }) => theme.white};
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s ease-in-out !important;

    background: ${({ theme }) => theme.primary};
    background: linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );
    background: -moz-linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );
    background: -webkit-linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );

    &:hover {
        transform: scale(1.05);
        transition: all 0.4s ease-in-out;
    }
`;

const LinkButton = styled.a`
    display: inline-block;
    text-decoration: none;
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    padding-top: 12px;
    padding-bottom: 12px;
    color: ${({ theme }) => theme.white};
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    transition: all 0.2s ease-in-out !important;

    background: ${({ theme }) => theme.primary};
    background: linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );
    background: -moz-linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );
    background: -webkit-linear-gradient(
        225deg,
        ${({ theme }) => theme.primary} 0%,
        ${({ theme }) => theme.primary + 90} 100%
    );

    &:hover {
        transform: scale(1.05);
        transition: all 0.4s ease-in-out;
    }

    .label {
        font-size: 12px;
        font-weight: bold;
        color: #ff5733; /* Vibrant color for "New" label */
        margin-left: 8px;
    }
`;

function FormComponent() {
    const location = useLocation();
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext();
    const { socket } = useSocket();
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() });
        toast.success("New Room Id created", {
            position: "top-left",
        });
        usernameRef.current.focus();
    };

    const handleInputChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const validateForm = () => {
        if (currentUser.username.length === 0) {
            toast.error("Enter your username");
            return false;
        } else if (currentUser.roomId.length === 0) {
            toast.error("Enter a room id");
            return false;
        } else if (currentUser.roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long");
            return false;
        } else if (currentUser.username.length < 3) {
            toast.error("Username must be at least 3 characters long");
            return false;
        }
        return true;
    };

    const joinRoom = (e) => {
        e.preventDefault();
        if (status === UserStatus.ATTEMPTING_JOIN) return;
        if (!validateForm()) return;
        toast.loading("Joining room...");
        setStatus(UserStatus.ATTEMPTING_JOIN);
        socket.emit(ACTIONS.JOIN_REQUEST, currentUser);
    };

    useEffect(() => {
        if (currentUser.roomId.length > 0) return;
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId });
            if (currentUser.username.length === 0) {
                toast.success("Enter your username");
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser]);

    useEffect(() => {
        if (status === UserStatus.DISCONNECTED && !socket.connected) {
            socket.connect();
            return;
        }

        const isRedirect = sessionStorage.getItem("redirect") || false;

        if (status === UserStatus.JOINED && !isRedirect) {
            const username = currentUser.username;
            sessionStorage.setItem("redirect", true);
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            });
        } else if (status === UserStatus.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect");
            socket.disconnect();
            socket.connect();
        }
    }, [currentUser, location.state?.redirect, navigate, socket, status]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
                <h1 className="text-4xl text-white sm:text-5xl">DrawCode</h1>
                <p className="mb-4 text-center md:mb-8">
                    {"Code, Chat, Collaborate and Illustrate synchronously"}
                </p>
                <form
                    onSubmit={joinRoom}
                    className="flex w-full flex-col gap-4"
                >
                    <input
                        type="text"
                        name="roomId"
                        placeholder="Room Id"
                        className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                        onChange={handleInputChanges}
                        value={currentUser.roomId}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                        onChange={handleInputChanges}
                        value={currentUser.username}
                        ref={usernameRef}
                    />
                    <div>
                        <Button type="submit">Join Room</Button>
                    </div>
                </form>
                <button
                    className="cursor-pointer select-none"
                    onClick={createNewRoomId}
                >
                    Generate Unique Room Id
                </button>
                <LinkButton href="https://console-api-sig.zegocloud.com/s/uikit/F7zAJj" target="_blank" rel="noopener noreferrer">
                    Video Call
                    <span className="label">New</span>
                </LinkButton>
            </div>
        </ThemeProvider>
    );
}

export default FormComponent;
