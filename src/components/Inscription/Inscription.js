import React, { Component } from "react";
import "./inscription.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/*import FormControl from "react-bootstrap/FormControl";*/

class Inscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: null,
      firstname: null,
      email: null,
      password: null,
      gender: null,
      age: null,
      adress: null,
      phone: null,
      cg: false,
    };
  }
  /* toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };*/
  /*fonction pour ecrire dans nos input*/
  change = (event) => {
    this.setState({
      [event.target.name]: event.target.value, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  checkboxchange = (event) => {
    this.setState({
      [event.target.name]: event.target.checked, // identifier Id de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  addNewRegister = (e) => {
    e.preventDefault();

    const data = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      age: this.state.age,
      adress: this.state.adress,
      phone: this.state.phone,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/register", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });

          if (responseObject.success === true) {
            alert(
              "Votre inscription a bien été prise en compte. Vous pouvez désormais accéder à votre compte"
            );
            this.props.history.push("/");
          } /* pour allez vers la page connexion une fois l'inscription done--success déclaré en back*/
        },

        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div className="bigBlocClient">
        <Container className="blocprincipalClient ">
          <Row className="creerInscr">
            <Col className="colInscr" xs={12} s={12} md={7}>
              <h1 className="TitreInscription">Créer mon compte </h1>
              <p className="sous-titre">
                Merci de remplir les informations ci-dessous pour finaliser la
                création de votre compte.
              </p>

              <Form className="form1">
                <Form.Group controlId="lastname">
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                    onChange={this.change}
                  />
                </Form.Group>
                <Form.Group controlId="firstname">
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                    onChange={this.change}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Control
                    type="mail"
                    placeholder="Email"
                    name="email"
                    onChange={this.change}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    onChange={this.change}
                  />
                </Form.Group>

                <Form className="form2">
                  <Form.Group controlId="gender">
                    <Form.Control
                      as="select"
                      type="text"
                      name="gender"
                      onChange={this.change}
                    >
                      <option>-</option>
                      <option>Femme (facultatif)</option>
                      <option>Homme (facultatif)</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="adress">
                    <Form.Control
                      type="text"
                      placeholder="Ville"
                      name="adress"
                      onChange={this.change}
                    />
                  </Form.Group>

                  <Form.Group controlId="phone">
                    <Form.Control
                      type="text"
                      placeholder="Téléphone"
                      name="phone"
                      onChange={this.change}
                    />
                  </Form.Group>
                  <Form.Group controlId="age">
                    <Form.Control
                      type="text"
                      placeholder="Age (facultatif)"
                      name="age"
                      onChange={this.change}
                    />
                  </Form.Group>
                </Form>

                <Form.Group controlId="formBasicCheckbox">
                  <Row style={{ marginLeft: "10px" }}>
                    <a
                      className="cgvLink"
                      href="/CGV_TIPTOTHANK.pdf"
                      target="_blanck"
                    >
                      CGU et CGV
                    </a>
                  </Row>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      className="checkboxCGU"
                      type="checkbox"
                      label="J'ai lu et j'accepte les CGU et CGV"
                    />
                  </Form.Group>
                </Form.Group>
              </Form>
              <Button
                className="buttonInscri"
                type="submit"
                onClick={this.addNewRegister}
              >
                S'inscrire
              </Button>
              <p className="annonce">
                *TIPOURBOIRE est responsable du traitement des données
                personnelles collectées sur ce site. Elles sont collectées aux
                fins de : l'exécution du contrat/vous informer de nos nouveautés
                et actualités/à des fins statistiques, les bases légales
                respectives des traitements pouvant être l'exécution du contrat,
                l'intérêt légitime, ou le consentement. Pour plus d'informations
                voir notre politique de confidentialité.
              </p>

              <br />
              <p>{this.state.message}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Inscription;
