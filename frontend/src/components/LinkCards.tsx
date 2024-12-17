import { useAuth } from "../context/AuthContext";
import { FRONTEND_URL } from "../config"
import { ChevronDown, ChevronUp, Copy, Trash2, ExternalLink } from 'lucide-react'
import { format, isValid } from 'date-fns'
import { es } from 'date-fns/locale'
import { IconButton } from "./ui/IconButton";
import { useState } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";


export const LinkCards = () => {
  const { user } = useAuth()
  const { CopyToClipboard } = useCopyToClipboard()
  const [isOpen, setIsOpen] = useState(false)

  const handleCopy = async (shortenedUrl: string) => {
    const success = await CopyToClipboard(shortenedUrl)

    return success
  }

  return (
    <div className="grid items-center justify-center w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-3">
      {user?.urls?.map(({ slug, url, description, created_at }) => {

        return (
          <div key={slug} className="w-full max-w-md border rounded-lg shadow border-neutral-200 dark:border-neutral-800">

            <div className="p-4">

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold truncate">https://www.example.com/{slug}</span>

                <div className="flex ml-2">
                  <IconButton onClick={() => handleCopy(`${FRONTEND_URL}/${slug}`)} variant="ghost" size="icon">
                    <Copy className="w-4 h-4" />
                    <span className="sr-only">Copy URL</span>
                  </IconButton>
                  <IconButton variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete URL</span>
                  </IconButton>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {created_at && isValid(created_at)
                  ? `Created at ${format(created_at, 'dd MMMM yyyy HH:mm', { locale: es })}`
                  : 'Creation date not available'}
              </p>
            </div>


            <div className="mt-2 border-t border-zinc-800 dark:border-gray-400" >
              <IconButton
                variant="ghost"
                size="icon"
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors rounded-sm dark:hover:bg-neutral-800 hover:bg-zinc-200"
                onClick={() => { setIsOpen(!isOpen) }}
              >
                {isOpen ? 'Hide description' : 'Show description'}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span className="sr-only">Toggle description</span>
              </IconButton>
            </div>

            <div className={`p-4 space-y-2 bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>

              <div>
                <h3 className="text-sm font-medium">Original URL:</h3>
                <p className="text-sm break-all text-zinc-600 dark:text-neutral-400">{url}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Redirection URL:</h3>
                <p className="flex items-center text-sm break-all text-zinc-600 dark:text-neutral-400">
                  {FRONTEND_URL}/{slug}
                  <a href='/'
                    className="ml-1 text-blue-600 dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="sr-only">Open URL</span>
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Description:</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">{description || 'No description available'}</p>
              </div>
            </div>


            <div className="flex items-center p-4 text-sm text-gray-600 dark:text-gray-400">
              Click the copy button to use this shortened URL.
            </div>

          </div>
        )

      })}
    </div >
  );
};
