import { useState } from 'react';
import { Send, Bot, User, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  recommendations?: Recommendation[];
}

interface Recommendation {
  name: string;
  type: string;
  rating: number;
  price: string;
  address: string;
  hours: string;
  image: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy Jamito, tu asistente personal para encontrar lugares increíbles. ¿Qué tipo de lugar estás buscando hoy?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleRecommendations: Recommendation[] = [
    {
      name: 'Café Central',
      type: 'Cafetería para trabajar',
      rating: 4.7,
      price: '$$',
      address: 'Av. Larco 123, Miraflores',
      hours: '7:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    },
    {
      name: 'La Taberna',
      type: 'Bar casual',
      rating: 4.5,
      price: '$$$',
      address: 'Jr. Unión 456, Centro',
      hours: '6:00 PM - 2:00 AM',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop',
    },
  ];

  const sendToWebhook = async (userMessage: string) => {
    try {
      const response = await fetch('https://madererayenny.app.n8n.cloud/webhook-test/flujodetrabajo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          timestamp: new Date().toISOString(),
          userId: 'user_' + Date.now(),
          source: 'jama_chat'
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Webhook response:', data);
      
      return data;
    } catch (error) {
      console.error('Error sending to webhook:', error);
      toast.error('Error al procesar tu mensaje. Inténtalo de nuevo.');
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Enviar mensaje al webhook y obtener respuesta
      const webhookResponse = await sendToWebhook(messageText);
      
      // Crear respuesta del bot con los datos del webhook
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: webhookResponse.message || webhookResponse.response || 'Lo siento, no pude procesar tu mensaje correctamente.',
        isBot: true,
        timestamp: new Date(),
        // Si el webhook devuelve recomendaciones, las incluimos
        recommendations: webhookResponse.recommendations || (webhookResponse.message && webhookResponse.message.includes('recomendaciones') ? sampleRecommendations : undefined),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    } catch (error) {
      // En caso de error, mostrar mensaje de fallback
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Disculpa, estoy teniendo problemas técnicos en este momento. Por favor, inténtalo de nuevo.',
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "Quiero un lugar para trabajar con buen wifi",
    "Busco un restaurante romántico para una cita",
    "Necesito un lugar familiar para almorzar",
    "Quiero un bar para salir con amigos"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Jamito IA</h2>
                <p className="text-white/80">Tu asistente personal de lugares</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-3xl ${message.isBot ? 'bg-gray-100' : 'bg-orange-500 text-white'} rounded-lg p-4`}>
                  <div className="flex items-start space-x-3">
                    {message.isBot && (
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Recommendations */}
                      {message.recommendations && (
                        <div className="mt-4 space-y-3">
                          {message.recommendations.map((rec, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex space-x-4">
                                  <img 
                                    src={rec.image} 
                                    alt={rec.name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                                      <span className="text-yellow-500 text-sm">★ {rec.rating}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{rec.type}</p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                      <span className="flex items-center">
                                        <MapPin size={12} className="mr-1" />
                                        {rec.address}
                                      </span>
                                      <span className="flex items-center">
                                        <Clock size={12} className="mr-1" />
                                        {rec.hours}
                                      </span>
                                      <span className="flex items-center">
                                        <DollarSign size={12} className="mr-1" />
                                        {rec.price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 mb-3">Preguntas sugeridas:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(question)}
                    className="text-left justify-start h-auto p-3 text-wrap"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe qué tipo de lugar buscas..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
