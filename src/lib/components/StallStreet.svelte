<script>
    import { T } from '@threlte/core';
    import { onMount } from 'svelte';
    import { TextureLoader } from 'three';
    import { interactivity } from '@threlte/extras'
    import { getScaledDimensions } from './utils';
    interactivity()

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let pages = [];  // URL of the texture image
    export let size = 'small';  // Size of the poster: 'small', 'medium', 'large'
    export let position = [0, 0, 0]; // [x, y, z] position in 3D space
    export let direction = 0;    // Rotation around the Y-axis

    let textures = [null];
    let finalSizes = [{width: 0.1, height: 0.14}]; // Default size if no size specified
    let textureSizes = [];

    let color = 0x959595;

    const id = Math.random().toString(36).substring(7);
    const loader = new TextureLoader();

    onMount(() => {
        for (let i = 0; i < pages.length; i++) {
            loader.load("ssj/" + pages[i], (loadedTexture) => {
                textures[i] = loadedTexture;
                textureSizes[i] = {width: loadedTexture.image.width, height: loadedTexture.image.height};
                finalSizes[i] = getScaledDimensions(textureSizes[0].width, textureSizes[0].height, size)
            }, undefined, (error) => {
                console.error('Error loading texture:', error);
            });
        }
    });

</script>

<T.Group position={position} rotation={[0, direction, 0]}>
    <T.Mesh
      on:click={() => {
        dispatch('stallstreet', { pages, textureSizes });
      }}
      on:pointerenter={(e) => {
        color = 0x009500
      }}
      on:pointerleave={(e) => {
        color = 0x959595
      }}
    >
        <T.BoxGeometry args={[finalSizes[0].width, finalSizes[0].height, 0.001]} />
        <T.MeshBasicMaterial 
            map={textures[0]} 
            color={color}
        />
    </T.Mesh>
</T.Group>