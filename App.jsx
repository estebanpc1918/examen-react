import { useState } from 'react';

function Juego() {
  const [tablero, setTablero] = useState(() =>
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 'oculto'))
  );
  const [ubicacionTesoro, setUbicacionTesoro] = useState(() => {
    const filaAleatoria = Math.floor(Math.random() * 5);
    const columnaAleatoria = Math.floor(Math.random() * 5);
    return [filaAleatoria, columnaAleatoria];
  });
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  const manejarClic = (fila, columna) => {
    if (juegoTerminado || tablero[fila][columna] !== 'oculto') return;

    if (fila === ubicacionTesoro[0] && columna === ubicacionTesoro[1]) {
      setJuegoTerminado(true);
      setTablero((prev) => {
        const nuevoTablero = prev.map((filaArr) => [...filaArr]);
        nuevoTablero[fila][columna] = 'tesoro';
        return nuevoTablero;
      });
    } else {
      setTablero((prev) => {
        const nuevoTablero = prev.map((filaArr) => [...filaArr]);
        nuevoTablero[fila][columna] = 'revisado';
        return nuevoTablero;
      });
    }
  };

  const reiniciarJuego = () => {
    setTablero(() =>
      Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 'oculto'))
    );
    setUbicacionTesoro(() => {
      const filaAleatoria = Math.floor(Math.random() * 5);
      const columnaAleatoria = Math.floor(Math.random() * 5);
      return [filaAleatoria, columnaAleatoria];
    });
    setJuegoTerminado(false);
  };

  const estilos = {
    contenedor: {
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
    },

    botonReiniciar: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      marginBottom: '20px',
    },

    botonHover: {
      backgroundColor: 'darkblue',
    },

    tablero: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 60px)',
      gridGap: '5px',
      justifyContent: 'center',
    },

    celda: {
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid black',
      cursor: 'pointer',
      fontSize: '18px',
    },

    celdaOculta: {
      backgroundColor: 'gray',
    },

    celdaRevisada: {
      backgroundColor: 'green',
      cursor: 'default',
    },

    celdaTesoro: {
      backgroundColor: 'yellow',
      color: 'black',
      fontWeight: 'bold',
      cursor: 'default',
    },

    mensajeVictoria: {
      marginTop: '20px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'green',
    },

  };

  return (
    <div style={estilos.contenedor}>
      <button
        style={estilos.botonReiniciar}
        onClick={reiniciarJuego}
        onMouseOver={(e) => (e.target.style.backgroundColor = 'darkblue')}
        onMouseOut={(e) => (e.target.style.backgroundColor = 'blue')}
      >
        Reiniciar Juego
      </button>
      <div style={estilos.tablero}>
        {tablero.map((fila, i) =>
          fila.map((celda, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                ...estilos.celda,
                ...(celda === 'oculto'
                  ? estilos.celdaOculta
                  : celda === 'revisado'
                  ? estilos.celdaRevisada
                  : estilos.celdaTesoro),
              }}
              onClick={() => manejarClic(i, j)}
            >
              {celda === 'tesoro' ? 'T' : ''}
            </div>
          ))
        )}
      </div>
      {juegoTerminado && (
        <p style={estilos.mensajeVictoria}>¡Felicidades! Encontraste el tesoro.</p>
      )}
    </div>
  );
}

export default Juego;
