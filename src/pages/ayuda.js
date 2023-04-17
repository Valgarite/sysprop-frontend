import React, { useState , useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Faq() {
  const [visibleAnswer, setVisibleAnswer] = useState(null);

  const toggleAnswer = (index) => {
    if (visibleAnswer === index) {
      setVisibleAnswer(null);
    } else {
      setVisibleAnswer(index);
    }
  };

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  useEffect(()=>{
    Redireccion()
  },[])

  const faqs = [
    {
      question: '¿Cómo agregar un nuevo cliente?',
      answer: 'Para agregar un nuevo cliente, haz clic en la pestaña "Clientes" en la barra lateral. Luego, haz clic en el botón "Agregar cliente" y completa el formulario con el nombre, cédula, teléfono y dirección del nuevo cliente. Haz clic en el botón "Guardar" para agregar el cliente a la lista.',
    },
    {
      question: '¿Cómo agregar un nuevo usuario?',
      answer: 'Para agregar un nuevo usuario, haz clic en la pestaña "Usuarios" en la barra lateral. Luego, haz clic en el botón "Agregar usuario" y completa el formulario con el nombre, cédula, fecha de nacimiento, username, password y cargo del nuevo usuario. Haz clic en el botón "Agregar usuario" para agregar el usuario a la lista.',
    },
    {
      question: '¿Cómo agregar un nuevo producto al inventario?',
      answer: 'Para agregar un nuevo producto al inventario, haz clic en la pestaña "Inventario" en la barra lateral. Luego, haz clic en el botón "Agregar producto" y completa el formulario con el nombre, código, categoría, precio y cantidad del nuevo producto. Haz clic en el botón "Agregar producto" para agregar el producto al inventario.',
    },
    {
      question: '¿Cómo crear una nueva factura de venta?',
      answer: 'Para crear una nueva factura de venta, haz clic en la pestaña "Ventas" en la barra lateral. Luego, selecciona el cliente de la factura en la pestaña "Agregar Cliente" ingresando su nombre y cédula. En la pestaña "Agregar Productos", selecciona los productos que deseas vender y completa la cantidad. Los detalles de los productos seleccionados se mostrarán en la tabla con el precio y el total. En la pestaña "Monto total" se mostrará el monto total de la factura. Haz clic en el botón "Guardar" para crear la factura de venta.',
    },
  ];

  return (
    <>
      <Sidebar/>
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
    </>
  );
}

export default Faq;