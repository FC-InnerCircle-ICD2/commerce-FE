import { BASE_URL } from "@/constants/constant";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  credentials?: RequestCredentials;
}

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || BASE_URL) {
    // this.baseUrl = baseUrl;
    this.baseUrl = 'https://jsonplaceholder.typicode.com/';
  }

  /**
   * 모든 API 요청을 처리하는 기본 메소드
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = this.baseUrl + endpoint;
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

    // GET 요청이 아닌 경우에만 body 추가
    if (method !== 'GET' && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);
      
      // 401 에러 처리 (토큰 만료 등)
      if (response.status === 401) {
        // 여기에 토큰 리프레시 로직을 추가할 수 있습니다
        // 또는 로그인 페이지로 리다이렉트
        console.error('Authentication error: Token might be expired');
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // 응답이 비어있는 경우 처리
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  // HTTP 메소드별 편의 함수
  async get<T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data?: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body: data });
  }

  async patch<T>(endpoint: string, data?: any, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body: data });
  }

  async delete<T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// 싱글톤 인스턴스 생성
const httpClient = new HttpClient();

export default httpClient;