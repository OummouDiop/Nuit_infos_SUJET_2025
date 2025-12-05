import React, { useState } from 'react';

const ChatbotSimple = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant très visible pour test */}
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px',
          color: 'white',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
      </div>

      {/* Interface simple du chat */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px 10px 0 0',
            textAlign: 'center'
          }}>
            <h4 style={{margin: 0}}>🤖 Chatbot Gemini</h4>
          </div>
          
          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto'
          }}>
            <div style={{
              background: '#f5f5f5',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '10px'
            }}>
              Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ?
            </div>
          </div>
          
          {/* Input */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #eee'
          }}>
            <div style={{display: 'flex', gap: '10px'}}>
              <input 
                type="text" 
                placeholder="Tapez votre message..."
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  outline: 'none'
                }}
              />
              <button style={{
                padding: '10px 15px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}>
                📤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotSimple;