'use client'
import { useState, useEffect } from 'react';

interface Contador {
  id: number;
  nombre: string;
  color: string;
  valor: number;
}

const CounterDashboard = () => {
  const [contadores, setContadores] = useState<Contador[]>([]);

  useEffect(() => {
    fetch('/api/contadores')
      .then(res => res.json())
      .then(data => setContadores(data));
  }, []);

  const agregarContador = async () => {
    const nombre = prompt('Ingrese el nombre del contador:');
    const color = prompt('Ingrese un color en formato HEX (por ejemplo, #ff0000):');
    if (nombre && color) {
      const response = await fetch('/api/contadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, color }),
      });
      const nuevoContador = await response.json();
      setContadores([...contadores, nuevoContador]);
    }
  };

  const actualizarContador = async (id: number, valor: number) => {
    await fetch(`/api/contadores?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ valor }),
    });
    setContadores(contadores.map(contador => (contador.id === id ? { ...contador, valor } : contador)));
  };

  const eliminarContador = async (id: number) => {
    await fetch(`/api/contadores?id=${id}`, {
      method: 'DELETE',
    });
    setContadores(contadores.filter(contador => contador.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={agregarContador}>Agregar Contador</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {contadores.map(contador => (
          <div key={contador.id} className="flex flex-col items-center p-4 rounded-lg shadow-lg" style={{ backgroundColor: contador.color }}>
            <div className="flex items-center mb-2">
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => actualizarContador(contador.id, contador.valor - 1)}>-</button>
              <span className="mx-3 px-5 bg-gray-200 text-center rounded">{contador.nombre}: {contador.valor}</span>
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => actualizarContador(contador.id, contador.valor + 1)}>+</button>
            </div>
            <button onClick={() => eliminarContador(contador.id)}>
              <span className='relative inline-block overflow-hidden rounded-full p-[1px]'>
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-gray-50 backdrop-blur-3xl'>
                  Eliminar
                </div>
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterDashboard;
