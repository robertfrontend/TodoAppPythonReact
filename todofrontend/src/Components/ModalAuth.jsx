/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Row, Col, Container } from "react-grid-system";
import { Dialog, Transition } from "@headlessui/react";
import { API } from "../utils/config";

export default function ModalAuth(props) {
  const [open, setOpen] = useState(props.open_modal_login);
  const [login, setLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setOpen(props.open_modal_login);
  }, [props]);

  const onChange = (e) => {
    const value = e.target.value;
    const index = e.target.id;

    form[index] = value;
    setForm({
      ...form,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/login", form);

      const data = response.data.data;

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("email", data.email);
      localStorage.setItem("localId", data.localId);
      props.setUserLoged();
      setOpen(false);
    } catch (error) {
      alert("error al iniciar sesion");
    }
  };

  const handleRegister = async () => {
    try {
      const response = await API.post("/register", form);
      setOpen(false);
    } catch (error) {
      alert("error al registrar usuarii");
    }
  };

  const onClose = () => {
    let t = open;
    setOpen((t = !t));
    props.closeModal();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {login ? (
                <>
                  <h1 className="text-xl font-semibold text-indigo-600">
                    Iniciar Sesion
                  </h1>
                  <Row>
                    <Col md={12} className="my-3">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Correo/Usuario
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Nombre de usuario o correo"
                        value={form.email}
                        onChange={onChange}
                      />
                    </Col>
                    <Col md={12} className="my-3">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="*********"
                        value={form.password}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                  <a
                    href="#"
                    className="text-blue-600"
                    onClick={() => setLogin(false)}
                  >
                    Regisrarme
                  </a>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => handleLogin()}
                    >
                      Iniciar Sesion
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-xl font-semibold text-indigo-600">
                    Registrarme
                  </h1>
                  <Row>
                    <Col md={12} className="my-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Nombre de usuario o correo"
                        value={form.name}
                        onChange={onChange}
                      />
                    </Col>
                    <Col md={12} className="my-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Correo/Usuario
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Nombre de usuario o correo"
                        value={form.email}
                        onChange={onChange}
                      />
                    </Col>
                    <Col md={12} className="my-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Contraseña
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="*********"
                        value={form.password}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                  <a
                    href="#"
                    className="text-blue-600"
                    onClick={() => setLogin(true)}
                  >
                    Iniciar Sesion
                  </a>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={() => handleRegister()}
                    >
                      Regisrarme
                    </button>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
