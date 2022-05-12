import React from 'react'
import { useTable } from "react-table";
import UserService from 'services/user.service';
import AuthService from 'services/auth.service';

function IncomingFriendRequests({ data }) {
  // Use the state and functions returned from useTable to build your UI

  const columns = React.useMemo(() => [{
    Header: 'Username',
    accessor: 'username'
  },
  ], []);

  const acceptFriendRequest = (target_uid) => {
    UserService.acceptFriendRequest(AuthService.getCurrentUser().uid, target_uid)
  }

  const rejectFriendRequest = (target_uid) => {
    UserService.rejectFriendRequest(AuthService.getCurrentUser().uid, target_uid)
  }

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "accept",
        Header: "Accept",
        Cell: ({ row }) => (
          <button onClick={() => acceptFriendRequest(row.values.username)}>
            Accept
          </button>
        ),
      },
      {
        id: "Reject",
        Header: "reject",
        Cell: ({ row }) => (
          <button onClick={() => rejectFriendRequest(row.values.username)}>
            Reject
          </button>
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

export default IncomingFriendRequests;