import { Suspense } from 'react';
import useUser from '@/lib/useUser';
import Groups from './components/group/groups';
import StatisticsSummary from './components/statistics/statistics-summary';

export default async function Home() {
  const user = await useUser();

  console.log('user', user);
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <div className="w-full">
        <Groups />
        <StatisticsSummary />
      </div>
    </Suspense>
  );
}
