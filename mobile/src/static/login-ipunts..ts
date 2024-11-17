export const loginInputs = {
  name: {
    value: "",
    id: "name",
    name: "name",
    type: "name",
    placeholder: "name",
    validation: function (value: string) {
      return value.length > 2;
    },
    message: "o nome não pode ser vazio",
  },
  username: {
    value: "",
    id: "username",
    name: "username",
    type: "default",
    placeholder: "username",
    validation: function (value: string) {
      return value.length > 2;
    },
    message: "o username deve conter no minimo 4 caracters",
  },
  email: {
    value: "",
    id: "email",
    name: "email",
    type: "default",
    placeholder: "email@example.com",
    validation: function (value: string) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value.toLowerCase()
      );
    },
    message: "Favor informar um email válido",
  },
  password: {
    value: "",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Senha",
    validation: function (value: string) {
      return value.length > 5;
    },
    message: "a senha deve conter no minimo 6 caracters",
  },
  imgUrl: {
    value: "",
    id: "imgUrl",
    name: "imgUrl",
    type: "default",
    placeholder: "imgUrl",
    validation: function (value: string) {
      return value.length > 5;
    },
    message: "a senha deve conter no minimo 6 caracters",
  },
};
