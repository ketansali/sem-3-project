import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailValClass, setEmailValClass] = useState("d-none");
  const [passwordValClass, setPasswordValClass] = useState("d-none");
  const [firstNameValClass, setFirstNameValClass] = useState("d-none");
  const [lastNameValClass, setLastNameValClass] = useState("d-none");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    if (firstName == "") {
      setFirstNameValClass("d-block");
    } else {
      setFirstNameValClass("d-none");
    }
    if (lastName == "") {
      setLastNameValClass("d-block");
    } else {
      setLastNameValClass("d-none");
    }
    if (email == "") {
      setEmailValClass("d-block");
    } else {
      setEmailValClass("d-none");
    }
    if (password == "") {
      setPasswordValClass("d-block");
    } else {
      setPasswordValClass("d-none");
    }

    dispatch(signup(user));
    
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <span className={firstNameValClass} id="lblEmail">
                    firstName is Required
                  </span>
                </Col>

                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <span className={lastNameValClass} id="lblEmail">
                    lastName is Required
                  </span>
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={emailValClass} id="lblEmail">
                Email Id is Required
              </span>
              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={passwordValClass} id="lblEmail">
                Password is Required
              </span>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
