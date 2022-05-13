import { render } from "@testing-library/react";
import React from "react";
import { useTable } from "react-table";
import AuthService from "services/auth.service";
import EventService from "services/event.service";
import './table.css'

function LocationEvents({ data, reloadData }) {

  console.log(data)

  const columns = React.useMemo(() => [{
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Creator',
    accessor: 'uid',
  },
  {
    Header: 'Description',
    accessor: 'notes',
  },
  // {
  //   Header: 'Location',
  //   accessor: "loc"
  // },
  {
    Header: 'Accepted',
    accessor: 'accepted-uids',
  },
  ], []);

  const acceptRequest = (event_id) => {
    EventService.accept(AuthService.getCurrentUser().uid, event_id)
    reloadData()
  }

  // Use the state and functions returned from useTable to build your UI
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          <button onClick={() => acceptRequest(row.values.id)}>
            Accept
          </button>
        ),
      },
    ]);
  };

  // const memoData = React.useMemo(() => data, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    }, tableHooks);

  // Render the UI for your table
  return (
    <table {...getTableProps()} border="1">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default LocationEvents;