import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// Fonction pour convertir le formatage Markdown en HTML
const formatMarkdown = (text) => {
  if (!text) return '';
  
  // Convertir **texte** en <strong>texte</strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convertir les URLs en liens cliquables
  // Détecter les URLs (http://, https://, www.)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  formatted = formatted.replace(urlRegex, (url) => {
    // Ajouter https:// si l'URL commence par www.
    const fullUrl = url.startsWith('www.') ? `https://${url}` : url;
    return `<a href="${fullUrl}" target="_blank" rel="noopener noreferrer" style="color: #4CAF50; text-decoration: underline;">${url}</a>`;
  });
  
  // Convertir les sauts de ligne
  formatted = formatted.replace(/\n/g, '<br />');
  
  return formatted;
};

const Chatbot = ({ isFullPage = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '🌱 **Bonjour !** Je suis votre assistant **NIRD** (Numérique Inclusif, Responsable et Durable).\n\n🎯 **Je peux vous aider sur :**\n• **Éco-conception** - Développement éco-responsable\n• **Accessibilité** - Conformité RGAA/WCAG\n• **Sobriété** numérique et empreinte carbone\n• **Éthique** des données et RGPD\n• **Inclusion** numérique\n\n💬 Posez-moi vos questions !',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(isFullPage);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Générer un ID de session unique
  useEffect(() => {
    const generateSessionId = () => {
      return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    };
    setSessionId(generateSessionId());
  }, []);

  // Auto-scroll vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Ajouter le message de l'utilisateur
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Ajouter la réponse du bot
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: data.bot_response,
          timestamp: data.timestamp
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Ajouter un message d'erreur
        const errorMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: 'Désolé, une erreur s\'est produite: ' + (data.error || 'Erreur inconnue'),
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Erreur de connexion. Veuillez réessayer.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Chat effacé ! Comment puis-je vous aider avec le **numérique responsable** ?',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  // Si c'est en mode pleine page, ne pas afficher le bouton flottant
  if (isFullPage) {
    return (
      <div className="chatbot-container-fullpage">
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-content">
            <div className="bot-avatar">🌱</div>
            <div className="bot-info">
              <h3>Assistant NIRD</h3>
              <span className="status">En ligne</span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="clear-btn" 
              onClick={clearChat}
              title="Effacer la conversation"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.type}-message`}
            >
              <div className="message-content">
                <div 
                  className="message-text"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
                />
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="message bot-message loading-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="message-text">Assistant en train d'écrire...</div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur le numérique responsable..."
              className="message-input"
              rows="1"
              maxLength="1000"
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              className={`send-button ${inputMessage.trim() && !isLoading ? 'active' : ''}`}
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
          <div className="input-footer">
            <small>Appuyez sur Entrée pour envoyer • Shift+Entrée pour une nouvelle ligne</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bouton flottant pour ouvrir/fermer le chat */}
      <div 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🌱'}
      </div>

      {/* Interface du chatbot */}
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-content">
            <div className="bot-avatar">🌱</div>
            <div className="bot-info">
              <h3>Assistant NIRD</h3>
              <span className="status">En ligne</span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="clear-btn" 
              onClick={clearChat}
              title="Effacer la conversation"
            >
              🗑️
            </button>
            <button 
              className="close-btn" 
              onClick={() => setIsOpen(false)}
              title="Fermer le chat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.type}-message`}
            >
              <div className="message-content">
                <div 
                  className="message-text"
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(message.content) }}
                />
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="message bot-message loading-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="message-text">Assistant en train d'écrire...</div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur le numérique responsable..."
              className="message-input"
              rows="1"
              maxLength="1000"
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              className={`send-button ${inputMessage.trim() && !isLoading ? 'active' : ''}`}
              disabled={!inputMessage.trim() || isLoading}
            >
              {isLoading ? '⏳' : '📤'}
            </button>
          </div>
          <div className="input-footer">
            <small>Appuyez sur Entrée pour envoyer • Shift+Entrée pour une nouvelle ligne</small>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="chatbot-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Chatbot;