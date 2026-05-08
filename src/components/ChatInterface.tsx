import { Send, Bot, User } from 'lucide-react';
import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const chat = ai.chats.create({ model: 'gemini-3-flash-preview' });

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await chat.sendMessage({
        message: `أنت المساعد الذكي الخاص بمنصة "نهج الاوائل" لطلاب الصف التاسع والثالث الثانوي.
        مهمتك هي الإجابة عن الأسئلة بناءً على المناهج والملخصات والكتب المعطاة فقط.
        يجب دعم المعادلات الرياضية والكيميائية والفيزيائية باستخدام صيغة LaTeX.
        لا تخرج عن نطاق هذه المواد التعليمية.
        السؤال: ${input}`,
      });
      setMessages((prev) => [...prev, { role: 'ai', text: response.text }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: 'ai', text: 'عذراً، حدث خطأ أثناء الإجابة.' }]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'ai' && <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0"><Bot size={24} /></div>}
            <div className={`p-4 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none prose prose-blue max-w-none'}`}>
              {m.role === 'ai' ? (
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {m.text}
                </ReactMarkdown>
              ) : (
                <p>{m.text}</p>
              )}
            </div>
            {m.role === 'user' && <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0"><User size={24} /></div>}
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-1 p-3 border border-gray-300 rounded-full shadow-inner bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
          placeholder="اسأل سؤالك عن المنهج..." 
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
        />
        <button onClick={sendMessage} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"><Send size={20} /></button>
      </div>
      <div className="text-center p-2 text-xs text-gray-400 bg-gray-50">
        يدعم هذا المساعد المعادلات الرياضيات والكيمياء والفيزياء (LaTeX)
      </div>
    </div>
  );
}
