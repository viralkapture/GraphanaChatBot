
import React from 'react';
import { Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-3 max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
          <Bot className="h-4 w-4 text-white" />
        </div>

        {/* Typing Animation */}
        <Card className="p-4 bg-white/60 backdrop-blur border-white/20">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
