import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-grid-system";

function Card(props) {
  //   console.log(props, "props klk paapa card");

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
    <Col xs={12} className={"mt-4 p-4 rounded-lg" + " " + seleted}>
      <div className="text-right">
        <i className="fas fa-edit text-gray-500 text-xl cursor-pointer mx-2"></i>
        <i
          className="fas fa-trash-alt text-red-500 text-xl cursor-pointer mx-2"
          onClick={() => props.changeStatus("delete", props.todo)}
        ></i>
      </div>
      <div className="content mb-2 text-left">
        <span className="text-2xl font-bold text-gray-800">
          {props.todo.name}
        </span>
        <p className="text-md font-semibold text-gray-700">
          {props.todo.description}
        </p>
        <p className="text-md font-semibold text-gray-700">
          Status: <span className="font-bold"> {props.todo.status} </span>
        </p>
        <p className="text-md font-semibold text-gray-700">
          Prioridad: <span className="font-bold"> {props.todo.priority} </span>
        </p>
      </div>
      {/* footer */}
      <div className="footer text-left">
        <Row align="start" justify="start">
          <Col>
            {props.todo.status === "todo" ? (
              ""
            ) : (
              <i
                className="fas fa-tasks text-blue-500 text-2xl cursor-pointer"
                onClick={() => props.changeStatus("todo", props.todo)}
              ></i>
            )}

            {props.todo.status === "haciendo" ? (
              ""
            ) : (
              <i
                className="fas fa-hammer text-yellow-500 text-2xl cursor-pointer mx-2"
                onClick={() => props.changeStatus("haciendo", props.todo)}
              ></i>
            )}
            {props.todo.status === "completada" ? (
              ""
            ) : (
              <i
                className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"
                onClick={() => props.changeStatus("completada", props.todo)}
              ></i>
            )}
            {/* {!props.todo.status === "completada" && (
              <i
                className="fas fa-check-square text-green-500 text-2xl cursor-pointer mx-2"
                onClick={() => props.changeStatus("completada", props.todo)}
              ></i>
            )} */}
          </Col>
        </Row>
      </div>
    </Col>
  );
}

export default Card;
