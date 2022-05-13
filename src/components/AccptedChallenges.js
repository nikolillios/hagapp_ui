import React from "react";
import { useTable } from "react-table";
import AuthService from "services/auth.service";
import EventService from "services/event.service";

function AcceptedChallenges({ data }) {

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
  {
    Header: 'Participants',
    accessor: 'accepted-uids',
  }
  ], []);

  const closeChallenge = (eid) => {
    EventService.close(eid)
  }

  // Use the state and functions returned from useTable to build your UI
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          row.values.uid == AuthService ?
            (<button onClick={() => closeChallenge(row.values.id)}>
              Accept
            </button>) : <div></div>

        ),
      },
    ]);
  };

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

export default AcceptedChallenges;