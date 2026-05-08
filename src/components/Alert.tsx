import { AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AlertBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('alert_shown');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem('alert_shown', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 p-4 bg-red-100 border-b border-red-200 text-red-900"
        >
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-600" />
              <p className="font-bold text-sm md:text-base">🚨تنبيه هام : 🚨 منصة نهج الاوائل لاتتبع اي مدرسة اهلية بالواقع فالحذر من هذة المدارس الاهلية التي تنتحل اسم نهج الاوائل وكذلك المعاهد فهي لاتمد بأي صلة لنهج لامن قريب ولامن بعيد .🚨🚨🚨</p>
            </div>
            <button onClick={dismiss} className="font-bold text-red-800">إغلاق</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
