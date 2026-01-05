import Link from 'next/link';
import { BookOpen, Video, MessageCircle, Code } from 'lucide-react';

export function ServiceResources() {
  const resources = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Documentation',
      href: '/docs/services',
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: '2-min Tutorial',
      href: '/tutorials/services',
    },
    {
      icon: <Code className="w-5 h-5" />,
      label: 'API Reference',
      href: '/docs/api',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Get Help',
      href: '/support',
    },
  ];

  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Resources
      </h3>

      <div className="flex flex-wrap gap-3">
        {resources.map((resource, index) => (
          <Link
            key={index}
            href={resource.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {resource.icon}
            {resource.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
