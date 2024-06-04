'use client';
import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
}

interface Message {
  id: number;
  subject: string;
  content: string;
  createdAt: string;
  sender: User;
  receiver: User;
  resources?: string;
}

const MessageDashboard = ({ userId }: { userId: number }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');
  const [resources, setResources] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/messages?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
        setLoading(false);
      });
  }, [userId]);

  const sendMessage = async () => {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId: userId, receiverUsername, subject, content, resources }),
    });
    if (response.ok) {
      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
    } else {
      console.error('Error sending message');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-end">
    <div className="max-w-md w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Para"
          value={receiverUsername}
          onChange={(e) => setReceiverUsername(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Agregar un asunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <textarea
          placeholder="Contenido del mensaje"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded mb-2 w-full h-32"
        ></textarea>
        <input
          type="text"
          placeholder="Recursos (optional)"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          className="border p-2 rounded mb-2 w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send Message
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        {messages.map((message) => (
          <div key={message.id} className="p-4 border rounded mb-2">
            <div><strong>De:</strong> {message.sender?.username || 'Unknown'}</div>
            <div><strong>Para:</strong> {message.receiver?.username || 'Unknown'}</div>
            <div><strong>Asunto:</strong> {message.subject}</div>
            <div><strong>Contenido:</strong> {message.content}</div>
            {message.resources && <div><strong>Recursos:</strong> {message.resources}</div>}
            <div><strong>Sent At:</strong> {new Date(message.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MessageDashboard;
