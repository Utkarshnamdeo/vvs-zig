import { useEffect, useMemo, useState } from 'react';

import { InfoCard } from '~/components';
import { LegMode, Trip } from '~/types';
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

const calculateTrips = ({
  legs,
  legMode,
}: {
  legs: Array<Record<string, any>>;
  legMode: LegMode;
}): Trip => {
  const mappedLegs = legs.map((leg) => {
    return { carbonEmission: getEmission(leg), distance: leg.distance };
  });

  const carbonEmission = mappedLegs.reduce(
    (acc, curr) => curr.carbonEmission + acc,
    0
  );

  const distance = mappedLegs.reduce((acc, curr) => curr.distance + acc, 0);

  return {
    carbonEmission: `${carbonEmission.toFixed(2)} kg`,
    distance: `${(distance / 1000).toFixed(2).replace('.', ',')} km`,
    legMode,
  };
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

  const carTrip = useMemo(
    () => car?.legs && calculateTrips({ legs: car.legs, legMode: LegMode.CAR }),
    [car?.legs]
  );

  const trainTrip = useMemo(
    () =>
      train?.legs &&
      calculateTrips({
        legs: train.legs,
        legMode: LegMode.TRAIN,
      }),
    [train?.legs]
  );

  return (
    <div className='pt-9'>
      <h3>Pendeln in 210 Tagen mit Mittelklasse von</h3>

      {/* Distance display section */}
      <section className='mt-5 flex justify-center '>
        <div className='flex flex-row items-center rounded-lg shadow-vendorShadow background-gradient max-h-[68px]'>
          <div className='py-2 px-20 text-center'>
            <img src={CarIcon} alt='car' className='text-sm' />
            <p className='text-sm font-normal'>
              {carTrip?.distance && carTrip.distance}
            </p>
          </div>
          <div className='py-2 px-20 text-center'>
            <img src={BusIcon} alt='bus' className='text-sm' />
            <p className='text-sm font-normal'>
              {trainTrip?.distance && trainTrip.distance}
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
              {carTrip?.carbonEmission && carTrip.carbonEmission}
            </p>
            <p className='text-xs'>CO2 / Jahr</p>
          </InfoCard>

          <InfoCard className='bg-vendorOrange text-white'>
            <div className='flex align-middle justify-start'>
              <img src={VVSLogo} alt='vvs-logo' className='text-sm mr-[6px]' />
              <p className='text-sm font-semibold'>VVS Abo</p>
            </div>
            <p className='mt-2 text-xl font-bold'>
              {trainTrip?.carbonEmission && trainTrip.carbonEmission}
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
