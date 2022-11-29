import { Link, Route, Router } from 'wouter';
import { Header } from '~/components';
import { StartPage, ResultPage } from '~/Pages';

import { Texts } from '~/constants';

export default function App() {
  return (
    <div className='h-screen'>
      <header className='flex justify-between sm:items-center px-4 py-3 bg-vendorOrange h-[78px]'>
        <Header />
      </header>
      <main className='h-[calc(100%-78px)] lg:h-[calc(100%-78px)] mx-auto sm:px-7 px-2'>
        <div className='py-5'>
          <p className='text-xs leading-8 tracking-normal font-semibold'>
            <Link to='/'> {Texts.app.breadCrumbStart}</Link> /{' '}
            {Texts.app.breadCrumbResult}
          </p>
        </div>
        <h1 className='text-5xl leading-5 tracking-normal font-bold h-14'>
          {Texts.app.heading}
        </h1>
        <Router>
          <Route path={'/'} component={StartPage} />
          <Route path={'/result/:from/:to'} component={ResultPage} />
        </Router>
      </main>
    </div>
  );
}
