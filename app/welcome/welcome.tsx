export function Welcome({ message: _message }: { message: string }) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1"></div>
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
        <div className="contents">
          <h1 className="outrun tracking-widest text-center text-6xl neon-gradient p-2 will-change-transform main-heading">
            Matt Burnett
          </h1>
          <h2 className="fancyText tracking-wide text-center text-4xl p-2">Software Engineer</h2>
          <p className="text-sm text-gray-400">(he/him)</p>
        </div>
      </div>
      <section className="mx-auto mt-32 py-16 px-6 md:px-0 max-w-[80ch] gap-8 flex flex-col">
        <h2 className="fancyText tracking-widest text-5xl font-bold text-center">What I do...</h2>
        <p className="text-lg">
          I'm a software engineer with a passion for building high-performance web applications with
          modern a variety of modern tech.
        </p>
        <p className="text-lg">
          I'm currently a Senior Software Engineer at Shopify on the “Augmented Engineering” team
          helping improve DX internally. Previously at the company, I spent 4 years previous working
          on Checkout and the Checkout Editor. One of the{' '}
          <strong>
            <u>most visible</u>
          </strong>{' '}
          pieces of the Shopify platform.
        </p>
        <p className="text-lg">
          Before Shopify, I’ve worked at a variety of companies doing cool things since 2012.
        </p>
      </section>
      <section className="mx-auto my-16 py-16 max-w-[80ch] gap-8 flex flex-col">
        <h2 className="fancyText tracking-widest text-5xl font-bold text-center">Get in touch</h2>
        <div className="flex gap-8 justify-center">
          {resources.map(resource => (
            <a
              href={resource.href}
              key={resource.text}
              className="flex flex-col items-center gap-2"
            >
              {resource.icon}
              <span className="text-xs">{resource.text}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

const resources = [
  {
    href: 'https://www.linkedin.com/in/burnettmatt/',
    text: 'LinkedIn',
    icon: (
      <svg
        width="34"
        height="34"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 512 512"
      >
        <path
          fill="#fff"
          d="M474.919 0H38.592C17.72 0 0 16.504 0 36.841V475.14C0 495.496 11.629 512 32.492 512h436.327C489.718 512 512 495.496 512 475.14V36.841C512 16.504 495.809 0 474.919 0zM195.043 195.043h68.928v35.136h.755c10.505-18.945 41.541-38.177 79.921-38.177 73.655 0 94.214 39.108 94.214 111.538v135.321h-73.148V316.883c0-32.427-12.947-60.883-43.227-60.883-36.768 0-54.295 24.889-54.295 65.758v117.103h-73.148V195.043zM73.139 438.861h73.148V195.043H73.139v243.818zm82.289-329.148c0 25.258-20.457 45.715-45.715 45.715-25.258 0-45.715-20.457-45.715-45.715 0-25.258 20.457-45.715 45.715-45.715 25.258 0 45.715 20.457 45.715 45.715z"
        />
      </svg>
    ),
  },
  {
    href: 'https://github.com/mawburn',
    text: 'GitHub',
    icon: (
      <svg
        width="34"
        height="34"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          transform="scale(64)"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    href: 'https://github.com/mawburn',
    text: 'Instagram',
    icon: (
      <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
        <path
          fill="#fff"
          d="M295.42,6c-53.2,2.51-89.53,11-121.29,23.48-32.87,12.81-60.73,30-88.45,57.82S40.89,143,28.17,175.92c-12.31,31.83-20.65,68.19-23,121.42S2.3,367.68,2.56,503.46,3.42,656.26,6,709.6c2.54,53.19,11,89.51,23.48,121.28,12.83,32.87,30,60.72,57.83,88.45S143,964.09,176,976.83c31.8,12.29,68.17,20.67,121.39,23s70.35,2.87,206.09,2.61,152.83-.86,206.16-3.39S799.1,988,830.88,975.58c32.87-12.86,60.74-30,88.45-57.84S964.1,862,976.81,829.06c12.32-31.8,20.69-68.17,23-121.35,2.33-53.37,2.88-70.41,2.62-206.17s-.87-152.78-3.4-206.1-11-89.53-23.47-121.32c-12.85-32.87-30-60.7-57.82-88.45S862,40.87,829.07,28.19c-31.82-12.31-68.17-20.7-121.39-23S637.33,2.3,501.54,2.56,348.75,3.4,295.42,6m5.84,903.88c-48.75-2.12-75.22-10.22-92.86-17-23.36-9-40-19.88-57.58-37.29s-28.38-34.11-37.5-57.42c-6.85-17.64-15.1-44.08-17.38-92.83-2.48-52.69-3-68.51-3.29-202s.22-149.29,2.53-202c2.08-48.71,10.23-75.21,17-92.84,9-23.39,19.84-40,37.29-57.57s34.1-28.39,57.43-37.51c17.62-6.88,44.06-15.06,92.79-17.38,52.73-2.5,68.53-3,202-3.29s149.31.21,202.06,2.53c48.71,2.12,75.22,10.19,92.83,17,23.37,9,40,19.81,57.57,37.29s28.4,34.07,37.52,57.45c6.89,17.57,15.07,44,17.37,92.76,2.51,52.73,3.08,68.54,3.32,202s-.23,149.31-2.54,202c-2.13,48.75-10.21,75.23-17,92.89-9,23.35-19.85,40-37.31,57.56s-34.09,28.38-57.43,37.5c-17.6,6.87-44.07,15.07-92.76,17.39-52.73,2.48-68.53,3-202.05,3.29s-149.27-.25-202-2.53m407.6-674.61a60,60,0,1,0,59.88-60.1,60,60,0,0,0-59.88,60.1M245.77,503c.28,141.8,115.44,256.49,257.21,256.22S759.52,643.8,759.25,502,643.79,245.48,502,245.76,245.5,361.22,245.77,503m90.06-.18a166.67,166.67,0,1,1,167,166.34,166.65,166.65,0,0,1-167-166.34"
          transform="translate(-2.5 -2.5)"
        />
      </svg>
    ),
  },
  {
    href: 'https://bsky.app/profile/mawburn.com',
    text: 'Bluesky',
    icon: (
      <svg
        width="34"
        height="34"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 568 501"
      >
        <path
          fill="currentColor"
          d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"
        ></path>
      </svg>
    ),
  },
  {
    href: 'mailto:mawburn7@gmail.com',
    text: 'Email',
    icon: (
      <svg
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 388.424 388.424"
      >
        <g>
          <path
            d="M384.202,59.111H4.209C1.888,59.111,0,61,0,63.33v261.766c0,2.33,1.888,4.217,4.209,4.217h379.993
              c2.317,0,4.222-1.887,4.222-4.217V63.33C388.424,61,386.52,59.111,384.202,59.111z M319.937,92.888L194.212,185.09L68.485,92.888
              H319.937z M354.647,295.535H33.779V109.328l157.935,115.82c1.494,1.089,3.508,1.089,5.004,0l157.934-115.82v186.207H354.647z"
          />
        </g>
      </svg>
    ),
  },
]
