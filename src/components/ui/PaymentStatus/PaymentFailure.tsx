import React from "react";

export const PaymentFailure: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Pago fallido ❌</h1>
      <p>Hubo un problema con tu pago. Por favor, intenta nuevamente.</p>
    </div>
  );
};
