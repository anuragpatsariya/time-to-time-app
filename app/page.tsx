import TimeDifferenceCalculator from '@/components/TimeDifferenceCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <TimeDifferenceCalculator />
      </div>
    </main>
  );
}
