import { INewsMedia } from '@/types/news.types'
import { useState } from 'react'

interface IProps {
  media: INewsMedia[]
}

export default function NewsMedia({ media }: IProps) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)

  const filteredMedia = media.filter(
    (mediaItem) => mediaItem.media_type !== 'file'
  )

  const openModal = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl)
  }

  const closeModal = () => {
    setSelectedMedia(null)
  }

  return (
    <div className="my-3">
      <div className="flex flex-wrap justify-center gap-4">
        {filteredMedia.map((mediaItem, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => openModal(mediaItem.media)}
          >
            {mediaItem.media_type === 'image' ? (
              <img
                src={mediaItem.media}
                alt={`media-${index}`}
                className="rounded-lg md:h-52 lg:h-72 object-cover border-4"
              />
            ) : mediaItem.media_type === 'video' ? (
              <video controls className="rounded-lg w-full h-full">
                <source src={mediaItem.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMedia}
              alt="full screen media"
              className="max-w-full max-h-screen"
            />
            <button
              className="top-0 right-0 absolute mt-2 mr-2 text-6xl text-white"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
