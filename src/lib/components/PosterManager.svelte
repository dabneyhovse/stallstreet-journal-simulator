<script>
    import StallStreet from './StallStreet.svelte';
    import { getScaledDimensions, checkOverlap } from './utils';
    import { TextureLoader, Vector3 } from 'three';
    import BiggerPicture from 'bigger-picture';
    import "bigger-picture/css";

    let bp = BiggerPicture({
        target: document.body,
    })

    function showStallStreet(textureUrl, id, textureSize) {
        bp.open({
        items: [
            {
                img: encodeURIComponent(textureUrl),
                width: textureSize[0]*3,
                height: textureSize[1]*3,
            }
        ],
        intro: 'fadeup'
        })
    }

    const wallDimensions = {
        front: { width: 0.19*2+0.1, height: 1.22-0.35+0.14 },
        left: { width: 0.27+0.29+0.1, height: 1.22-0.35+0.14 },
        right: { width: 0.27+0.29+0.1, height: 1.22-0.35+0.14 },
        back: { width: 0.25+0.23+0.1, height: 1.27-0.9+0.14 }
    };

    const wallOffsets = {
        front: new Vector3(0.19+0.1/2, 0.35-0.14/2, 0.62),
        left: new Vector3(0.27, 0.35-0.14/2, -0.45+0.1),
        right: new Vector3(-0.29, 0.35-0.14/2, 0.55+0.1/2),
        back: new Vector3(-0.25-0.1/2, 0.9-0.14/2, -0.53)
    };

    const sizeMapping = {
        small: [0.1, 0.14],
        medium: [0.2, 0.28],
        large: [0.3, 0.42]
    };

    let placedRectangles = {
        front: [],
        left: [ { centerU: 0.15, centerV: 0.15, width: 0.3, height: 0.3 } ],
        right: [ { centerU: 0.15, centerV: 0.15, width: 0.3, height: 0.3 } ],
        back: []
    };

    export let posters = [];

    let calculatedPosters = [];

    function positionRotation_from_uv_wall(u, v, wall) {
        let position = new Vector3(0, 0, 0);
        let rotation = 0;

        switch (wall) {
            case 'front':
                position = new Vector3(-u, v, 0);
                position.add(wallOffsets[wall]);
                break;
            case 'left':
                position = new Vector3(0, v, u);
                position.add(wallOffsets[wall]);
                rotation = Math.PI / 2;
                break;
            case 'right':
                position = new Vector3(0, v, -u) + wallOffsets[wall];
                position.add(wallOffsets[wall]);
                rotation = Math.PI / 2;
                break;
            case 'back':
                position = new Vector3(u, v, 0);
                position.add(wallOffsets[wall]);
                break;
        }

        return { position: position.toArray(), rotation };
    }

    posters.forEach(poster => {
        const { texture, size, wall } = poster;
        const wallDim = wallDimensions[wall];

        const loader = new TextureLoader();
        loader.load(texture, (tex) => {
            const { width: textureWidth, height: textureHeight } = tex.image;
            const { width, height } = getScaledDimensions(textureWidth, textureHeight, size, sizeMapping);

            let placed = false;
            let trials = 3;

            // first let's try to place it randomly
            while (trials--) {
                let newRect = { centerU: width/2 + Math.random() * (wallDim.width-width/2), centerV: height/2 + Math.random() * (wallDim.height-height/2), width, height };
                if (!checkOverlap(newRect, placedRectangles[wall])) {
                    const { position, rotation } = positionRotation_from_uv_wall(newRect.centerU, newRect.centerV, wall);
                    calculatedPosters = [...calculatedPosters, {
                        texture,
                        size,
                        position,
                        rotation
                    }];
                    placedRectangles[wall] = [...placedRectangles[wall], newRect];
                    placed = true;
                    break;
                }
            }

            // if we couldn't place it randomly, let's try to place it systematically
            if (!placed) {
                for (let v = height / 2; v <= wallDim.height - height / 2; v += 0.01) {
                    for (let u = width / 2; u <= wallDim.width - width / 2; u += 0.01) {
                        let newRect = { centerU: u, centerV: v, width, height };

                        if (!checkOverlap(newRect, placedRectangles[wall])) {
                            const { position, rotation } = positionRotation_from_uv_wall(u, v, wall);
                            calculatedPosters = [...calculatedPosters, {
                                texture,
                                size,
                                position,
                                rotation
                            }];
                            placedRectangles[wall] = [...placedRectangles[wall], newRect];  
                            placed = true;
                            break;
                        }
                    }
                    if (placed) break;
                }
            }
        });
    });

</script>

{#each calculatedPosters as poster}
    <StallStreet
        textureUrl={poster.texture}
        size={poster.size}
        position={poster.position}
        direction={poster.rotation}
        on:stallstreet={({ detail }) => {
            showStallStreet(detail.textureUrl, detail.id, detail.textureSize);
        }}
    />
{/each}