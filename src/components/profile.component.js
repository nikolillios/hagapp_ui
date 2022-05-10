import { getByTestId } from '@testing-library/react';
import React, { Component, useState } from 'react';
import AuthService from "../services/auth.service";
import Table from './Table'
//import "react-table/react-table.css";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


export default function Profile() {

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
    Header: 'Status',
    accessor: 'status',
  },
  ]);

  const challenges = React.useMemo(() => [
    { id: "1", userEmail: "nikolillios09@gmail.com", description: "This is a challenge for you.", status: "open" },
    { id: "2", userEmail: "nikolillios09@gmail.com", description: "Another challenge.", status: "accepted" },
  ]);

  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        console.log('A Td Element was clicked!')
        console.log('it produced this event:', e)
        console.log('It was in this column:', column)
        console.log('It was in this row:', rowInfo)
        console.log('It was in this table instance:', instance)
      }
    }
  }

  return (
    <div className="container">
      <>
        <h1>Hello React!</h1>
        <div>
          <Table columns={columns} data={challenges} gettrprops={onRowClick} />
          <div>
          </div>
        </div>
      </>
    </div >
  );
}