import Link from 'next/link'
import { Search, FileText, Mail, Calendar } from 'lucide-react'

const agents = [
  {
    id: 'file-search',
    name: 'File Search Agent',
    description: 'Search your PC for documents, images, and files by filename',
    icon: Search,
    href: '/agents/search',
    color: 'bg-blue-500',
  },
  {
    id: 'document-processor',
    name: 'Document Processor',
    description: 'Process and analyze documents automatically',
    icon: FileText,
    href: '/agents/documents',
    color: 'bg-green-500',
    comingSoon: true,
  },
  {
    id: 'email-assistant',
    name: 'Email Assistant',
    description: 'Manage and organize your emails intelligently',
    icon: Mail,
    href: '/agents/email',
    color: 'bg-purple-500',
    comingSoon: true,
  },
  {
    id: 'calendar-manager',
    name: 'Calendar Manager',
    description: 'Smart calendar management and scheduling',
    icon: Calendar,
    href: '/agents/calendar',
    color: 'bg-orange-500',
    comingSoon: true,
  },
]

export default function AgentsPortal() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          AI Agents Portal
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          Choose an agent to help you with your tasks
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {agent.comingSoon && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Coming Soon
                </span>
              </div>
            )}
            <div
              className={`${agent.color} inline-flex p-3 rounded-lg text-white mb-4`}
            >
              <agent.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{agent.description}</p>
            {!agent.comingSoon && (
              <Link
                href={agent.href}
                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Get Started
                <span className="ml-1">→</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
