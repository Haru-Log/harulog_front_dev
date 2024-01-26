import React from 'react'
import { Separator } from 'src/ui/seperator'

const tags = Array.from({ length: 100 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
const MessageList = () => {
  return (
    <div>
      {tags.map((tag) => (
        <div className='hover:bg-main'>
          <div key={tag} className="text-sm p-5">
            {tag}
          </div>
          <Separator />
        </div>
      ))}
    </div>
  )
}

export default MessageList
