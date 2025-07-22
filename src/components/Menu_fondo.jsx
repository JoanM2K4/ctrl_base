import Triangulos from '../assets/shapes/menu_triangulos';
import Cuadrado from '../assets/shapes/menu_cuadrado';
export default function FondoDecorativo({ children }) {
    return (
        <div className="fondo">
            {/* SVG decorativo de fondo */}
            <Triangulos className={"fondo-svg"}/>
            {/* Contenido recibido como children */}
            {children}
        </div>
    );
}