const COLUMNS_MY_ROUTINES = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Type",
    accessor: "kind_display",
    disableSortBy: true,
  },
  {
    Header: "",
    accessor: "pk",
    disableSortBy: true,
  },
];

const COLUMNS_DISCOVER = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Type",
    accessor: "kind_display",
    disableSortBy: true,
  },
  {
    Header: "Stars",
    accessor: "forks_count",
  },
  {
    Header: "",
    accessor: "pk",
    disableSortBy: true,
  },
];

export { COLUMNS_MY_ROUTINES, COLUMNS_DISCOVER };
