import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";
import Card from "./Card";

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
      if (dt.status === "string") {
        array_todo.push(dt);
      }
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
    tasks["completada"] = array_completada;
    setTasks({
      ...tasks,
    });
  };

  const changeButton = (type) => {
    setSeleted(type);
  };

  // change status tarea
  const changeStatus = (type, data) => {
    if (type === "delete") {
      props.deleteTask(data.key);
    }

    if (type === "todo") {
      data["status"] = "todo";
      props.updateTask(data);
    }

    if (type === "haciendo") {
      data["status"] = "haciendo";
      props.updateTask(data);
    }

    if (type === "completada") {
      data["status"] = "completada";
      props.updateTask(data);
    }

    if (type === "edit") {
      props.editTask(data);
    }
  };

  const clasbutton =
    "inline-flex w-full justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  const classButtonActive =
    "inline-flex w-full justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  return (
    <Container>
      <Row className="mt-2">
        <Col sm={12} md={4} className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mt-4">
            Todos
            <i className="fas fa-hammer text-blue-500 text-2xl cursor-pointer mx-2"></i>
          </h1>
          {tasks.todo.map((todo, key) => (
            <Card todo={todo} changeStatus={changeStatus} />
          ))}
        </Col>
        <Col sm={12} md={4} className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mt-4">
            En proceso
            <i className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"></i>
          </h1>
          {tasks.haciendo.map((todo, key) => (
            <Card todo={todo} changeStatus={changeStatus} />
          ))}
        </Col>
        <Col sm={12} md={4} className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mt-4">
            Completadas
            <i className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"></i>
          </h1>
          {tasks.completada.map((todo, key) => (
            <Card todo={todo} changeStatus={changeStatus} key={key} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
