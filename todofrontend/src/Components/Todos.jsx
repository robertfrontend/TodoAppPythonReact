import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";

export default function Todos(props) {
  const [seleted, setSeleted] = useState("todo");

  const [tasks, setTasks] = useState({
    todo: [],
    haciendo: [],
    completada: [],
  });

  useEffect(() => {
    filtrarTasks();
  }, [props]);

  const filtrarTasks = () => {
    let array_todo = [];
    let array_haciendo = [];
    let array_completada = [];

    props.data.map((dt) => {
      if (dt.status === "todo") {
        array_todo.push(dt);
      }
      if (dt.status === "haciendo") {
        array_haciendo.push(dt);
      }
      if (dt.status === "completada") {
        array_completada.push(dt);
      }
    });

    tasks["todo"] = array_todo;
    tasks["haciendo"] = array_haciendo;
    tasks["dt"] = array_completada;
    setTasks({ ...tasks });
  };

  const changeButton = (type) => {
    setSeleted(type);
  };

  const changeStatus = (type, data) => {
    if (type === "delete") {
      props.deleteTask(data.id);
    }
  };

  const clasbutton =
    "inline-flex w-full justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  const classButtonActive =
    "inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return (
    <Container className="mt-10">
      <h1 className="text-3xl font-bold text-gray-600">Mis Tareas</h1>
      <Row className="mt-2">
        <Col className="text-center">
          <button
            type="button"
            className={seleted === "todo" ? classButtonActive : clasbutton}
            onClick={() => changeButton("todo")}
          >
            Todo
          </button>
        </Col>
        <Col className="text-center">
          <button
            type="button"
            className={seleted === "haciendo" ? classButtonActive : clasbutton}
            onClick={() => changeButton("haciendo")}
          >
            Haciendo
          </button>
        </Col>
        <Col className="text-center">
          <button
            type="button"
            className={
              seleted === "completado" ? classButtonActive : clasbutton
            }
            onClick={() => changeButton("completada")}
          >
            Completado
          </button>
        </Col>
      </Row>
      <Row style={{ width: "30%" }}>
        <h1 className="text-2xl font-bold text-gray-600 mt-4">
          {seleted.toUpperCase()}
          {seleted === "todo" && (
            <i className="fas fa-hammer text-blue-500 text-2xl cursor-pointer mx-2"></i>
          )}
          {seleted === "haciendo" && (
            <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"></i>
          )}
          {seleted === "completada" && (
            <i className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"></i>
          )}
        </h1>
        <>
          {seleted === "todo" &&
            tasks.todo.map((todo, key) => (
              <Col
                xs={12}
                className="mt-4 bg-blue-100 p-4 rounded-lg"
                key={key}
              >
                {/* content */}
                <div className="content mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {todo.name}
                  </span>
                  <p className="text-md font-semibold text-gray-700">
                    {todo.description}
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    Prioridad:{" "}
                    <span className="font-bold">{todo.priority}</span>
                  </p>
                </div>
                {/* footer */}
                <div className="footer ">
                  <Row align="start" justify="start">
                    <Col>
                      <i
                        className="fas fa-minus-circle text-red-500 text-2xl cursor-pointer"
                        onClick={() => changeStatus("delete", todo)}
                      ></i>
                      <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"></i>
                      {/* <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer"></i> */}
                      <i className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"></i>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}

          {seleted === "haciendo" &&
            tasks.haciendo.map((todo, key) => (
              <Col
                xs={12}
                className="mt-4 bg-yellow-100 p-4 rounded-lg"
                key={key}
              >
                {/* content */}
                <div className="content mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {todo.name}
                  </span>
                  <p className="text-md font-semibold text-gray-700">
                    {todo.description}
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    Prioridad:{" "}
                    <span className="font-bold">{todo.priority}</span>
                  </p>
                </div>
                {/* footer */}
                <div className="footer ">
                  <Row align="start" justify="start">
                    <Col>
                      <i
                        className="fas fa-minus-circle text-red-500 text-2xl cursor-pointer"
                        onClick={() => changeStatus("delete", todo)}
                      ></i>
                      <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"></i>
                      {/* <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer"></i> */}
                      <i className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"></i>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}

          {seleted === "completada" &&
            tasks.completada.map((todo, key) => (
              <Col
                xs={12}
                className="mt-4 bg-green-100 p-4 rounded-lg"
                key={key}
              >
                {/* content */}
                <div className="content mb-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {todo.name}
                  </span>
                  <p className="text-md font-semibold text-gray-700">
                    {todo.description}
                  </p>
                  <p className="text-md font-semibold text-gray-700">
                    Prioridad:{" "}
                    <span className="font-bold">{todo.priority}</span>
                  </p>
                </div>
                {/* footer */}
                <div className="footer ">
                  <Row align="start" justify="start">
                    <Col>
                      <i
                        className="fas fa-minus-circle text-red-500 text-2xl cursor-pointer"
                        onClick={() => changeStatus("delete", todo)}
                      ></i>
                      <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"></i>
                      {/* <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer"></i> */}
                      <i className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"></i>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}
        </>
      </Row>
    </Container>
  );
}
