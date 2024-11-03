import { useState } from 'react'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { searchFiles } from '@/lib/api'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { FileList } from './FileList'

export const FileSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data, isLoading, refetch } = useQuery(
    ['files', searchTerm],
    () => searchFiles(searchTerm),
    { enabled: false }
  )

  const handleSearch = () => {
    refetch()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search files..."
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      <FileList files={data?.files || []} isLoading={isLoading} />
    </motion.div>
  )
} 