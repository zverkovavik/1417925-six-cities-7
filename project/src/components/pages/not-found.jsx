import React from 'react';
import FooterLogo from '../parts/footer-logo';

function NotFoundScreen(props) {
  return (
    <>
      <main style={{marginTop: '100px', textAlign: 'center' }}>
        <h1>Ooops.. Error 404. We cannot find this page </h1>
        <p style={{fontSize: '24px' }}>  Press on the logo to return on the main page</p>
      </main>
      <FooterLogo />
    </>
  );
}
export default NotFoundScreen;
