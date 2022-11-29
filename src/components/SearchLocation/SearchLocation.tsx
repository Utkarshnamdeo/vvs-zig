import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';

import { Location, LocationType } from '~/types';

import poiIcon from '~/assets/poi.svg';
import locationIcon from '~/assets/location.svg';
import stopIcon from '~/assets/stop.svg';

const getLocationIcon = (type: LocationType) => {
  switch (type) {
    case 'poi':
      return poiIcon;
    case 'stop':
      return stopIcon;
    case 'location':
      return locationIcon;
    default:
      return poiIcon;
  }
};

export const SearchLocation = ({
  children,
  locations,
  getLocationId,
  loading,
  icon,
  className,
}: {
  children: ReactNode;
  locations: Location[];
  getLocationId: (location: Location) => void;
  loading: boolean;
  icon?: any;
  className?: string;
}) => {
  return (
    <div className={clsx(className, 'my-1')}>
      <div className='relative -mx-3'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <img src={icon} alt='start' className='w-5 h-5' />
        </div>
        {children}
        {locations.length > 0 && (
          <ul className='absolute border-[1px] border-solid	border-slate-300 rounded bg-white p-3 z-10 max-h-60 overflow-scroll shadow-lg w-full top-5'>
            {locations.map((location) => (
              <li
                key={location.id}
                className='border-b-[1px] border-solid border-slate-300 pt-4 pb-2'
              >
                <a
                  className='block cursor-pointer'
                  onClick={() => getLocationId(location)}
                >
                  <div className='flex items-start'>
                    <div className='flex-shrink-0 h-5 w-5 mr-2'>
                      <img
                        className='h-5 w-5 rounded-full'
                        src={getLocationIcon(location.type)}
                        alt=''
                      />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-900 leading-3'>
                        {location.disassembledName || location.name}
                      </span>
                      <span className='text-xs text-gray-500 leading-8'>
                        {location.parent.name}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const SearchLocationInput = forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements['input']
>(function input(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        props.className,
        'block w-full p-4 pl-10 text-sm text-gray-900 appearance-none bg-transparent mr-3 py-1 px-2 leading-tight focus:outline-none'
      )}
    />
  );
});
