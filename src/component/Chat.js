import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './chat.css'; // CSS file for styling

// Connect to the Socket.io server
const socket = io('http://localhost:5000'); // Make sure this matches your backend server URL

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Check if the client is connected to the server
        socket.on('connect', () => {
            console.log(`Connected to the server with socket ID: ${socket.id}`);
        });
    
        const id = prompt('Enter your User ID:');
        if (id) {
            setUserId(id);
            socket.emit('join', id); // Emit the 'join' event to notify the server of the user's ID
        }
    
        // Listen for incoming messages
        socket.on('receiveMessage', (data) => {
            console.log('Message received:', data); // Log the received message
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    
        // Clean up the event listener when component unmounts
        return () => {
            socket.off('receiveMessage');
        };
    }, []);
    

    // Function to send message
    const sendMessage = () => {
        if (message.trim() && receiverId.trim()) {
            socket.emit('sendMessage', { receiverId, message });
            setMessage(''); // Clear the input field after sending the message
        } else {
            alert('Please enter a valid message and receiver ID');
        }
    };

    return (
        <div id="chatContainer">
            <h2>Realtime Chat</h2>
            <div id="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>User {msg.senderId}: </strong>{msg.message}
                    </div>
                ))}
            </div>

            <div className="inputContainer">
                <input
                    type="text"
                    value={receiverId}
                    placeholder="Enter receiver ID"
                    onChange={(e) => setReceiverId(e.target.value)}
                    className="inputField"
                />
                <input
                    type="text"
                    value={message}
                    placeholder="Type a message..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="inputField"
                />
                <button onClick={sendMessage} className="sendButton">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
