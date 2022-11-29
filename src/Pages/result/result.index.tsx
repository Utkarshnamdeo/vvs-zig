import { useEffect, useState } from 'react';

import { InfoCard } from '~/components';
import { Journey } from '~/types';
import { getTrips } from '~/api/operations';

import CarIcon from '~/assets/car-icon.svg';
import BusIcon from '~/assets/bus-icon.svg';
import AutoIcon from '~/assets/auto-icon.svg';
import VVSLogo from '~/assets/vvs-logo.svg';

const ResultPage = ({ params }: { params: { from: string; to: string } }) => {
  const [loading, setLoading] = useState(false);

  const [carJourney, setCarJourney] = useState<Journey | null>(null);
  const [trainJourney, setTrainJourney] = useState<Journey | null>(null);

  useEffect(() => {
    const getTrip = async () => {
      setLoading(true);
      try {
        const data = await getTrips({
          from: params.from,
          to: params.to,
          date: new Date().toLocaleDateString('en-CA').replace(/-/g, ''),
        });
        if (!data.journeys) return;

        const [train, car] = data.journeys;

        setCarJourney({
          carbonEmission: car.legs
            .map((leg: Record<string, any>) =>
              Number(leg.properties[`CO2Emission_Actual_LargeCars`])
            )
            .reduce((acc: number, curr: number) => curr + acc, 0),

          distance: car.legs
            .map((leg: Record<string, any>) => leg.distance)
            .reduce((acc: number, curr: number) => acc + curr, 0),
          id: 'car',
        } as Journey);

        setTrainJourney({
          carbonEmission: train.legs
            .filter((leg: Record<string, any>) => {
              return leg.transportation.product.name !== 'footpath';
            })
            .map((leg: Record<string, any>) =>
              Number(
                leg.properties[
                  `CO2Emission_Actual_${leg.transportation.product.name}`
                ]
              )
            )
            .reduce((acc: number, curr: number) => curr + acc, 0),
          distance: train.legs
            .map((leg: Record<string, any>) => leg?.distance || 0)
            .reduce((acc: number, curr: number) => acc + curr, 0),
          id: 'train',
        } as Journey);

        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.from && params.to) {
      getTrip();
    }
  }, [params.from, params.to]);

  return (
    <div className='pt-9'>
      <h3>Pendeln in 210 Tagen mit Mittelklasse von</h3>

      <section className='mt-5 flex justify-center '>
        <div className='flex flex-row items-center rounded-lg shadow-lg background-gradient'>
          <div className='py-2 px-20 text-center'>
            <img src={CarIcon} alt='car' className='text-sm' />
            <p className='text-sm font-normal'>
              {carJourney?.distance &&
                (carJourney.distance / 1000).toFixed(2).replace('.', ',')}{' '}
              km
            </p>
          </div>
          <div className='py-2 px-20 text-center'>
            <img src={BusIcon} alt='bus' className='text-sm' />
            <p className='text-sm font-normal'>
              {trainJourney?.distance &&
                (trainJourney.distance / 1000)
                  .toFixed(2)
                  .replace('.', ',')}{' '}
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
              {carJourney?.carbonEmission &&
                carJourney.carbonEmission.toFixed(2)}{' '}
              kg
            </p>
            <p className='text-xs'>CO2 / Jahr</p>
          </InfoCard>

          <InfoCard className='bg-vendorOrange text-white'>
            <div className='flex align-middle justify-start'>
              <img src={VVSLogo} alt='vvs-logo' className='text-sm mr-[6px]' />
              <p className='text-sm font-semibold'>VVS Abo</p>
            </div>
            <p className='mt-2 text-xl font-bold'>
              {trainJourney?.carbonEmission &&
                trainJourney.carbonEmission.toFixed(2)}{' '}
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
