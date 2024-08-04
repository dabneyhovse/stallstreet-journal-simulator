<script>
    import { T } from '@threlte/core';
    import { onMount } from 'svelte';
    import { TextureLoader } from 'three';

    export let textureUrl = '';  // URL of the texture image
    export let size = 'small';  // Size of the poster: 'small', 'medium', 'large'
    export let position = [0, 0, 0]; // [x, y, z] position in 3D space
    export let direction = 0;    // Rotation around the Y-axis

    let texture = null;
    let finalSize = [0.1, 0.14]; // Default size if no size specified

    // Size mapping (maximum dimensions)
    const sizeMapping = {
        small: [0.1, 0.14],
        medium: [0.2, 0.28],
        large: [0.4, 0.42],
    };

    onMount(() => {
        if (textureUrl) {
            const loader = new TextureLoader();
            loader.load(textureUrl, (loadedTexture) => {
                texture = loadedTexture;
                // Calculate the aspect ratio of the texture
                const aspectRatio = loadedTexture.image.width / loadedTexture.image.height;

                // Get the maximum dimensions for the specified size category
                const [maxWidth, maxHeight] = sizeMapping[size] || [0.1, 0.14];

                // Adjust the size to maintain the aspect ratio
                if (aspectRatio > 1) {
                    // Wider than tall
                    finalSize = [Math.min(maxWidth, maxWidth * aspectRatio), Math.min(maxHeight, maxWidth / aspectRatio)];
                } else {
                    // Taller than wide
                    finalSize = [Math.min(maxWidth, maxHeight * aspectRatio), Math.min(maxHeight, maxHeight / aspectRatio)];
                }
            }, undefined, (error) => {
                console.error('Error loading texture:', error);
            });
        } else {
            // Set final size based on the specified size category
            finalSize = sizeMapping[size] || [0.1, 0.14];
        }
    });


    function randomColor() {
        return Math.random() * 0xffffff;
    }
</script>

<T.Group position={position} rotation={[0, direction, 0]}>
    <T.Mesh>
        <T.BoxGeometry args={[finalSize[0], finalSize[1], 0.001]} />
        <T.MeshBasicMaterial 
            map={texture} 
            color={texture ? 0x959595 : randomColor()}
        />
    </T.Mesh>
</T.Group>