import logo from '~/assets/vvs-logo.svg';

export const Header = () => {
  return (
    <div className='flex items-center justify-between px-6 py-3 sm:p-0 h-full w-full'>
      <button
        type='button'
        className='block text-white hover:text-gray-500 focus:outline-none h-full w-8'
      >
        <svg viewBox='132.487 104.644 18.031 18.024' className='fill-current'>
          <path
            fillRule='evenodd'
            d='M133.52 104.64h16c.77 0 1.25 1.08.86 1.94-.18.4-.51.64-.87.64h-16c-.77 0-1.24-1.07-.85-1.93.17-.4.5-.65.86-.65Zm-.03 7.73h16c.77 0 1.25 1.07.86 1.93-.18.4-.5.64-.86.64h-16c-.78 0-1.25-1.07-.86-1.93.17-.4.5-.64.86-.64Zm-.02 7.72h16c.77 0 1.24 1.08.85 1.94-.17.4-.5.64-.86.64h-16c-.77 0-1.17-1.17-.78-2.03.18-.4.43-.55.79-.55Z'
          />
        </svg>
      </button>
      <img className='h-12 w-12' src={logo} alt='zigzag' />
    </div>
  );
};
