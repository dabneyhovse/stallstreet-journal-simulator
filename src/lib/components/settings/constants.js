import { Vector3 } from 'three';

export const wallDimensions = {
    front: { width: 0.19*2+0.1/2, height: 1.22-0.35+0.14/2 },
    left: { width: 0.27+0.29+0.1, height: 1.22-0.35+0.14/2 },
    right: { width: 0.27+0.29+0.1, height: 1.22-0.35+0.14/2 },
    back: { width: 0.25+0.23, height: 1.27-0.9+0.14 }
};

export const wallOffsets = {
    front: new Vector3(0.19+0.1/2, 0.35-0.14/2, 0.62),
    left: new Vector3(0.27, 0.35-0.14/2, -0.45+0.1),
    right: new Vector3(-0.29, 0.35-0.14/2, 0.55+0.1/2),
    back: new Vector3(-0.25-0.1/2, 0.9-0.14/2, -0.53)
};

export const sizeMapping = {
    small: [0.1, 0.14],
    medium: [0.2, 0.28],
    medium_landscape: [0.28, 0.2],
    large: [0.3, 0.42]
};

export let blockPlacingAreas = {
    front: [],
    left: [ 
        { centerU: 0.15, centerV: 0.15, width: 0.3, height: 0.3 } // toilet
    ],
    right: [ 
        { centerU: 0.15, centerV: 0.15, width: 0.3, height: 0.3 } // toilet
    ],
    back: []
};