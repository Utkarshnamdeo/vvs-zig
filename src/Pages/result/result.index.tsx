import CarIcon from '~/assets/car-icon.svg';
import BusIcon from '~/assets/bus-icon.svg';
import AutoIcon from '~/assets/auto-icon.svg';
import VVSLogo from '~/assets/vvs-logo.svg';
import { InfoCard } from '~/components';

const ResultPage = ({ params }: { params: { from: string; to: string } }) => {
  return (
    <div className='pt-9'>
      <h3>Pendeln in 210 Tagen mit Mittelklasse von</h3>

      <section className='mt-5 flex justify-center '>
        <div className='flex flex-row items-center rounded-lg shadow-lg background-gradient'>
          <div className='py-2 px-20 text-center'>
            <img src={CarIcon} alt='car' className='text-sm' />
            <p className='text-sm font-normal'>10 km</p>
          </div>
          <div className='py-2 px-20 text-center'>
            <img src={BusIcon} alt='bus' className='text-sm' />
            <p className='text-sm font-normal'>10 km</p>
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
            <p className='mt-2 text-xl font-bold'>10 kg</p>
            <p className='text-xs'>CO2 / Jahr</p>
          </InfoCard>

          <InfoCard className='bg-vendorOrange text-white'>
            <div className='flex align-middle justify-start'>
              <img src={VVSLogo} alt='vvs-logo' className='text-sm mr-[6px]' />
              <p className='text-sm font-semibold'>VVS Abo</p>
            </div>
            <p className='mt-2 text-xl font-bold'>10 kg</p>
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
