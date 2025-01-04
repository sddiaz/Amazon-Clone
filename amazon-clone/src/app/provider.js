// app/providers.tsx
'use client'
import { Provider } from 'react-redux';
import appStore from './state/store';

export default function ProviderWrapper({ children }) {
  return (
    <Provider store={appStore}>
      {children}
    </Provider>
  )
}