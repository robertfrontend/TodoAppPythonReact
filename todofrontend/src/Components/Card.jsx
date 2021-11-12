import React, { useEffect, useState } from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";

function Card(props) {
  const [seleted, setSeleted] = useState("bg-blue-100");

  useEffect(() => {
    if (props.todo.status === "todo") {
      setSeleted("bg-blue-100");
    }

    if (props.todo.status === "haciendo") {
      setSeleted("bg-yellow-100");
    }

    if (props.todo.status === "completada") {
      setSeleted("bg-green-100");
    }
  }, [props]);

  return (
    <Col xs={12} className={"my-20 p-4 rounded-lg" + " " + seleted}>
      <div className="text-right">
        <a
          href="#formulario"
          onClick={() => props.changeStatus("edit", props.todo)}
        >
          <i className="fas fa-edit text-gray-500 text-xl cursor-pointer mx-2"></i>
        </a>
        <i
          className="fas fa-trash-alt text-red-500 text-xl cursor-pointer mx-2"
          onClick={() => props.changeStatus("delete", props.todo)}
        ></i>
      </div>
      <div className="content mb-2 text-left">
        <div className=" border-b-2 border-gray-200 border-opacity-20 py-1">
          <span className="text-2xl font-bold text-gray-800">
            {props.todo.name}
          </span>
        </div>
        <div className=" border-b-2 border-gray-200 border-opacity-20 py-1">
          <p className="text-md font-bold text-gray-700">
            Descripción:
            <span className="font-semibold"> {props.todo.description}</span>
          </p>
        </div>
        <p className="text-md font-bold text-gray-700 ">
          Prioridad:
          <span className="font-semibold mx-2">
            {props.todo.priority === "baja" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-300 text-gray-800">
                {props.todo.priority.toUpperCase()}
              </span>
            )}
            {props.todo.priority === "media" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-300 text-gray-800">
                {props.todo.priority.toUpperCase()}
              </span>
            )}
            {props.todo.priority === "alta" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-300 text-gray-800">
                {props.todo.priority.toUpperCase()}
              </span>
            )}
          </span>
        </p>
      </div>
      {/* footer */}
      <Actions className="footer p-1 text-center">
        <Row align="start" justify="start">
          <Col>
            {props.todo.status === "todo" ? (
              ""
            ) : (
              <i
                className="fas fa-tasks text-blue-500 text-xl cursor-pointer"
                onClick={() => props.changeStatus("todo", props.todo)}
              ></i>
            )}

            {props.todo.status === "haciendo" ? (
              ""
            ) : (
              <i
                className="fas fa-hammer text-yellow-500 text-xl cursor-pointer mx-2"
                onClick={() => props.changeStatus("haciendo", props.todo)}
              ></i>
            )}
            {props.todo.status === "completada" ? (
              ""
            ) : (
              <i
                className="fas fa-check-square text-green-500 text-xl cursor-pointer mx-2"
                onClick={() => props.changeStatus("completada", props.todo)}
              ></i>
            )}
          </Col>
        </Row>
      </Actions>
    </Col>
  );
}

const Actions = styled.div`
  position: absolute;
  bottom: -2em;
  left: 0;
  right: 0;
  width: 100%;
  i {
    background-color: #f5f5f5;
    padding: 0.6em 0.6em;
    border-radius: 100px;
    box-shadow: 0px 5px 10px #a7a7a7c7;
  }
`;

export default Card;
