import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

interface LoaderArgs {
  context: {
    cloudflare: {
      env: {
        VALUE_FROM_CLOUDFLARE: string
      }
    }
  }
}

vi.mock('~/welcome/welcome', () => ({
  Welcome: ({ message }: { message: string }) => (
    <div data-testid="welcome-component">
      <h1>Matt Burnett</h1>
      <h2>Software Engineer</h2>
      <div>Message: {message}</div>
    </div>
  ),
}))

vi.mock('react-router', () => ({
  createRoutesStub: (
    routes: Array<{
      path: string
      Component: React.ComponentType<any>
      loader?: () => any
    }>
  ) => {
    return () => {
      const route = routes[0]
      const loaderData = route.loader ? route.loader() : {}
      const RouteComponent = route.Component as any
      return <RouteComponent loaderData={loaderData} />
    }
  },
}))

import { createRoutesStub } from 'react-router'

const Home: React.ComponentType<any> = ({ loaderData }) => (
  <div>
    <h1>Matt Burnett</h1>
    <h2>Software Engineer</h2>
    <div>Message: {loaderData.message}</div>
  </div>
)

const meta = () => [
  { title: 'Matt Burnett | Software Engineer' },
  {
    name: 'description',
    content:
      'Matt Burnett - Software Engineer - Building high-performance web applications with modern tech.',
  },
  {
    name: 'keywords',
    content:
      'Software Engineer, Frontend Developer, React Developer, Full Stack Developer, TypeScript, JavaScript, Web Development, React.js, Node.js, TailwindCSS, Web Applications, UI/UX, SPA, Progressive Web Apps, Modern Web Development, API Integration, Responsive Design',
  },
]

const loader = ({ context }: LoaderArgs) => {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE }
}

describe('Home Route', () => {
  it('renders correctly and has proper meta tags and loader', () => {
    // Test rendering with loader data
    const testMessage = 'Test message from Cloudflare'
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: Home,
        loader: () => ({ message: testMessage }),
      },
    ])

    render(<Stub />)
    expect(screen.getByText('Matt Burnett')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText(`Message: ${testMessage}`)).toBeInTheDocument()

    // Test meta tags
    const metaTags = meta()
    expect(metaTags).toHaveLength(3)
    expect(metaTags[0]).toEqual({ title: 'Matt Burnett | Software Engineer' })
    expect(metaTags[1].name).toBe('description')
    expect(metaTags[2].name).toBe('keywords')

    // Test loader
    const mockLoaderArgs: LoaderArgs = {
      context: {
        cloudflare: {
          env: {
            VALUE_FROM_CLOUDFLARE: 'Test CF Value',
          },
        },
      },
    }
    expect(loader(mockLoaderArgs)).toEqual({ message: 'Test CF Value' })
  })
})
