import React, { useState } from "react";
import { useEffect } from "react";
import { useTable } from "react-table";
import AuthService from "services/auth.service";
import EventService from "services/event.service";

function AcceptedChallenges({ data, reloadData }) {

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

  const [result, setResult] = useState("")
  const [resolving, setResolving] = useState(false)
  const [eid, setEid] = useState("")

  const closeChallenge = () => {
    console.log()
    EventService.close(AuthService.getCurrentUser().uid, eid, result)
    setResolving(false)
    setEid("")
    setResult("")
    reloadData()
    const index = data.map(({ id }) => id).indexOf(eid)
    data.splice(index, 1)
  }

  useEffect(() => {
    setResolving(false)
    setEid("")
  }, [])

  const onChangeResult = (e) => {
    console.log("try changing to:" + e.target.value)
    setResult(e.target.value)
    console.log("changed to : " + result)
  }

  const showClosePanel = (id) => {
    setResolving(true)
    setEid(id)
    console.log("print test")
    console.log(eid)
    console.log(resolving)
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
            (<button onClick={() => showClosePanel(row.values.id)}>
              Finish
            </button>) : <div></div>

        ),
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
    <div>
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
      <div hidden={!resolving}>
        <p>Event id: {eid}</p>
        <input type="text" value={result} onChange={onChangeResult} placeholder="Result descriptoion"></input>
        <button onClick={closeChallenge} disabled={!resolving}>Close</button>
      </div>
    </div>
  );
}

export default AcceptedChallenges;