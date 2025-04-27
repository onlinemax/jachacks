import React from 'react';
import Image from 'next/image';

const Logo = ({ testId }) => (
  <figure className="" title="WISE" data-testid={testId}>
    <Image 
      src="/wise-logo.png"
      alt="WISE Logo"
      width={207}
      height={124}
      style={{ maxHeight: '50px', width: 'auto' }}
      priority
    />
  </figure>
);

export default Logo;
