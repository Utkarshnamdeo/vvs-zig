import { useEffect, useMemo, useState } from 'react';

import { InfoCard } from '~/components';
import { Trip } from '~/types';
import { getTrips } from '~/api/operations';

import CarIcon from '~/assets/car-icon.svg';
import BusIcon from '~/assets/bus-icon.svg';
import AutoIcon from '~/assets/auto-icon.svg';
import VVSLogo from '~/assets/vvs-logo.svg';

const getEmission = (leg: Record<string, any>) => {
  const key = Object.keys(leg.properties)
    .sort() // sorting alphabetically to make sure that the key is always the same
    .find((key) => key.toLowerCase().includes('actual')) as string;
  return Number(leg.properties[key].split('-')[0].trim());
};

const useTrips = (from: string, to: string) => {
  const [trips, setTrips] = useState<Record<string, Array<any>>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const date = new Date().toLocaleDateString('en-CA').replace(/-/g, '');
        const response = await getTrips({ from, to, date });
        if (response.journeys.length === 0) {
          setError(true);
        }
        setTrips(response.journeys);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [from, to]);

  return { trips, loading, error };
};

const ResultPage = ({ params }: { params: { from: string; to: string } }) => {
  const {
    trips: [train, car],
    loading,
    error,
  } = useTrips(params.from, params.to);

  const carTrip = useMemo(() => {
    if (car) {
      return {
        carbonEmission: car.legs
          .map((leg: Record<string, any>) => getEmission(leg))
          .reduce((acc: number, curr: number) => curr + acc, 0),

        distance: car.legs
          .map((leg: Record<string, any>) => leg.distance)
          .reduce((acc: number, curr: number) => acc + curr, 0),
        legMode: 'car',
      } as Trip;
    }
  }, [car]);

  const trainTrip = useMemo(() => {
    if (train) {
      return {
        carbonEmission: train.legs
          .map((leg: Record<string, any>) => getEmission(leg))
          .reduce((acc: number, curr: number) => curr + acc, 0),

        distance: train.legs
          .map((leg: Record<string, any>) => leg.distance)
          .reduce((acc: number, curr: number) => acc + curr, 0),
        legMode: 'train',
      } as Trip;
    }
  }, [train]);

  return (
    <div className='pt-9'>
      <h3>Pendeln in 210 Tagen mit Mittelklasse von</h3>

      {/* Distance display section */}
      <section className='mt-5 flex justify-center '>
        <div className='flex flex-row items-center rounded-lg shadow-vendorShadow background-gradient max-h-[68px]'>
          <div className='py-2 px-20 text-center'>
            <img src={CarIcon} alt='car' className='text-sm' />
            <p className='text-sm font-normal'>
              {carTrip?.distance &&
                (carTrip.distance / 1000).toFixed(2).replace('.', ',')}{' '}
              km
            </p>
          </div>
          <div className='py-2 px-20 text-center'>
            <img src={BusIcon} alt='bus' className='text-sm' />
            <p className='text-sm font-normal'>
              {trainTrip?.distance &&
                (trainTrip.distance / 1000).toFixed(2).replace('.', ',')}{' '}
              km
            </p>
          </div>
        </div>
      </section>

      <section className='mt-5 flex justify-center flex-wrap lg:flex-nowrap '>
        <div className='flex space-between'>
          <InfoCard className='bg-white'>
            <div className='flex align-middle justify-start'>
              <img src={AutoIcon} alt='car' className='text-sm mr-[6px]' />
              <p className='text-sm font-semibold'>Auto</p>
            </div>
            <p className='mt-2 text-xl font-bold'>
              {carTrip?.carbonEmission && carTrip.carbonEmission.toFixed(2)} kg
            </p>
            <p className='text-xs'>CO2 / Jahr</p>
          </InfoCard>

          <InfoCard className='bg-vendorOrange text-white'>
            <div className='flex align-middle justify-start'>
              <img src={VVSLogo} alt='vvs-logo' className='text-sm mr-[6px]' />
              <p className='text-sm font-semibold'>VVS Abo</p>
            </div>
            <p className='mt-2 text-xl font-bold'>
              {trainTrip?.carbonEmission && trainTrip.carbonEmission.toFixed(2)}{' '}
              kg
            </p>
            <p className='text-xs'>CO2 / Jahr</p>
          </InfoCard>
        </div>
        <div className='flex space-between'>
          <InfoCard className='bg-white' />

          <InfoCard className='bg-vendorOrange text-white' />
        </div>
      </section>
    </div>
  );
};

export default ResultPage;
