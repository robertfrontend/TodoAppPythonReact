import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";
import axios from "axios";

import "./App.css";
import Todos from "./Components/Todos";
import ButtonsPriority from "./Components/ButtonsPriority";
import ModalAuth from "./Components/ModalAuth";
import { API } from "./utils/config";

function App() {
  const url = "https://todopythonrobertfronted.herokuapp.com";
  // const url = "http://127.0.0.1:8000";

  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    status: "todo",
  });

  const [type_form, setTypeForm] = useState("create");

  const [isloading, setLoading] = useState(false);
  const [open_modal_login, setModalLogin] = useState(false);
  const [userlogedd, setUserLoged] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    GetData();

    validateUser();
  }, []);

  const validateUser = () => {
    const user_token = localStorage.getItem("token");
    form.localId = localStorage.getItem("localId");
    form.email = localStorage.getItem("email");

    setUser(localStorage.getItem("email"));

    if (!user_token) {
      setModalLogin(true);
    }

    if (user_token) setUserLoged(true);
  };

  const GetData = async () => {
    setLoading(true);
    setData([]);

    const user_id = localStorage.getItem("localId");

    try {
      const response = await API.get(`/tasks/?user_id=${user_id}`);
      let array = [];
      response.data.data.map((data) => {
        array.push(data);
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

    if (!form.name || !form.description || !form.priority) {
      alert("Todos los campos deben de estar llenos");
      return;
    }
    form.localId = localStorage.getItem("localId");
    form.email = localStorage.getItem("email");

    try {
      await API.post(`/tasks`, form);

      GetData();
      setLoading(false);

      setForm({
        priority: "",
        name: "",
        description: "",
        status: "todo",
        email: form.email,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteTask = async (data) => {
    setLoading(true);

    try {
      await API.put(`/tasks_delete/?todo_id=${data.key}`, data);

      GetData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateTask = async (data) => {
    setLoading(true);

    try {
      await API.put(`/tasks/?todo_id=${data.key}`, data);
      setLoading(false);

      // GetData();
    } catch (error) {
      alert("Ha ocurrido un error al actualizar la tarea");

      setLoading(false);
    }
  };

  const editTask = (data) => {
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
    form.localId = localStorage.getItem("localId");
    form.email = localStorage.getItem("email");
    try {
      await API.put(`/tasks/?todo_id=${form.key}`, form);

      GetData();
      setLoading(false);

      setForm({
        priority: "",
        name: "",
        description: "",
        status: "todo",
        email: form.email,
      });

      setTypeForm("create");
    } catch (error) {
      setLoading(false);
      setTypeForm("create");
    }
  };

  const openModal = () => {
    const user_token = localStorage.getItem("token");
    if (!user_token) {
      let t = open_modal_login;
      setModalLogin((t = !t));
    }
  };

  const abandonar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("localId");
    setUserLoged(false);
    GetData();
  };

  const closeModal = () => {
    setModalLogin(false);
    GetData();
  };

  return (
    <div className="App">
      <ModalAuth
        open_modal_login={open_modal_login}
        closeModal={closeModal}
        setUserLoged={validateUser}
      />
      <Container>
        <Row className="pt-2">
          <Col xs={12} className="text-right">
            {userlogedd ? (
              <a
                href="#"
                className="text-gray-400 font-bold"
                onClick={() => abandonar()}
              >
                <i className="fas fa-sign-out-alt"></i> Salir de{" "}
                <span className="text-gray-500">{user}</span>{" "}
              </a>
            ) : (
              <a
                href="#"
                className="text-blue-600 font-bold"
                onClick={() => openModal()}
              >
                Iniciar Sesion <i className="fas fa-sign-out-alt"></i>
              </a>
            )}
          </Col>
        </Row>
      </Container>
      <header className="text-center py-4">
        <h1 className="text-3xl font-bold text-indigo-600"> Todo app </h1>{" "}
        <p className="text-md font-semibold text-gray-700">
          Todo App, aplicacion hecha con React y{" "}
          <span className="text-green-500">
            Python <span className="text-green-600"> (FastAPI) </span>{" "}
          </span>{" "}
        </p>{" "}
      </header>
      {userlogedd ? (
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
                    <ButtonsPriority
                      changePriority={changePriority}
                      priority={form.priority}
                    />
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
              <Col className="mt-5">
                {!form.name || !form.description || !form.priority ? (
                  <p className="text-red-400">
                    Todos los campos son requeridos *
                  </p>
                ) : (
                  <></>
                )}
                {type_form === "create" ? (
                  <button
                    type="button"
                    // disabled
                    className={
                      !form.name || !form.description || !form.priority
                        ? `inline-flex w-full  justify-center items-center 
                        px-6 py-3 border border-transparent text-base font-medium rounded-md 
                        shadow-sm text-gray-500 bg-gray-300 focus: outline-none`
                        : `inline-flex w-full  justify-center items-center 
                  px-6 py-3 border border-transparent text-base font-medium rounded-md 
                  shadow-sm text-white bg-indigo-600 hover: bg-indigo-700 focus: outline-none`
                    }
                    onClick={() => saveTodo()}
                  >
                    Crear Tarea
                  </button>
                ) : (
                  <button
                    type="button"
                    className={
                      !form.name || !form.description || !form.priority
                        ? `inline-flex w-full  justify-center items-center 
                        px-6 py-3 border border-transparent text-base font-medium rounded-md 
                        shadow-sm text-gray-500 bg-gray-300 focus: outline-none`
                        : `inline-flex w-full  justify-center items-center 
                  px-6 py-3 border border-transparent text-base font-medium rounded-md 
                  shadow-sm text-white bg-indigo-600 hover: bg-indigo-700 focus: outline-none`
                    }
                    onClick={() => saveTodoEdit()}
                  >
                    Editar Tarea
                  </button>
                )}
              </Col>
            </Row>
            <h1 className="text-3xl font-bold text-gray-600 mt-10">
              Mis Tareas
            </h1>
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
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl">
              Bienvenidos a Todo App, antes de entrar a la app primero debes de
              iniciar sesion o crear una cuenta🤗. Si no tienes cuenta no te
              preocupes , es muy facil crear una.
            </h1>
            <button
              type="button"
              className="inline-flex items-center 
              px-4 py-2 border border-transparent 
              text-sm font-medium rounded-md 
              shadow-sm text-white bg-blue-600 
              hover:bg-blue-700 focus:outline-none mt-5"
              onClick={() => openModal()}
            >
              Crear cuenta o Iniciar sesion
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
