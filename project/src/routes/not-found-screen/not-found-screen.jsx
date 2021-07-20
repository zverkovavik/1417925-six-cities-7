import React from 'react';
import FooterLogo from '../../components/footer-logo/footer-logo';

function NotFoundScreen(props) {
  return (
    <>
      <main style={{marginTop: '100px', textAlign: 'center' }}>
        <h1>Ooops.. Error 404. Page not found.</h1>
        <p style={{fontSize: '24px' }}>Press on the logo to return on the main page</p>
      </main>
      <FooterLogo />
    </>
  );
}
export default NotFoundScreen;