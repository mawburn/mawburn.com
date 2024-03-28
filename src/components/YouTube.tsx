import Image from 'next/image'
import { useState } from 'react'

export const YouTube = ({ videoId, title }: { videoId: string; title: string }) => {
  const [playVideo, setPlayVideo] = useState(false)
  const previewImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const iframeMarkup = () => (
    <iframe
      title={title}
      width="336"
      height="189"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
    />
  )

  return (
    <div
      className="relative w-full cursor-pointer aspect-video"
      style={{ width: '336px', height: '189px' }}
      onClick={() => setPlayVideo(true)}
    >
      {!playVideo ? (
        <>
          <div className="relative w-full h-full">
            <Image src={previewImageUrl} alt="Video Preview" fill className="object-cover" />
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative w-[64px] h-[45px]">
              <Image src="/img/youtube.svg" alt="Play" fill />
            </div>
          </div>
        </>
      ) : (
        iframeMarkup()
      )}
    </div>
  )
}
