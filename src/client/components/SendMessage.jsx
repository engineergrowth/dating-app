import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SendMessageComponent = () => {
    const [message, setMessage] = useState('');
    const { receiverId } = useParams(); // Extract receiverId from route parameters
    const { userId } = useAuth(); // Get the sender's user ID from the AuthContext
    const navigate = useNavigate();

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;

        try {
            const token = localStorage.getItem('token'); // Retrieve the JWT from local storage
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sender_id: userId, // Use the sender's user ID from the AuthContext
                    receiver_id: receiverId,
                    content: message
                })
            });

            if (!response.ok) {
                alert('Failed to send message');
            }

            setMessage('');
            navigate(-1);
        } catch (error) {
            console.error('Error sending message', error);
        }
    };

    return (
        <div className="send-message-container">
            <form onSubmit={sendMessage} className="send-message-form">
                <textarea
                    className="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit" className="send-message-button">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default SendMessageComponent;
