import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '50px', margin: 'auto', display: 'block', color: '#333' }}
      alt='Loading...'
    />
  </Fragment>
);