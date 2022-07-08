

const TablesConfigs = {
  topStakersColums: [
    {
      field: 'staker_address',
      label: 'Staker'
    },
    {
      field: 'staked_amount',
      label: 'In staking'
    },
    {
      field: 'accured_interests',
      label: 'Accured rewards'
    },
    {
      field: 'interest_days',
      label: 'Staking period'
    }
  ],
  stakerActivityColumns: [
      {
        field: 'timestamp',
        label: 'Date'
      },
      {
        field: 'block_number',
        label: 'Block #'
      },
      {
        field: 'action',
        label: 'Action'
      },
      {
        field: 'amount',
        label: 'Amount'
      },
      {
        field: 'tx_hash',
        label: 'Transaction Hash',
      }
  ],
};


export default TablesConfigs;
