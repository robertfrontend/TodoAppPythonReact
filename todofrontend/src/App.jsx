import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";
import axios from "axios";

import "./App.css";
import Todos from "./Components/Todos";
import ButtonsPriority from "./Components/ButtonsPriority";

function App() {
  // const url = "https://todopythonrobertfronted.herokuapp.com";
  const url = "http://127.0.0.1:8000";

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    status: "todo",
  });

  const [type_form, setTypeForm] = useState("create");

  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    setLoading(true);
    setData([]);
    try {
      const response = await axios.get(`${url}/tasks`);
      let array = [];
      response.data.data.map((data) => {
        array.unshift(data);
      });

      setData(array);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    const index = e.target.id;

    form[index] = value;
    setForm({
      ...form,
    });
  };

  const changePriority = (type) => {
    form["priority"] = type;
    setForm({
      ...form,
    });
  };

  const saveTodo = async () => {
    setLoading(true);

    if (
      form.priority === "" ||
      form.name === "" ||
      form.description === "" ||
      form.priority === ""
    ) {
      alert("Todos los campos deben de estar llenos");
      return;
    }

    try {
      const response = await axios.post(`${url}/tasks`, form);

      GetData();
      setLoading(false);

      setForm({
        priority: "",
        name: "",
        description: "",
        status: "todo",
      });
    } catch (error) {
      setLoading(false);
    }

    console.log(form, "creando tarea");
  };

  const deleteTask = async (id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${url}/tasks/${id}`);

      GetData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    console.log(id, "id a eliminar");
  };

  const updateTask = async (data) => {
    setLoading(true);

    try {
      await axios.put(`${url}/tasks/?todo_id=${data.id}`, data);
      setLoading(false);

      // GetData();
    } catch (error) {
      alert("Ha ocurrido un error al actualizar la tarea");

      setLoading(false);
    }
  };

  const editTask = (data) => {
    console.log(data, "edit task");

    setTypeForm("edit");

    setForm({
      priority: data.priority,
      name: data.name,
      description: data.description,
      status: data.status,
      key: data.key,
    });
  };

  const saveTodoEdit = async () => {
    setLoading(true);
    if (
      form.priority === "" ||
      form.name === "" ||
      form.description === "" ||
      form.priority === ""
    ) {
      alert("Todos los campos deben de estar llenos");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/tasks/?todo_id=${form.key}`,
        form
      );

      GetData();
      setLoading(false);

      setForm({
        priority: "",
        name: "",
        description: "",
        status: "todo",
      });

      setTypeForm("create");
    } catch (error) {
      setLoading(false);
      setTypeForm("create");
    }

    console.log(form, "creando tarea");
  };

  return (
    <div className="App">
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-indigo-600"> Todo app </h1>{" "}
        <p className="text-md font-semibold text-gray-700">
          Todo App, aplicacion hecha con React y{" "}
          <span className="text-green-500">
            Python <span className="text-green-600"> (FastAPI) </span>{" "}
          </span>{" "}
        </p>{" "}
      </header>
      <div className="form" id="formulario">
        <Container>
          <h1 className="text-3xl font-bold text-gray-600 mt-10">
            {type_form === "create" ? "Crear" : "Editar"} tarea{" "}
          </h1>
          <Row
            align="center"
            justify="center"
            style={{
              width: "100%",
              margin: "0 auto",
            }}
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
            {form.description && (
              <>
                <Col md={12} className="my-3">
                  <ButtonsPriority changePriority={changePriority} />
                </Col>
                <Col md={12} className="my-3">
                  {form.priority === "baja" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-300 text-gray-800">
                      {form.priority.toUpperCase()}
                    </span>
                  )}
                  {form.priority === "media" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-300 text-gray-800">
                      {form.priority.toUpperCase()}
                    </span>
                  )}
                  {form.priority === "alta" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-300 text-gray-800">
                      {form.priority.toUpperCase()}
                    </span>
                  )}
                </Col>
              </>
            )}
            {!form.description ||
              !form.name ||
              (!form.priority && (
                <Col md={12}>
                  <p className="text-red-400">
                    Todos los campos son requeridos *
                  </p>
                </Col>
              ))}
            <Col className="mt-5">
              {type_form === "create" ? (
                <button
                  type="button"
                  // disabled
                  className="inline-flex w-full  justify-center items-center 
                    px-6 py-3 border border-transparent text-base font-medium rounded-md s hadow-sm text-white bg-indigo-600 hover: bg-indigo-700 focus: outline-none focus: ring-2 focus: ring-offset-2 focus: ring-indigo-500 "
                  onClick={() => saveTodo()}
                >
                  Crear Tarea
                </button>
              ) : (
                <button
                  type="button"
                  // disabled
                  className="inline-flex w-full  justify-center items-center 
                    px-6 py-3 border border-transparent text-base font-medium rounded-md s hadow-sm text-white bg-indigo-600 hover: bg-indigo-700 focus: outline-none focus: ring-2 focus: ring-offset-2 focus: ring-indigo-500 "
                  onClick={() => saveTodoEdit()}
                >
                  Editar Tarea
                </button>
              )}
            </Col>
          </Row>
          <h1 className="text-3xl font-bold text-gray-600 mt-10">Mis Tareas</h1>
          {/* {!isloading && ( */}
          <Todos
            data={data}
            deleteTask={deleteTask}
            updateTask={updateTask}
            editTask={editTask}
          />
          {/* )} */}
          {isloading && (
            <div className="text-center">
              <div className="lds-ellipsis">
                <div> </div> <div> </div> <div> </div> <div> </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
