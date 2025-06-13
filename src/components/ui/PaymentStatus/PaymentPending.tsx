import React from "react";

export const PaymentPending: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Pago pendiente ⏳</h1>
      <p>Tu pago está en proceso. Por favor espera mientras se confirma.</p>
    </div>
  );
};
