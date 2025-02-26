// import { BASE_URL } from "@/constants/constant";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions<T> {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: T;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  credentials?: RequestCredentials;
}

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

class HttpClient {
  constructor() {}

  /**
   * 모든 API 요청을 처리하는 기본 메소드
   */
  private async request<T, U>(endpoint: string, options: RequestOptions<T> = {}): Promise<U> {
    const url = endpoint;
    const { method = 'GET', headers = {}, body, ...rest } = options;

    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers['Authorization'] = token;
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...rest,
    };
    // FormData인 경우 Content-Type 자동 설정을 위해 headers에서 제거
    if (method !== 'GET' && body) {
      if (body instanceof FormData) {
        fetchOptions.body = body;

        // Headers가 Record<string, string>인 경우에만 Content-Type 제거
        if (headers instanceof Headers) {
          headers.delete('Content-Type');
        } else if (typeof headers === 'object') {
          delete (headers as Record<string, string>)['Content-Type'];
        }
      } else {
        fetchOptions.body = JSON.stringify(body);
        (fetchOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
      }
    }

    try {
      const response = await fetch(url, fetchOptions);

      // 401 에러 처리 (토큰 만료 등)
      if (response.status === 401) {
        console.error('Authentication error: Token might be expired');
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // 응답이 비어있는 경우 처리
      if (response.status === 204) {
        return {} as U;
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  // HTTP 메소드별 편의 함수
  async get<T>(endpoint: string, options: Omit<RequestOptions<T>, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T, T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T, U>(endpoint: string, data?: T, options: Omit<RequestOptions<T>, 'method'> = {}): Promise<U> {
    return this.request<T, U>(endpoint, { ...options, method: 'POST', body: data });
  }

  async put<T, U>(endpoint: string, data?: T, options: Omit<RequestOptions<T>, 'method'> = {}): Promise<U> {
    return this.request<T, U>(endpoint, { ...options, method: 'PUT', body: data });
  }

  async patch<T, U>(endpoint: string, data?: T, options: Omit<RequestOptions<T>, 'method'> = {}): Promise<U> {
    return this.request<T, U>(endpoint, { ...options, method: 'PATCH', body: data });
  }

  async delete<T, U>(endpoint: string, options: Omit<RequestOptions<T>, 'method'> = {}): Promise<U> {
    return this.request<T, U>(endpoint, { ...options, method: 'DELETE' });
  }
}

// 싱글톤 인스턴스 생성
const httpClient = new HttpClient();

export default httpClient;
