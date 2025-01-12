// src/mocks/browser.js
// 클라이언트용

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
