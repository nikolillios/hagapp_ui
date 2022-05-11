import React from "react";
import { useTable } from "react-table";

function FriendsTable({ data }) {
  // Use the state and functions returned from useTable to build your UI

  const columns = React.useMemo(() => [{
    Header: 'Username',
    accessor: 'username'
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  ], []);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          row.values.status == "pending" ?
            <button onClick={() => alert("editing: " + row.values.userEmail)}>
              Accept
            </button> :
            <p></p>
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

export default FriendsTable;