import { PostDetail } from '@/components/PostDetail/PostDetail';
import { PostsList } from '@/components/PostList/PostsList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<PostsList/>} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
    </QueryClientProvider>
  );
}

export default App;