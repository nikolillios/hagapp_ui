import { render } from "@testing-library/react";
import React from "react";
import { useTable } from "react-table";

function SettledChallengesTable({ data }) {

  const columns = React.useMemo(() => [{
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'UserEmail',
    accessor: 'userEmail',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Result',
    accessor: 'result',
  },
  ], []);

  // Use the state and functions returned from useTable to build your UI
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          row.values.status == "open" ?
            (<button onClick={() => alert("editing: " + row.values.userEmail)}>
              Details
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

export default SettledChallengesTable;