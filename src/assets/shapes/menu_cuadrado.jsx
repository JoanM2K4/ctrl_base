import './menu_cuadrado.css';

export default function MenuCuadrado({ className }) {
    return (
        <svg className={`Menu_cuadrado ${className}`} width="253" height="88" viewBox="0 0 253 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_539_2057)">
                <path d="M56.3659 64L20 16H233V64H56.3659Z" fill="url(#paint0_linear_539_2057)" shapeRendering="crispEdges" />
            </g>
            <defs>
                <filter id="filter0_d_539_2057" x="0.5" y="0.5" width="252" height="87" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="9.75" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_539_2057" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_539_2057" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_539_2057" x1="233.173" y1="32.0777" x2="30.9402" y2="23.1835" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#383A46" />
                    <stop offset="1" stopColor="#4E556A" stopOpacity="0.29" />
                </linearGradient>
            </defs>
        </svg>
    );
}