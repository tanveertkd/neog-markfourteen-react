import React, {useState} from 'react';
import bgprimary from './img/bg-primary.svg';
import bgprimarydark from './img/bg-primary-dark.svg';
import modalloss from './img/loss.svg';
import modalprofit from './img/profit.svg';
import './App.css';

function App() {

  const [stockBoughtPrice, setStockBoughtPrice] = useState("");
  const [stockCurrentPrice, setStockCurrentPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const hideSection = () => {
    return "none";
  }

  const checkProfitLoss = () => {
    console.log(stockBoughtPrice, stockCurrentPrice, stockQuantity);
    const valid = inputValidator(stockBoughtPrice, stockCurrentPrice, stockQuantity);
    console.log(valid);

    if(valid){
      if(Number(stockBoughtPrice)<Number(stockCurrentPrice)){
        showProfit(stockBoughtPrice, stockCurrentPrice, stockQuantity);
      } else {
        showLoss(stockBoughtPrice, stockCurrentPrice, stockQuantity);
      }
    } else {
      const plPopup = document.querySelector(".pl-popup");
      const plText = document.querySelector("#pl-text");
      plPopup.style.display = "block";
      plText.style.padding = "1rem";
    }
  }

  const inputValidator = (bought, current, quantity) => {
    if(bought<1 || current<1 || quantity<1){
      return false;
    } 
    return true;
  }

  const popupModal = document.querySelector(".popup-modal");
  const popupModalContent = document.querySelector(".popup-modal-content");
  const popupModalProfit = document.querySelector(".popup-modal-img-profit");
  const popupModalLoss = document.querySelector(".popup-modal-img-loss");
  const popupModalText = document.querySelector(".popup-modal-text");
  const footer = document.querySelector(".footer");
  const heroHeader = document.querySelector(".hero-header");
  const primaryBgLight = document.querySelector(".bg-light");
  const primaryBgDark = document.querySelector(".bg-dark");

  const showProfit = (bought, current, quantity) => {
    popupModal.style.display = "block";
    popupModalProfit.style.display = "block";
    popupModalLoss.style.display = "none";

    const totalProfit = (Number(current)-Number(bought))*Number(quantity);
    const totalCost = Number(bought) * Number(quantity);
    const totalProfitInPercent = ((totalProfit/totalCost)*100).toFixed(2);

    popupModalText.innerText = "Your profits totalling to Rs "+totalProfit+" at "+totalProfitInPercent+"%";
  }

  const showLoss = (bought, current, quantity) => {
    popupModal.style.display = "block";
    popupModalProfit.style.display = "block";
    popupModalLoss.style.display = "none";

    const totalLoss = (Number(bought)-Number(current))*Number(quantity);
    const totalCost = Number(bought)*Number(quantity);
    const totalLossInPercent = ((totalLoss/totalCost)*100).toFixed(2);

    popupModalText.innerText = " Your losses totalling to "+totalLoss+" at "+totalLossInPercent+"%";

    if(totalLossInPercent>50){
      darkMode();
    }

  }

  const darkMode = () => {
    primaryBgLight.style.display = "none";
    primaryBgDark.style.display = "flex";
    footer.style.backgroundColor = "#475569";
    document.body.style.backgroundColor = "#F1F5F9";
    heroHeader.classList.add("hero-dark");
    popupModalContent.classList.add("popup-modal-content-dark");
  }

  const closePlPopup = () => {
    const plPopup = document.querySelector(".pl-popup");
    plPopup.style.display = "none";
  }

  const closeModalPopup = () => {
    popupModal.style.display = "none";
  }

  return (
    <div className="primary-container">
      <img src={bgprimary} className="primary-bg bg-light" alt="primary nav bg"/>
      <img src={bgprimarydark} className="primary-bg bg-dark" alt="primary nav dark bg"/>
      <nav className="navigation">
        <p>Stock Simulator</p>
      </nav>

      <div className="secondary-container">

        <header className="hero">
          <p className="hero-header">Check the profit and loss of your stock</p>
        </header>

        <input 
          type="number"
          id="input-price"
          placeholder="Stock bought at"
          onChange={(e) => setStockBoughtPrice(e.target.value)}>
        </input>

        <input 
          type="number"
          id="input-price"
          placeholder="Stock current price"
          onChange={(e) => setStockCurrentPrice(e.target.value)}>
        </input>

        <input 
          type="number"
          id="input-price"
          placeholder="Stock quantity"
          onChange={(e) => setStockQuantity(e.target.value)}>
        </input>

        <button id="input-btn"
          onClick={checkProfitLoss}>
          Check P&L
        </button>

        <div className="pl-popup"
          style={{display: hideSection()}}>
          <p id="pl-text">Invalid input 
            <button 
              id="pl-close-btn"
              onClick={closePlPopup}>
                x
              </button>
          </p>
        </div>

      </div>

      <div className="popup-modal"
        style={{display: hideSection()}}>
        <div className="popup-modal-content">
          <span 
            className="popup-modal-close-btn"
            onClick={closeModalPopup}>
              x
            </span>
          <img src={modalloss} className="popup-modal-img-loss popup-modal-img" alt="asset-loss" />
          <img src={modalprofit} className="popup-modal-img-profit popup-modal-img" alt="asset-profit" />
          <p className="popup-modal-text"></p>
        </div>
      </div>

      <footer className="footer">
        <div id="footer-header">Are your investments making gains?</div>
        <p>Check to see if your stocks are making any profit or loss! Just input the price you bought the stock at and its current price and check to see!</p>
        
        <div id="footer-socials">
            <ul className="footer-socials-list">
                <li>
                    <a className="footer-links" href="https://www.github.com"><i className="fab fa-github fa-lg social-icn"></i></a>
                </li>
                <li>
                    <a className="footer-links" href="https://www.linkedin.com"><i className="fab fa-linkedin fa-lg social-icn"></i></a>
                </li>
                <li>
                    <a className="footer-links" href="https://www.instagram.com"><i className="fab fa-instagram fa-lg social-icn"></i></a>
                </li>
            </ul>
            
        </div>

        <p id="footer-cc-text"><i className="far fa-copyright"></i> | 2021 Rights reserved</p>
    </footer>

    </div>

  );
}

export default App;
