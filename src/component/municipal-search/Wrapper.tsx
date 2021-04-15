import React, { useState } from 'react';
import Map from './Map';

const Wrapper: React.FC = () => {
  const [selectedMuni, setMuni] = useState<string|undefined>();
  return (
    <Map selectedMuni={selectedMuni} setMuni={setMuni} />
  );
};

export default Wrapper;
