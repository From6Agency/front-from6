import { useState, useCallback } from 'react';

interface CaptchaState {
  num1: number;
  num2: number;
  answer: string;
  isValid: boolean | null;
}

const SUBMISSION_COUNT_KEY = 'contact_submission_count';
const SUBMISSION_TIMESTAMP_KEY = 'contact_submission_timestamp';
const CAPTCHA_THRESHOLD = 1; // Show captcha after 1 submission

export const useCaptcha = () => {
  const [captcha, setCaptcha] = useState<CaptchaState>({
    num1: 0,
    num2: 0,
    answer: '',
    isValid: null,
  });

  // Generate new math captcha
  const generateCaptcha = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({
      num1,
      num2,
      answer: '',
      isValid: null,
    });
  }, []);

  // Validate captcha answer
  const validateCaptcha = useCallback(() => {
    const expectedAnswer = captcha.num1 + captcha.num2;
    const isValid = parseInt(captcha.answer, 10) === expectedAnswer;
    setCaptcha(prev => ({ ...prev, isValid }));
    return isValid;
  }, [captcha.num1, captcha.num2, captcha.answer]);

  // Update captcha answer
  const setCaptchaAnswer = useCallback((answer: string) => {
    setCaptcha(prev => ({ ...prev, answer, isValid: null }));
  }, []);

  // Check if captcha should be shown based on submission count
  const shouldShowCaptcha = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const storedTimestamp = localStorage.getItem(SUBMISSION_TIMESTAMP_KEY);
    const storedCount = localStorage.getItem(SUBMISSION_COUNT_KEY);
    
    // Reset count after 24 hours
    if (storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;
      
      if (now - timestamp > dayInMs) {
        localStorage.removeItem(SUBMISSION_COUNT_KEY);
        localStorage.removeItem(SUBMISSION_TIMESTAMP_KEY);
        return false;
      }
    }
    
    const count = storedCount ? parseInt(storedCount, 10) : 0;
    return count >= CAPTCHA_THRESHOLD;
  }, []);

  // Increment submission count
  const incrementSubmissionCount = useCallback(() => {
    if (typeof window === 'undefined') return;
    const storedCount = localStorage.getItem(SUBMISSION_COUNT_KEY);
    const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
    const newCount = currentCount + 1;
    
    localStorage.setItem(SUBMISSION_COUNT_KEY, newCount.toString());
    
    // Set timestamp on first submission
    if (!localStorage.getItem(SUBMISSION_TIMESTAMP_KEY)) {
      localStorage.setItem(SUBMISSION_TIMESTAMP_KEY, Date.now().toString());
    }
  }, []);

  // Check rate limiting (max 5 submissions per 24 hours)
  const isRateLimited = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const storedTimestamp = localStorage.getItem(SUBMISSION_TIMESTAMP_KEY);
    const storedCount = localStorage.getItem(SUBMISSION_COUNT_KEY);
    
    if (!storedTimestamp || !storedCount) return false;
    
    const timestamp = parseInt(storedTimestamp, 10);
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;
    
    // Reset if more than 24 hours
    if (now - timestamp > dayInMs) {
      localStorage.removeItem(SUBMISSION_COUNT_KEY);
      localStorage.removeItem(SUBMISSION_TIMESTAMP_KEY);
      return false;
    }
    
    const count = parseInt(storedCount, 10);
    return count >= 5; // Max 5 submissions per day
  }, []);

  return {
    captcha,
    generateCaptcha,
    validateCaptcha,
    setCaptchaAnswer,
    shouldShowCaptcha,
    incrementSubmissionCount,
    isRateLimited,
  };
};
