'use client';

import { Dispatch, useEffect, useState } from 'react';

// 커스템 이벤트 localStorage 타입 정의
declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<React.SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  // 로컬스토리지 값 얻어오기
  // 저장된 json을 parse 하거나 초기값 리턴
  const readValue = () => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error('localstorage error', error);
      return initialValue;
    }
  };

  // 값을 저장하기 위한 state
  // 초기값으로 함수를 넘겨줘서 한번만 실행되게함
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // 새로운 값으로 useState set할때
  // localstorage에도 항상 최신화 하도록 하는 함수
  const setValue: SetValue<T> = (value) => {
    if (typeof window === 'undefined') {
      console.warn('client 환경에서만 접근가능');
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);

      // useLocalStorage 훅을 사용하는 컴포넌트에 dispatchEvent
      dispatchEvent(
        new CustomEvent('local-storage', {
          detail: {
            key,
          },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 이벤트 발생시 localStorage 값 동기화
  const updateStorageChange = (event: CustomEvent | StorageEvent) => {
    if (event instanceof CustomEvent && (event as CustomEvent).detail.key !== key) return;
    if (event instanceof StorageEvent && (event as StorageEvent).key && (event as StorageEvent).key !== key) return;

    setStoredValue(readValue());
  };

  useEffect(() => {
    addEventListener('storage', updateStorageChange); // 다른 탭
    addEventListener('local-storage', updateStorageChange); // 동일 탭, 다른 컴포넌트

    return () => {
      removeEventListener('local-storage', updateStorageChange);
      removeEventListener('storage', updateStorageChange);
    };
  });

  return [storedValue, setValue];
};

export default useLocalStorage;
