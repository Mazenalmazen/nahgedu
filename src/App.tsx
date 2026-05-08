/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import AlertBanner from './components/Alert';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AlertBanner />
      
      <header className="p-8 text-center bg-white border-b border-gray-200 shadow-sm mt-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">منصة نهج الاوائل</h1>
        <p className="text-xl text-gray-700 mb-1">على قدر أهل العزم تأتي العزائم</p>
        <p className="text-md text-gray-500">أ- محمد يحيى فرحان</p>
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-center">المساعد الذكي للمنهج</h2>
          <ChatInterface />
        </div>
      </main>

      <Footer />
    </div>
  );
}
