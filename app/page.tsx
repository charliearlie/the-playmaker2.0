import { Suspense } from 'react';
import { useServerUser } from '@/lib/user-auth';
import Groups from '../components/group/groups';
import StatisticsSummary from '../components/statistics/statistics-summary';

export default async function Home() {
  const user = await useServerUser();

  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <div className="w-full">
        <Groups />
        <StatisticsSummary />
      </div>
    </Suspense>
  );
}
