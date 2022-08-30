type BaseUrl = string
const baseUrl: BaseUrl = 'http://localhost:3000/auth'

export class API {
  readonly baseUrl: BaseUrl

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl
  }
  getDefaultOptions() {
    return {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const defaultOptions = this.getDefaultOptions()
    const response = await fetch(this.baseUrl + endpoint, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers
        ...(!!options?.headers && options.headers),
      },
    })

    if (!response.ok) throw new Error(response.statusText)

    const responseData = (await response.json()) as T
    return responseData
  }
  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }
  post(endpoint: string, body: Record<string, any>, options: Omit<RequestInit, 'body'> = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) }),
    })
  }
}
export const api = new API(baseUrl)
