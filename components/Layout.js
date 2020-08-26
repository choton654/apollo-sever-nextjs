import Head from 'next/head';
import React from 'react';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css'
        />
        <link
          href='http://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
      </Head>
      <div className='container'>{children}</div>
    </div>
  );
}

export default Layout;
