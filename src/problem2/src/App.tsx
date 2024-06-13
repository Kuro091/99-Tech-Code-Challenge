import { QueryClient, QueryClientProvider } from 'react-query';
import { CurrencyPage } from './features/currency/pages/CurrencyPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyPage />
    </QueryClientProvider>
  );
}

export default App;
