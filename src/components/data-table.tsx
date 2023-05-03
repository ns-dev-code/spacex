import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import Spacex, { SpacexProps } from './Spacex';

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<SpacexProps['selectedValue']>('all');
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const launchStatus = searchParams.get('launch-status');
    if (launchStatus !== null) {
      setSelectedValue(launchStatus as SpacexProps['selectedValue']);
    }
  }, [searchParams]);

  const handleSelectionChange = (event: any) => {
    const { value } = event?.target;
    setSelectedValue(value);
    const params = new URLSearchParams({ 'launch-status': value });
    setSearchParams(params);
  };

  // if (isLoading) return <h4>Loading...</h4>;

  const renderFilter = () => (
    <>
      <select value={selectedValue} onChange={handleSelectionChange}>
        <option value={'all'}>All Launches</option>
        <option value='upcoming'>Upcoming Launches</option>
        <option value={'true'}>Successfull Launches</option>
        <option value={'false'}>Failed Launches</option>
      </select>
    </>
  );

  return (
    <>
      <Box pt={0} position={'absolute'} right={'120px'} top={'50px'}>
        <FilterList />
        {renderFilter()}
      </Box>
      <Box px={16} mt={16}>
        <Spacex selectedValue={selectedValue} />
      </Box>
    </>
  );
};

export default Example;
