import React, { Component } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Cards from "../../assets/components/Cards/Cards";
import "./listeServeurs.css";

class Liste extends Component {
  constructor(props) {
    super(props);
    this.state = { serveur: { tabServeur: [] } };
  }

  componentDidMount() {
    this.getDataServeurs();

    console.log("localStorage.getItem()");
    console.log(localStorage.getItem("@idRestaurant"));
  }

  getDataServeurs = (e) => {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "GET",
      headers: headers,
      /*body: JSON.stringify(data),*/
    };

    fetch("https://back-end.osc-fr1.scalingo.io/client/getDataServeur", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          console.log(data);
          this.setState({ serveur: data });
          localStorage.setItem("restaurantName", data.restaurantName);
          localStorage.setItem("@idRestaurant", data._id);
        },

        (error) => {
          console.log(error);
        }
      );
  };
  saveIdRestaurant = () => {};
  display = () => {
    return this.state.serveur.tabServeur.map((element, index) => {
      return (
        <Container fluid>
          <Row className="rowTitre">
            <Col>
              <h3>Donnez un tip à</h3>
            </Col>
          </Row>
          <Row className="rowTitre2">
            <Col s={12}>
              <h3>{element.serveurName}</h3>
            </Col>
          </Row>
          <Row className="rowImage">
            <Col>
              <Image src={"https://back-end.osc-fr1.scalingo.io/" + element.serveurPicture} />
            </Col>
          </Row>
          <Row className="butTips">
            <Col>
              <Button
                onClick={() => {
                  const headers = new Headers({
                    "Content-Type": "application/json",
                  });
                  const data = {
                    email: element.serveurMail,
                  };
                  const options = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data),
                  };

                  fetch("https://back-end.osc-fr1.scalingo.io/client/emailServeur", options)
                    .then((response) => {
                      return response;
                    })
                    .then(
                      (data) => {
                        console.log(data);
                      },

                      (error) => {
                        console.log(error);
                      }
                    );
                  this.props.history.push({
                    pathname: "/Payment",
                  });
                }}
              >
                Donner un Pourboire
              </Button>
            </Col>
          </Row>
        </Container>
      );
    });
  };

  render() {
    return (
      <Container className="blocPrincipalClient">
        <Row className="vousEtes">
          <Col className="colLieu" s={12}>
            <img src="/logoTTT/map.png" />
            <h1 className="Titre">
              Lieu : {this.state.serveur.restaurantName}
            </h1>
          </Col>
        </Row>
        <Row>
          {" "}
          <Col className="colButton">
            <Button
              onClick={() => {
                const headers = new Headers({
                  "Content-Type": "application/json",
                });
                const data = {};
                const options = {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify(data),
                };

                fetch("https://back-end.osc-fr1.scalingo.io/client/emailServeur", options)
                  .then((response) => {
                    return response;
                  })
                  .then(
                    (data) => {
                      console.log(data);
                    },

                    (error) => {
                      console.log(error);
                    }
                  );
                this.props.history.push({
                  pathname: "/TipCommun",
                });
              }}
            >
              Donner à toute l'équipe !
            </Button>
          </Col>
        </Row>
        <Row className="display">
          <Col xs={12} s={12} md={4}>
            {this.display()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Liste;