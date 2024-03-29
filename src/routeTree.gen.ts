/* eslint-disable */

/* prettier-ignore */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FeedsImport } from './routes/feeds'
import { Route as IndexImport } from './routes/index'
import { Route as FeedsFeedIdImport } from './routes/feeds.$feedId'

// Create Virtual Routes

const FeedsIndexLazyImport = createFileRoute('/feeds/')()

// Create/Update Routes

const FeedsRoute = FeedsImport.update({
  path: '/feeds',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/feeds.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const FeedsIndexLazyRoute = FeedsIndexLazyImport.update({
  path: '/',
  getParentRoute: () => FeedsRoute,
} as any).lazy(() => import('./routes/feeds.index.lazy').then((d) => d.Route))

const FeedsFeedIdRoute = FeedsFeedIdImport.update({
  path: '/$feedId',
  getParentRoute: () => FeedsRoute,
} as any).lazy(() => import('./routes/feeds.$feedId.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/feeds': {
      preLoaderRoute: typeof FeedsImport
      parentRoute: typeof rootRoute
    }
    '/feeds/$feedId': {
      preLoaderRoute: typeof FeedsFeedIdImport
      parentRoute: typeof FeedsImport
    }
    '/feeds/': {
      preLoaderRoute: typeof FeedsIndexLazyImport
      parentRoute: typeof FeedsImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  FeedsRoute.addChildren([FeedsFeedIdRoute, FeedsIndexLazyRoute]),
])
