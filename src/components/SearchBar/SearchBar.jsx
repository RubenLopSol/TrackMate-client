import { useState } from 'react';
import { Input } from 'antd';
function Search({filter}) {
  const [filtro, setFiltro] = useState ("")

  const filtroHandler = (e) => {
    setFiltro(e.target.value);
    filter(e.target.value) 
  }

  return (
    <>
      

      <label>Search</label>
      <Input value={filtro} type="text" onChange={filtroHandler} />

    </>
  );
}

export default Search;