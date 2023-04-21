import "./Produtos.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Produtos = () => {
  const url = "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setProducts(json.products);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="containerProduct">
      <Slider {...settings2}>
        {products &&
          products.map((item, index) => (
            <div className="containeriphone" key={index}>
              <img src={item.photo} alt="" />

              <p className="plorem">
                {item.productName}
              </p>
              <p className="oldvalue">R$ {(item.price + 400) && formatCurrency(item.price + 400)}</p>
              <p className="newvalue">R$ {formatCurrency(item.price)}</p>
              <p className="valueparcel">  ou 2x de {(item.price / 2) && formatCurrency(item.price / 2)} sem juros</p>
              <p className="freight">Frete grátis</p>

              <button onClick={() => setOpenModal(item)}>Adicionar</button>
            </div>
          ))}
      </Slider>

      {openModal ? (
        <Modal onClose={() => setOpenModal(null)}>
          {
            <div>
              <img src={openModal.photo} alt="" />
              <div className="modalinfo">
                <h1>{openModal.productName}</h1>
                <p className="modalprice">R$ {openModal.price}</p>
                <p className="modaldescription">
                  {" "}
                  {openModal.descriptionShort}{" "}
                </p>
                <Link to={""}>Veja mais detalhes do produto</Link>
              </div>
            </div>
          }
        </Modal>
      ) : null}
    </div>
  );
};

export default Produtos;
