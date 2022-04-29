import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { useForm } from "../util/hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function registerUser() {
    addUser();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full auth-form ">
      <div className="flex flex-col items-center content-center w-1/3 p-2 m-2 bg-white grid-col-1 rounded-xl h-2/3">
        <div className="w-auto h-12 p-2 m-2 text-lg">Sign Up</div>
        <form onSubmit={onSubmit} className="">
          <input
            type="text"
            className="block w-full p-3 mb-4 border rounded border-grey-light"
            name="username"
            placeholder="User Name"
            value={values.username}
            onChange={onChange}
          />
          <input
            type="text"
            className="block w-full p-3 mb-4 border rounded border-grey-light"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={onChange}
          />
          <input
            type="password"
            className="block w-full p-3 mb-4 border rounded border-grey-light"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={onChange}
          />
          <input
            type="password"
            className="block w-full p-3 mb-4 border rounded border-grey-light"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={onChange}
          />
          <button
            type="submit"
            className="w-full py-3 my-1 text-center text-white rounded bg-cyan-600 bg-green hover:bg-green-dark focus:outline-none"
          >
            {loading ? "loading" : "Create Account"}
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div>
            <ul>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
