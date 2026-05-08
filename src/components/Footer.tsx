import { ExternalLink, MessageCircle, Facebook, Youtube, BookOpen } from 'lucide-react';

export default function Footer() {
  const links = [
    { name: 'تليجرام', url: 'https://t.me/nahg2023', icon: MessageCircle },
    { name: 'واتساب', url: 'https://whatsapp.com/channel/0029VaDEiOtEFeXkCX9nnW1I/430', icon: MessageCircle },
    { name: 'فيسبوك', url: 'https://www.facebook.com/share/g/1AQYsqqjfE/', icon: Facebook },
    { name: 'ملخصات', url: 'https://nahgalawelplatform.blogspot.com/2025/06/blog-post_27.html', icon: BookOpen },
    { name: 'يوتيوب', url: 'https://youtube.com/@nahgalawel?si=wSxJd5evKDYmVXCQ', icon: Youtube },
  ];

  return (
    <footer className="p-6 text-center border-t border-gray-200 mt-10">
      <p className="mb-4 text-gray-500">تابعونا على وسائل التواصل الاجتماعي:</p>
      <div className="flex justify-center gap-6">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <Icon size={24} />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
