"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatDate } from "./utils/formatDate";

type resultadoIMC = {
  imc: number;
  status: string;
};

type resultadoIMC2 = {
  imc: number;
  peso: number;
  altura: number;
  createdAt: string;
};

export default function Home() {
  const [peso, setPeso] = useState<number>(0);
  const [altura, setAltura] = useState<number>(0);
  const [resultado, setResultado] = useState<resultadoIMC>();
  const [data, setData] = useState<resultadoIMC2[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/imc")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, [resultado]);

  async function gravaDados() {
    fetch("http://localhost:3000/api/imc", {
      method: "POST",
      body: JSON.stringify({ peso, altura }),
    });
  }

  function calculoIMC(): void {
    try {
      gravaDados();
      setAltura(0);
      setPeso(0);
    } catch (error) {
      console.log(error);
    }
    const imc = peso / (altura * altura);
    if (imc < 18.5) return setResultado({ imc, status: "Abaixo do peso" });
    if (imc >= 18.5 && imc < 25)
      return setResultado({ imc, status: "Peso normal" });
    if (imc >= 25 && imc < 30)
      return setResultado({ imc, status: "Acima do peso" });
    if (imc >= 30 && imc < 35)
      return setResultado({ imc, status: "Obesidade grau I" });
    if (imc >= 35 && imc < 40)
      return setResultado({ imc, status: "Obesidade grau II" });
    if (imc >= 40) return setResultado({ imc, status: "Obesidade grau III" });
  }
  return (
    <div className="w-full h-screen bg-black">
      <div className="flex flex-col gap-4 items-center h-screen justify-center text-white">
        <h1 className="text-2xl font-bold">Calculadora IMC</h1>
        <form action="#">
          <div className="flex flex-col gap-2">
            <input
              onChange={(e) => {
                setPeso(+e.target.value);
              }}
              type="number"
              name="peso"
              id="peso"
              value={peso === 0 ? "" : peso}
              className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 placeholder:text-gray-800 border-2 border-green-600"
              placeholder="Informe o peso"
            />
            <input
              onChange={(e) => {
                setAltura(+e.target.value);
              }}
              type="number"
              name="altura"
              id="altura"
              value={altura === 0 ? "" : altura}
              className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 placeholder:text-gray-800 border-2 border-green-600"
              placeholder="Informe a altura"
            />
            <button
              type="button"
              className="px-6 py-2 rounded-md bg-green-600 transition-colors hover:bg-green-700"
              onClick={() => calculoIMC()}
            >
              Calcular
            </button>
          </div>
        </form>
        {data.length > 0 && (
          <div className="flex flex-col items-center gap-1 max-w-md border-[1px] shadow shadow-black/80 border-gray-900 p-8 rounded-lg">
            <h1 className="mb-2 text-xl">Resultados</h1>
            {resultado && (
              <div className="">
                <p className="">
                  Seu IMC é:{" "}
                  <span className="font-bold">
                    {resultado ? resultado.imc.toFixed(2) : ""}
                  </span>
                </p>
                <p className="text-center mb-4">{resultado?.status}</p>
              </div>
            )}
            <div className="z-50">
              {data.length > 0 ? (
                <>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="createdAt"
                      tickFormatter={(date: string) => formatDate(date)}
                    />
                    <YAxis domain={data.map((item) => item.peso)} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="peso" stroke="#8884d8" />
                  </LineChart>

                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="createdAt"
                      tickFormatter={(date: string) => formatDate(date)}
                    />
                    <YAxis domain={data.map((item) => item.imc)} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="imc" stroke="#82ca9d" />
                  </LineChart>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
