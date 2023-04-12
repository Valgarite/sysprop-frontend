import React, { useState } from 'react';

function Faq() {
  const [visibleAnswer, setVisibleAnswer] = useState(null);

  const toggleAnswer = (index) => {
    if (visibleAnswer === index) {
      setVisibleAnswer(null);
    } else {
      setVisibleAnswer(index);
    }
  };

  const faqs = [
    {
      question: '¿Cómo puedo realizar una compra?',
      answer: 'Para realizar una compra, debe seguir los siguientes pasos: 1. Inicie sesión en su cuenta, 2. Seleccione los productos que desea comprar, 3. Haga clic en el botón "Comprar", 4. Seleccione su método de pago y complete la información necesaria, 5. Confirme la compra. Si tiene algún problema durante el proceso, no dude en contactarnos.',
    },
    {
      question: '¿Cuánto tiempo tardará mi pedido en llegar?',
      answer: 'El tiempo de entrega de su pedido depende del método de envío que haya seleccionado. Si selecciona el envío estándar, el tiempo de entrega estimado es de 3 a 5 días hábiles. Si selecciona el envío express, el tiempo de entrega estimado es de 1 a 2 días hábiles. Tenga en cuenta que estos son tiempos estimados y pueden variar dependiendo de su ubicación y otras circunstancias externas.',
    },
    {
      question: '¿Cómo puedo hacer un seguimiento de mi pedido?',
      answer: 'Para hacer un seguimiento de su pedido, debe iniciar sesión en su cuenta y buscar la opción "Seguimiento de pedidos". Allí encontrará toda la información necesaria sobre el estado de su pedido y el número de seguimiento correspondiente.',
    },
    {
      question: '¿Puedo cancelar mi pedido después de haberlo realizado?',
      answer: 'Sí, puede cancelar su pedido antes de que sea enviado. Para hacerlo, debe contactarnos lo antes posible y proporcionar la información necesaria sobre su pedido. Si el pedido ya ha sido enviado, no podremos cancelarlo.',
    },
  ];

  return (
    <div id="cuerpoAyuda">
    <div  className="container">
      <h1>Preguntas frecuentes</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <div className="question" onClick={() => toggleAnswer(index)}>
            {faq.question}
          </div>
          {visibleAnswer === index && (
            <div className="answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  </div>
  );
}

export default Faq;