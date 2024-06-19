import axios from "axios";
import React, { useState } from "react";

//You can't go left
//You can't go right
//You can't go up
//You can't go down
// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const [email, setEmail] = useState(initialEmail);
  const [activeSq, setActiveSq] = useState(initialIndex);
  const [stepCount, setStepCount] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);

  let x, y;
  if (activeSq >= 0 && activeSq <= 2) {
    x = activeSq + 1;
    y = 1;
  } else if (activeSq >= 3 && activeSq <= 5) {
    x = activeSq - 2;
    y = 2;
  } else if (activeSq >= 6 && activeSq <= 8) {
    x = activeSq - 5;
    y = 3;
  }

  function activeHandler(evt) {
    setMessage(initialMessage);
    const { id } = evt.target;
    if (id === "left") {
      if (!(activeSq % 3 === 0)) {
        setActiveSq(activeSq - 1);
        setStepCount(stepCount + 1);
      } else {
        setMessage("Sola gidemezsiniz");
      }
    } else if (id === "right") {
      if (!((activeSq + 1) % 3 === 0)) {
        setActiveSq(activeSq + 1);
        setStepCount(stepCount + 1);
      } else {
        setMessage("Sağa gidemezsiniz");
      }
    } else if (id === "up") {
      if (!(activeSq < 3)) {
        setActiveSq(activeSq - 3);
        setStepCount(stepCount + 1);
      } else {
        setMessage("Yukarıya gidemezsiniz");
      }
    } else if (id === "down") {
      if (!(activeSq > 5)) {
        setActiveSq(activeSq + 3);
        setStepCount(stepCount + 1);
      } else {
        setMessage("Aşağıya gidemezsiniz");
      }
    }
  }

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setActiveSq(initialIndex);
    setStepCount(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value);
  }

  async function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    axios
      .post("http://localhost:9000/api/result", {
        x: x,
        y: y,
        steps: stepCount,
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });
    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3
          id="coordinates"
          data-testid="coordinatesH3"
        >{`Koordinatlar (${x},${y})`}</h3>
        <h3 id="steps" data-testid="stepsH3">
          {stepCount} kere ilerlediniz
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === activeSq ? " active" : ""}`}
          >
            {idx === activeSq ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message" data-testid="messageH3">
          {message}
        </h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={activeHandler}>
          SOL
        </button>
        <button id="up" onClick={activeHandler}>
          YUKARI
        </button>
        <button id="right" onClick={activeHandler}>
          SAĞ
        </button>
        <button id="down" onClick={activeHandler}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={email}
          data-testid="email"
        ></input>
        <input id="submit" type="submit" data-testid="submitBtn"></input>
      </form>
    </div>
  );
}
