import React, { useState } from "react";
import { useTable } from "react-table";
import AuthService from "services/auth.service";
import EventService from "services/event.service";

function AcceptedChallenges({ data }) {

  const [result, setResult] = useState("")

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
    EventService.close(AuthService.getCurrentUser().uid, eid, result)
  }

  const onChangeResult = (e) => {
    console.log("try changing to:" + e.target.value)
    setResult(e.target.value)
    console.log("changed to : " + result)
  }

  // Use the state and functions returned from useTable to build your UI
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Actions",
        Header: "Actions",
        Cell: ({ row }) => (
          row.values.uid == AuthService.getCurrentUser().uid ?
            (<button onClick={() => closeChallenge(row.values.id)}>
              Close
            </button>) : <div></div>

        ),
      },
      {
        id: "result",
        Header: "Result",
        Cell: ({ row }) => (row.values.uid === AuthService.getCurrentUser().uid ?
          <input type="text" onChange={(e) => onChangeResult(e)}></input> :
          <div></div>
        )
      }
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