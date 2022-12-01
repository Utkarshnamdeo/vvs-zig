import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import debounce from 'lodash.debounce';

import CarousalImage from '~/assets/header-slider-image.png';
import startIcon from '~/assets/icon-start.svg';
import destinationIcon from '~/assets/icon-destination.svg';
import SwitchIcon from '~/assets/icon-switch.svg';
import { SearchLocation, SearchLocationInput } from '~/components';
import { Location } from '~/types';
import { Texts } from '~/constants';
import { getLocation } from '~/api/operations';

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

  useEffect(() => {
    if (fromRef.current) {
      fromRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!fromStop) {
      setFromLocationList([]);
    }
    if (!toStop) {
      setToLocationList([]);
    }
  }, [fromStop, toStop, setFromLocationList, setToLocationList]);

  const debouncedFromLocationList = useMemo(() => {
    return debounce(async () => {
      try {
        setLoading(true);
        const data = await getLocation({ location: fromStop });
        setFromLocationList(data.locations as Location[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [fromStop]);

  useEffect(() => {
    return () => {
      debouncedFromLocationList.cancel();
    };
  }, []);

  useEffect(() => {
    if (fromStop) {
      debouncedFromLocationList();
    }
  }, []);

  const debouncedToLocationList = useMemo(() => {
    return debounce(async () => {
      try {
        setLoading(true);
        const data = await getLocation({ location: toStop });
        setToLocationList(data.locations as Location[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [toStop]);

  const handleFromStopChange = (event: any) => {
    setFromStop(event.target.value);

    if (!event.target.value || event.target.value.length < 2) return;

    debouncedFromLocationList();
  };

  const handleToStopChange = (event: any) => {
    setToStop(event.target.value);

    if (!event.target.value || event.target.value.length < 2) return;

    debouncedToLocationList();
  };

  return (
    <div className='pt-3'>
      {/* page heading */}
      <h3 className='text-lg tracking-normal font-semibold'>
        {Texts.startPage.heading}
      </h3>

      <div className='mt-8 flex justify-center flex-wrap-reverse gap-5'>
        {/* left carousal */}
        <aside className='rounded-lg overflow-hidden shadow-vendorShadow'>
          <img
            src={CarousalImage}
            alt='carousal image'
            className='h-full object-cover object-left'
          />
        </aside>

        {/* address search card */}
        <div className='flex flex-col space-between px-ten py-5 rounded-lg shadow-vendorShadow bg-white'>
          <h3 className='mt-ten px-ten font-semibold text-xl leading-6'>
            {Texts.startPage.searchCardTitle}
          </h3>

          <p className='py-1 px-ten font-semibold text-slate-500'>
            <sub>{Texts.startPage.searchCardSubtitle}</sub>
          </p>

          <div className='relative'>
            {/* start stop field */}
            <SearchLocation
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
                onChange={handleFromStopChange}
                placeholder='von : Ort, Haltestelle, Adresse, POI'
                type='search'
                id='from-search'
                required
              />
            </SearchLocation>

            {/* destination stop field */}
            <SearchLocation
              locations={toLocationList}
              getLocationId={(location: Location) => {
                setToStop(location.disassembledName || location.name);
                setToLocationList([]);
                setToLocation(location);
              }}
              loading={loading}
              icon={destinationIcon}
              isDestination={true}
            >
              <SearchLocationInput
                name='to'
                ref={toRef}
                value={toStop}
                onChange={handleToStopChange}
                placeholder='nach : Ort, Haltestelle, Adresse, POI'
                type='search'
                id='to-search'
                required
              />
            </SearchLocation>

            {/* switch button */}
            <div className='absolute right-0 top-14 cursor-pointer'>
              <a onClick={() => console.log('switch places')}>
                <img src={SwitchIcon} alt='switch icon' />
              </a>
            </div>
          </div>

          <button
            className='font-semibold mt-7 leading-5 text-center text-white bg-vendorOrange rounded py-3 px-36 disabled:cursor-not-allowed'
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
