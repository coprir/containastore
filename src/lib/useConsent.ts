'use client';

import { useEffect, useState } from 'react';
import { onConsentChange, readConsent, type ConsentValue } from './consent';

export function useConsent(): ConsentValue {
  const [value, setValue] = useState<ConsentValue>('unset');
  useEffect(() => {
    setValue(readConsent());
    return onConsentChange(setValue);
  }, []);
  return value;
}
