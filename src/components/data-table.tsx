import React, { useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table';
import { Launches, useGetLaunchesQuery } from '../store/api/spacex/spacex-slice';
import { Box, Chip } from '@mui/material';
import CustomizedDialogs from './Modal';
import { FilterList } from '@mui/icons-material';
import Spacex from './Spacex';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const Example = () => {
  const [selectedValue, setSelectedValue] = useState<'all' | 'upcoming' | 'false' | 'true'>('upcoming');

  const handleSelectionChange = (event: any) => {
    setSelectedValue(event.target.value);
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
