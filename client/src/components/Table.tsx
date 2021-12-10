import React from 'react';

// TODO: replace `any` with generics

export interface RowState {
  key?: string | number; // should not be optional; look up correct way to widen type
  isActive?: boolean;
  isThead?: boolean;
  rowData?: any; // rowdata
  structure?: Array<any>; // cell structure
}

const Row = ({
  key,
  isActive = false,
  isThead = false,
  rowData = {},
  structure = [],
}: RowState) => {
  return (
    <tr>
      {structure.map((Cell) => (
        <td className="border px-4 py-2">{Cell(rowData)}</td>
      ))}
    </tr>
  );
};

interface TableInterface {
  thead?: any;
  data: Array<RowState>;
  structure: Array<any>;
}

const Table = ({ thead = {}, data, structure }: TableInterface) => {
  console.log({ thead }, { data });
  return (
    <table className="table-auto">
      {thead !== undefined && (
        <thead className="bg-gray-100">
          <Row
            {...{
              key: 'table-head',
              isThead: true,
              rowData: { ...thead, isThead: true },
              structure,
            }}
          />
        </thead>
      )}
      <tbody>
        {data.map((rowData) => (
          <Row {...{ key: Object.values(rowData)[0], rowData, structure }} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
