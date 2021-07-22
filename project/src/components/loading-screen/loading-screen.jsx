import React from 'react';
import './spinner.css';

function LoadingScreen() {
  return (
    <div className="lds-circle" data-testid="loading-spinner"><div></div></div>
  );
}

export default LoadingScreen;
