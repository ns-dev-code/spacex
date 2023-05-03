import React, { useEffect, useMemo, useState } from 'react';
import { Launches, useGetLaunchesQuery, useGetUpcomingLaunchesQuery } from '../store/api/spacex/spacex-slice';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Chip } from '@mui/material';
import CustomizedDialogs from './Modal';
import moment from 'moment';

export type SpacexProps = {
  selectedValue: 'all' | 'upcoming' | 'false' | 'true';
};

function Spacex(props: SpacexProps) {
  const { selectedValue } = props;
  const { data: spaceData, isLoading } = useGetLaunchesQuery(
    selectedValue === 'all'
      ? {}
      : {
          limit: 50,
          launch_success: selectedValue === 'true' ? true : false,
        },
  );
  const { data: upcomingData } = useGetUpcomingLaunchesQuery({ limit: 50, launch_type: 'upcoming' });
  const [launches, setLaunches] = useState<Launches[]>([]);
  const [launch, setLaunch] = useState<Launches>();

  useEffect(() => {
    if (spaceData && selectedValue !== 'upcoming') setLaunches(spaceData);
    else if (selectedValue === 'upcoming' && upcomingData) setLaunches(upcomingData);
  }, [spaceData, spaceData?.length, selectedValue, upcomingData, upcomingData?.length]);

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Launches>[]>(
    () => [
      {
        accessorKey: 'flight_number',
        header: 'No.',
      },
      {
        accessorKey: 'launch_date_utc',
        accessorFn: (data) => moment(data.launch_date_utc).format('Do MMMM YYYY @ H:mm'),
        header: 'Launched (UTC)',
      },
      {
        accessorKey: 'launch_site.site_name', //normal accessorKey
        header: 'Location',
      },
      {
        accessorKey: 'mission_name',
        header: 'Mission',
      },
      {
        id: 'orbit',
        accessorFn: (data) => data?.rocket?.second_stage?.payloads[0]?.orbit,
        header: 'Orbit',
      },
      {
        accessorKey: 'launch_success',
        accessorFn: (data) =>
          data.upcoming ? (
            <Chip variant='outlined' label='Upcoming' color='warning' />
          ) : data.launch_success ? (
            <Chip variant='outlined' label='Success' color='success' />
          ) : (
            <Chip variant='outlined' label='Failed' color='error' />
          ),
        header: 'Launch Status',
      },
      {
        accessorKey: 'rocket.rocket_name',
        header: 'Rocket',
      },
    ],
    [],
  );

  return (
    <>
      <MaterialReactTable
        enableTopToolbar={false}
        enableColumnFilters={false}
        enableColumnActions={false}
        enableSorting={false}
        columns={columns}
        data={launches}
        state={{ isLoading: isLoading }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            setLaunch(row.original);
          },
          sx: {
            cursor: 'pointer', //you might want to change the cursor too when adding an onClick
          },
        })}
      />
      {launch && <CustomizedDialogs data={launch} onClose={() => setLaunch(undefined)} />}
    </>
  );
}

export default Spacex;
