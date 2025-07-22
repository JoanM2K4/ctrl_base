import Cuadrado from '../assets/shapes/menu_cuadrado';
import Logo from '../assets/logos/zylos';
function MenuEncabezado() {
  return (
    <div className="fondo_parcial w-60 h-14 flex items-end mb-4">
      <Logo/>
      <h1 className="text-2xl font-bold "><span className="text-zylos">Z</span>ylos</h1>
      <Cuadrado className={"fondo-svg"}/>
    </div>
  );
}

export default MenuEncabezado;