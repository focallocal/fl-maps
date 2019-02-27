import React from "react";
import { Container } from "reactstrap";

const index = () => {
  return (
    <Container className="mt-5">
      <h1> Whitepaper </h1>
      <iframe
        frameBorder={0}
        style={{
          height: "100vh",
          width: "100vh"
        }}
        src="https://docs.google.com/document/d/e/2PACX-1vQWx3ggon6Mp_-L5-7AurRshF2-qQB-YRlh9hUn9VijFRNtoKtHgn5uiilqihFUKoyBCcE5Rj0U759k/pub?embedded=true"
      />
    </Container>
  );
};

export default index;
