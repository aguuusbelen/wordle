import React, { useState, useEffect, useRef } from "react";
import "./wordle.css";
import wordleService from "./WordleService";

const Wordle = () => {
  const [letters, setLetters] = useState([
    { letra1: "", letra2: "", letra3: "", letra4: "", letra5: "" },
  ]);
  const [indexNextLetter, setIndexNextLetter] = useState(0);
  const [attempms, setAttemps] = useState(0);
  const [colores, setColores] = useState([{}]);
  const [finalizado, setFinalizado] = useState(false);
  const palabraCorrecta = "WORDL";
  const maxIntentos = 6;
  const [mensaje, setMensaje] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    if (
      inputRefs.current.length > 0 &&
      inputRefs.current.length > indexNextLetter
    ) {
      inputRefs.current[indexNextLetter].focus();
    }
  }, [letters]);

  const handleChange = (e, intentoIndex, letra) => {
    const { value } = e.target;
    if (value.match(/^[a-zA-Z]$/)) {
      const nuevosIntentos = [...letters];
      nuevosIntentos[intentoIndex][letra] = value.toUpperCase();
      setLetters(nuevosIntentos);

      setIndexNextLetter(indexNextLetter + 1);
    }
  };

  const verificar = async () => {
    const intentoActual = letters[letters.length - 1];
    await wordleService.postVerify(intentoActual).then((result) => {
      console.log(result);
    });
    if (Object.values(intentoActual).every((letra) => letra.length === 1)) {
      const resultadoArray = Array.from({ length: 5 }, (_, i) =>
        intentoActual[`letra${i + 1}`] === palabraCorrecta[i]
          ? "VERDE"
          : palabraCorrecta.includes(intentoActual[`letra${i + 1}`])
          ? "AMARILLO"
          : "GRIS"
      );
      const nuevosColores = [...colores];
      nuevosColores[letters.length - 1] = resultadoArray;
      setColores(nuevosColores);

      setAttemps(attempms + 1);
      if (resultadoArray.every((color) => color === "VERDE")) {
        setFinalizado(true);
        setMensaje(`¡GANASTE!<br />La palabra era: ${palabraCorrecta}`);
      } else if (letters.length === maxIntentos) {
        setFinalizado(true);
        setMensaje(
          "NO QUEDAN INTENTOS :(<br />La palabra era: " + palabraCorrecta
        );
      } else {
        setLetters([
          ...letters,
          { letra1: "", letra2: "", letra3: "", letra4: "", letra5: "" },
        ]);
      }
    }
  };

  return (
    <div className="wordle">
      <h1>Wordle</h1>
      {letters.map((intento, intentoIndex) => (
        <div className="inputs" key={intentoIndex}>
          {Object.keys(intento).map((letra, letraIndex) => (
            <input
              key={letraIndex}
              id={`${letra}-${intentoIndex}`}
              maxLength="1"
              value={intento[letra]}
              onChange={(e) => handleChange(e, intentoIndex, letra)}
              disabled={finalizado || intentoIndex < letters.length - 1}
              ref={(el) =>
                (inputRefs.current[intentoIndex * 5 + letraIndex] = el)
              }
              className={
                colores[intentoIndex] && colores[intentoIndex][letraIndex]
                  ? colores[intentoIndex][letraIndex].toLowerCase()
                  : ""
              }
            />
          ))}
        </div>
      ))}
      <button onClick={verificar} disabled={finalizado}>
        JUGAR
      </button>
      {mensaje && <p dangerouslySetInnerHTML={{ __html: mensaje }}></p>}
    </div>
  );
};

export default Wordle;
