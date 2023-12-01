import { useState, useEffect } from "react";
import { fetchDataIdPrograma } from "../../../data/sendRequest";
import { fetchDataIdTrimestre } from "../../../data/sendRequest";
import { registrarTematica } from "../../../data/sendRequest";

import { InputLabel } from "../../../../../../components/input/input";

export const FormTematica = () => {
  const [nombreTematica, setNombreTematica] = useState("");
  const [descripcionTematica, setDescripcionTematica] = useState("");
  const [estadoTematica, setEstadoTematica] = useState("");
  const [horasMaximasM, setHorasMaximasM] = useState("");
  const [horasMaximasS, setHorasMaximasS] = useState("");
  
  const [idTrimestreFK, setTrimestreFK] = useState({idTrimestre: []});
  const [idProgramaFK, setIdProgramaFK] = useState({ idPrograma: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleFetchDataIdTrimestre = async () => {
      try {
        setLoading(true);
        const response = await fetchDataIdTrimestre();
        setTrimestreFK(response);
      } catch (error) {
        console.error("Error en la peticion de id de programa", error);
        setError("Error al cargar id programa");
      } finally {
        setLoading(false);
      }
    };
    handleFetchDataIdTrimestre();
  }, []);

  useEffect(() => {
    const handleFetchDataIdPrograma = async () => {
      try {
        setLoading(true);
        const response = await fetchDataIdPrograma();
        setIdProgramaFK(response);
      } catch (error) {
        console.error("Error en la peticion de id de programa", error);
        setError("Error al cargar id programa");
      } finally {
        setLoading(false);
      }
    };
    handleFetchDataIdPrograma();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const tematicaData = {
        nombreTematica,
        descripcionTematica,
        horasMaximasM,
        horasMaximasS,
        idTrimestreFK,
        estadoTematica,
        idProgramaFK,
      };

      await registrarTematica(tematicaData);
      console.log("Tematica registrada exitosamente");
    } catch (error) {
      console.error("Error al resgistrar la tematica:", error.message);
    }
  };
  return (
    <>
      <h1 className="text-center text-2xl font-bold uppercase">
        Registrar Temática
      </h1>
      <form
        className="flex flex-col items-center justify-center w-[880px]"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-8 p-4 items-center justify-center gap-x-2 gap-y-2 mb-4 w-[100%]">
          <InputLabel
            col="4"
            label={"Nombre"}
            htmlId="nomTematica"
            value={nombreTematica}
            onChange={setNombreTematica}
            inputProps={{ id: "nomTematica" }}
          />
            <InputLabel
              col="8"
              label={"Descripción"}
              htmlId="descrip"
              value={descripcionTematica}
              onChange={setDescripcionTematica}
              inputProps={{ id: "descrip" }}
            />
          <select
            className="appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-md shadow-md outline-none border"
            value={estadoTematica}
            onChange={(e) => setEstadoTematica(e.target.value, 10)}
          >
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
          <InputLabel
            col="2"
            label={"Horas Mensuales"}
            htmlId="horasMaximasM"
            value={horasMaximasM}
            onChange={setHorasMaximasM}
            inputProps={{ id: "horasMaximasM" }}
          />
          <InputLabel
            col="2"
            label={"Horas Semanales"}
            htmlId="horasMaximasS"
            value={horasMaximasS}
            onChange={setHorasMaximasS}
            inputProps={{ id: "horasMaximasS" }}
          />
          <select
            className="appearance-none mt-4 col-span-4 text-lg text-gray-500 p-2 font-light rounded-md shadow-md outline-none border"
            value={idTrimestreFK}
            onChange={(e) => setTrimestreFK(e.target.value, 10)}
          >
            {
              nombreTematica.map((item) => (
                <option key={item.idTrimestre} value={item.idTrimestre}>
                  {item.nombreTrimestre}
                </option>
              ))
            }
          </select>
          {loading && <p>Cargando id de programa...</p>}
          {error && <p>Error: {error}</p>}
          <select
            className="appearance-none mt-4 col-span-8 text-lg text-gray-500 p-2 font-light rounded-md shadow-md outline-none border"
            value={idProgramaFK}
            onChange={(e) => setIdProgramaFK(e.target.value, 10)}
          >
            {nombreTematica.map((item) => (
              <option key={item.idPrograma} value={item.idPrograma}>
                {item.nombrePrograma}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-primary rounded-md text-center text-white shadow-md p-4"
          type="submit"
        >
          Registrar
        </button>
      </form>
    </>
  );
};