import type { ReactElement } from 'react';
import React from 'react';

export default React.memo(function Spinner(): ReactElement {
  return (
    <div className='min-h-[250px] flex justify-center items-center'>
      <div className='border-[#bd10e0] w-20 h-20 rounded-full border-t-4 border-b-4 animate-spin'></div>
    </div>
  );
});
