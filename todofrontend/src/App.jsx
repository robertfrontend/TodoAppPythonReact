import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";
import axios from "axios";

import "./App.css";
import Todos from "./Components/Todos";

function App() {
  const url = "http://127.0.0.1:8000";

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    status: "todo",
  });

  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/todos`);
      let array = [];
      response.data.data.map((data) => {
        array.unshift(data);
      });

      setData(array);
      setLoading(false);
    } catch (error) {
      alert("Ha ocurrido un error al traer las tareas");
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    const index = e.target.id;

    form[index] = value;
    setForm({ ...form });
  };

  const changePriority = (type) => {
    form["priority"] = type;
    setForm({ ...form });
  };

  const saveTodo = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`${url}/todos`, form);

      GetData();
      setLoading(false);

      setForm({
        priority: "",
        name: "",
        description: "",
        status: "todo",
      });
    } catch (error) {
      alert("Ha ocurrido un error al crear la tarea");
      setLoading(false);
    }

    console.log(form, "creando tarea");
  };

  const deleteTask = async (id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${url}/todos/${id}`);

      GetData();
      setLoading(false);
    } catch (error) {
      alert("Ha ocurrido un error al eliminar la tarea");
      setLoading(false);
    }

    console.log(id, "id a eliminar");
  };

  const updateTask = async (data) => {
    setLoading(true);

    try {
      await axios.put(`${url}/todos/?todo_id=${data.id}`, data);
      setLoading(false);

      // GetData();
    } catch (error) {
      alert("Ha ocurrido un error al actualizar la tarea");

      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-indigo-600">Todo app</h1>
        <p className="text-md font-semibold text-gray-700">
          Todo App, aplicacion hecha con React y{" "}
          <span className="text-green-500">
            Python<span className="text-green-600">(FastAPI)</span>
          </span>
        </p>
      </header>

      <div className="form ">
        <Container>
          <h1 className="text-3xl font-bold text-gray-600 mt-10">
            Crear tarea
          </h1>

          <Row
            align="center"
            justify="center"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <Col md={12} className="my-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Título
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nombre de la tarea"
                value={form.name}
                onChange={onChange}
              />
            </Col>
            <Col md={12} className="my-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                value={form.description}
                onChange={onChange}
                placeholder="Escribe una descripción de la tarea..."
              ></textarea>
            </Col>
            <Col md={12} className="my-3">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Prioridad
              </label>
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 rounded-l-md border
                 border-gray-300 bg-white text-sm font-medium text-gray-700
                  hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1
                   focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => changePriority("baja")}
              >
                Baja
              </button>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center
                 px-4 py-2 border border-gray-300 bg-white text-sm 
                 font-medium text-gray-700 hover:bg-gray-50 focus:z-10 
                 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => changePriority("media")}
              >
                Media
              </button>
              <button
                type="button"
                className="-ml-px relative inline-flex items-center 
                px-4 py-2 rounded-r-md border border-gray-300 bg-white
                text-sm font-medium text-gray-700 hover:bg-gray-50
                focus:z-10 focus:outline-none focus:ring-1 
                focus:ring-indigo-500 focus:border-indigo-500"
                onClick={() => changePriority("alta")}
              >
                Alta
              </button>
            </Col>
            <Col md={12}>
              <p className="text-red-400">Todos los campos son requeridos*</p>
            </Col>
            <Col className="mt-5">
              <button
                type="button"
                // disabled
                className="inline-flex w-full  justify-center items-center 
                px-6 py-3 border border-transparent
                 text-base font-medium rounded-md s
                 hadow-sm text-white bg-indigo-600
                  hover:bg-indigo-700 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 
                  focus:ring-indigo-500"
                onClick={() => saveTodo()}
              >
                Crear Tarea
              </button>
            </Col>
          </Row>

          <h1 className="text-3xl font-bold text-gray-600 mt-10">Mis Tareas</h1>

          {/* {!isloading && ( */}
          <Todos data={data} deleteTask={deleteTask} updateTask={updateTask} />
          {/* )} */}
          {isloading && (
            <div className="text-center">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
