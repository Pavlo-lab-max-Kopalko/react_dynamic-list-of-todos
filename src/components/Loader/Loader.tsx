import React, { useEffect, useState } from 'react';
import './Loader.scss';
import { wait } from '../../api';

export const Loader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = wait(300).then(() => setLoading(false));

    console.log(timer);
  }, []);

  console.log(loading);

  return (
    <div className="Loader" data-cy="loader">
      {loading && <div className="Loader__content" />}
    </div>
  );
};
