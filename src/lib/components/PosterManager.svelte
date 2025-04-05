<script>
    import StallStreet from './StallStreet.svelte';
    import { getScaledDimensions, checkOverlap, getRandomElement } from './utils';
    import { TextureLoader, Vector3 } from 'three';
    import { wallOffsets, wallDimensions, sizeMapping, blockPlacingAreas } from './settings/constants'
    import BiggerPicture from 'bigger-picture';
    import "bigger-picture/css";

    let bp = BiggerPicture({
        target: document.body,
    })

    function showStallStreet(pages, textureSizes) {
        bp.open({
            items: pages.map((page, i) => ({
                img: "ssj/" + page,
                width: textureSizes[i].width,
                height: textureSizes[i].height
            })),
            intro: 'fadeup'
        })
    }

    let placedRectangles = blockPlacingAreas;

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
                position = new Vector3(0, v, -u);
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
        const { id, title, size, pages } = poster;
        if (!pages || pages.length === 0) {
            console.warn(`Poster with id ${id} has no pages.`);
            return;
        }
        const texture = "ssj/" + pages[0];
        const wall = getRandomElement(['left', 'right', 'front', 'back']);
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
                        pages,
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
                                pages,
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
        pages={poster.pages}
        size={poster.size}
        position={poster.position}
        direction={poster.rotation}
        on:stallstreet={({ detail }) => {
            showStallStreet(detail.pages, detail.textureSizes);
        }}
    />
{/each}