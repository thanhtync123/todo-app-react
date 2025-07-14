type Column = { key: string; label: string; };
type TableProps = {
  columns: Column[];
  data: Record<string, any>[];
  renderAction?: (row: Record<string, any>, idx: number) => React.ReactNode;
  renderCell?: (row: Record<string, any>, col: Column) => React.ReactNode;
};

const Table = ({ columns, data, renderAction, renderCell }: TableProps) => (
  <table className="border w-full text-left">
    <thead>
      <tr>
        {columns.map((col, idx) => (
          <th key={idx} className="p-2 border">{col.label}</th>
        ))}
        {renderAction && <th className="p-2 border">Action</th>}
      </tr>
    </thead>
    <tbody>
      {data.map((row, idx) => (
        <tr key={idx}>
          {columns.map((col, cidx) => (
            <td key={cidx} className="p-2 border">
              {renderCell ? renderCell(row, col) : row[col.key]}
            </td>
          ))}
          {renderAction && (
            <td className="p-2 border">{renderAction(row, idx)}</td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;