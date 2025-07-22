import './fondo_principal.css';

export default function Fondo({ className }) {
    return (
        <svg className={`fondo_principal ${className}`} width="1521" height="1145" viewBox="0 0 1521 1145" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_542_1953)">
                <path d="M1464.5 1071.5H453L1464.5 48.5V1071.5Z" fill="url(#paint0_linear_542_1953)" shapeRendering="crispEdges" />
                <path d="M1464.5 1071.5H453L1464.5 48.5V1071.5Z" stroke="#3D3F7F" shapeRendering="crispEdges" />
            </g>
            <g filter="url(#filter1_d_542_1953)">
                <path d="M309 780L29 1072.5H596.5L309 780Z" fill="#3D3F7D" fillOpacity="0.44" shapeRendering="crispEdges" />
                <path d="M309 780L29 1072.5H596.5L309 780Z" stroke="#3D3F7D" shapeRendering="crispEdges" />
            </g>
            <path d="M456.5 682.5L29 220V45H1131.5L456.5 682.5Z" fill="url(#paint1_linear_542_1953)" fillOpacity="0.76" stroke="#3D3F7D" />
            <g filter="url(#filter2_d_542_1953)">
                <path d="M1464.5 753.5L848.5 45H1464.5V753.5Z" fill="#3D3F7D" />
            </g>
            <defs>
                <filter id="filter0_d_542_1953" x="396.603" y="9.0832" width="1123.6" height="1135.12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="17" />
                    <feGaussianBlur stdDeviation="27.6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_542_1953" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_542_1953" result="shape" />
                </filter>
                <filter id="filter1_d_542_1953" x="0.629101" y="756.082" width="624.263" height="348.118" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="13.6" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_542_1953" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_542_1953" result="shape" />
                </filter>
                <filter id="filter2_d_542_1953" x="796.3" y="0.799999" width="720.4" height="812.9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="8" />
                    <feGaussianBlur stdDeviation="26.1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_542_1953" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_542_1953" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_542_1953" x1="1465" y1="72.4999" x2="439" y2="1071" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3D3F7D" />
                    <stop offset="1" stopColor="#6F72E3" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="paint1_linear_542_1953" x1="1168.5" y1="-12.5001" x2="266.5" y2="470" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3D3F7D" />
                    <stop offset="1" stopColor="#6F72E3" stopOpacity="0.06" />
                </linearGradient>
            </defs>
        </svg>
    );
}