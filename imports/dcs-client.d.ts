/**
 * Type declarations for dcs-client package
 * This provides basic type hints for the Docuss client library
 */

declare module 'dcs-client' {
  export interface ComToPluginOptions {
    debug?: boolean
    onConnect?: () => void
    onDisconnect?: () => void
  }

  export interface RouteProps {
    pageName?: string
    pathname?: string
    search?: string
    hash?: string
  }

  export interface DiscourseRouteData {
    pageName: string
    pathname: string
    search: string
    hash: string
  }

  export interface SimpleRouteMatcherOptions {
    maxPageNameLength: number
    forceLowercase: boolean
    predefinedPageNames: Array<{ pageName: string; pathname: string }>
    otherPagesPrefix: string
  }

  export const comToPlugin: {
    connect: (options?: ComToPluginOptions) => void
    onDiscourseRoutePushed: (callback: (data: DiscourseRouteData) => void) => void
    postSetRouteProps: (props: RouteProps) => void
    onDcsMessage: (callback: (message: any) => void) => void
    postDcsMessage: (message: any) => void
    postCreateTopic: (options: any) => void
  }

  export function inIFrame(): boolean

  export class SimpleRouteMatcher {
    constructor(options: SimpleRouteMatcherOptions)
    getPageName(pathname: string): string | null
    getPathname(pageName: string): string | null
  }

  export function runReactRouterSync(options: {
    browserHistory: any
    routeMatcher: SimpleRouteMatcher
  }): void
}
