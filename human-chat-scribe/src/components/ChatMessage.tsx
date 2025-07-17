
import React from 'react';
import { Bot, User, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TypewriterText } from './TypewriterText';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: string[];
  isTyping?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} items-start space-x-3 max-w-[80%]`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 p-2 rounded-full ${
          isBot 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
            : 'bg-gradient-to-r from-green-500 to-teal-500'
        }`}>
          {isBot ? (
            <Bot className="h-4 w-4 text-white" />
          ) : (
            <User className="h-4 w-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <Card className={`p-4 ${
          isBot 
            ? 'bg-white/60 backdrop-blur border-white/20' 
            : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {isBot && message.isTyping ? (
              <TypewriterText text={message.content} speed={30} />
            ) : (
              message.content
            )}
          </div>
          
          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-3 w-3 text-gray-600" />
                <span className="text-xs text-gray-600 font-medium">Sources:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {message.sources.map((source, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-white/40">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            isBot ? 'text-gray-500' : 'text-white/70'
          }`}>
            {message.timestamp.toLocaleTimeString()}
          </div>
        </Card>
      </div>
    </div>
  );
};
