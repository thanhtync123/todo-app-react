
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Aside from "./components/Aside";
import Input from "./components/Input";
import Button from "./components/Button";
import Table from "./components/ui/Table";
import { useState } from "react";
function App() {
  const [cv, setCv] = useState<{ id: number; name: string; status: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleClick = () => {
    if (inputValue.trim() !== "") {
      setCv([...cv, { id: cv.length + 1, name: inputValue, status: "pending" }]);
      setInputValue("")
    }
  };
  const handleCheck = (id: number) => {
    setCv(cv.map(item =>
      item.id === id
        ? { ...item, status: item.status === "pending" ? "completed" : "pending" }
        : item
    ));
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTask, setEditTask] = useState<{ id: number; name: string; status: string } | null>(null);
  const handleEdit = (task: { id: number; name: string; status: string }) => {
    setEditTask(task);
    setIsEditOpen(true);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Aside />
          <div className="flex flex-col">
            <div className="flex gap-2 h-12 whitespace-nowrap">
              <label htmlFor="">Nhập việc</label>
              <Input
                type="text"
                placeholder="Nhập công việc"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="h-10"
              />
              <Button onClick={handleClick}>Thêm</Button>
            </div>
            <div>
              <Table
                columns={[
                  { key: "id", label: "ID" },
                  { key: "name", label: "Tên" },
                  { key: "status", label: "Tình trạng" }
                ]}
                data={cv}
                renderAction={(row, idx) => (
                  <div className="flex gap-2">
                    <input type="checkbox"
                      checked={row.status === "completed"}
                      onChange={() => handleCheck(row.id)} />
                    <Button>Xóa</Button>
                    <Button onClick={() => handleEdit(row as { id: number; name: string; status: string })}>Sửa</Button>
                  </div>
                )}
                renderCell={(row, col) => {
                  if (col.key === "status") {
                    if (row.status === "pending") {
                      return <span className="text-red-500 font-semibold">{row.status}</span>;
                    } else if (row.status === "completed") {
                      return <span className="text-green-500 font-semibold">{row.status}</span>;
                    }
                  }
                  return row[col.key];
                }}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
      {isEditOpen && editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="mb-4 font-bold">Chỉnh sửa công việc</h2>
            <input
              className="border p-2 w-full mb-2"
              value={editTask.name}
              onChange={e => setEditTask({ ...editTask, name: e.target.value })}
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={() => setIsEditOpen(false)}>Đóng</Button>
              <Button onClick={() => {
                setCv(cv.map(item => item.id === editTask.id ? editTask : item));
                setIsEditOpen(false);
              }}>Lưu</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default App;