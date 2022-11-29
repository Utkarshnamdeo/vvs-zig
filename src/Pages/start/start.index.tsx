import { useRef, useState } from 'react';
import { useLocation } from 'wouter';

import { SearchLocation, SearchLocationInput } from '~/components';
import { Location } from '~/types';
import { Texts } from '~/constants';

import CarousalImage from '~/assets/header-slider-image.png';
import startIcon from '~/assets/icon-start.svg';
import destinationIcon from '~/assets/icon-destination.svg';

const StartPage = () => {
  const [, setLocation] = useLocation();

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);

  const [fromStop, setFromStop] = useState<string>('');
  const [toStop, setToStop] = useState<string>('');

  const [toLocationList, setToLocationList] = useState<Array<Location>>([]);
  const [fromLocationList, setFromLocationList] = useState<Array<Location>>([]);

  const [loading, setLoading] = useState(false);

  return (
    <div className='pt-9'>
      <h3 className='text-lg leading-normal tracking-normal font-semibold'>
        {Texts.startPage.heading}
      </h3>

      <div className='mt-5 flex justify-center'>
        <aside className='rounded-sm overflow-hidden mx-3 my-0 h-min'>
          <img src={CarousalImage} alt='carousal image' />
        </aside>

        <div className='mx-3 my-0 flex p-5 rounded shadow-lg flex-col space-between bg-white'>
          <h3>{Texts.startPage.searchCardTitle}</h3>

          <p>
            <sub>{Texts.startPage.searchCardSubtitle}</sub>
          </p>

          <SearchLocation
            className='mt-7'
            locations={fromLocationList}
            getLocationId={(location: Location) => {
              setFromStop(location.disassembledName || location.name);
              setFromLocationList([]);
              setFromLocation(location);
            }}
            loading={loading}
            icon={startIcon}
          >
            <SearchLocationInput
              ref={fromRef}
              name='from'
              value={fromStop}
              onChange={() => console.log('from')}
              placeholder='von : Ort, Haltestelle, Adresse, POI'
              type='search'
              id='from-search'
              required
            />
          </SearchLocation>

          <div className='mt-2 mx-5 border-solid border-b-2 border-slate-300' />

          <SearchLocation
            locations={toLocationList}
            getLocationId={(location: Location) => {
              setToStop(location.disassembledName || location.name);
              setToLocationList([]);
              setToLocation(location);
            }}
            loading={loading}
            icon={destinationIcon}
          >
            <SearchLocationInput
              name='to'
              ref={toRef}
              value={toStop}
              onChange={() => console.log('to')}
              placeholder='nach : Ort, Haltestelle, Adresse, POI'
              type='search'
              id='to-search'
              required
            />
          </SearchLocation>

          <div className='mt-2 mx-5 border-solid border-b-2 border-slate-300' />

          <button
            className='font-bold mt-7 leading-5 text-center text-white bg-vendorOrange rounded py-3 px-36 disabled:cursor-not-allowed'
            onClick={() =>
              setLocation(`/result/${fromLocation?.id}/${toLocation?.id}`)
            }
            disabled={!fromLocation?.id || !toLocation?.id}
          >
            {Texts.startPage.searchButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
