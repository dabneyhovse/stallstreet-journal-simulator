<script>
    import { T } from '@threlte/core'
    import StallStreet from './StallStreet.svelte'
</script>

<!-- Stall door -->
<StallStreet
    size={[.1, .14]}
    position={[0, .7, 0.62]}
    direction={0}
/>

<StallStreet
    size={[.1, .14]}
    position={[0, 1.22, 0.62]}
    direction={0}
/>

<StallStreet
    size={[.1, .14]}
    position={[0, 0.35, 0.62]}
    direction={0}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.19, .7, 0.62]}
    direction={0}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.19, .7, 0.62]}
    direction={0}
/>


<!-- Left wall -->
<StallStreet
    size={[.1, .14]}
    position={[0.27, .7, 0]}
    direction={Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.27, 1.22, 0]}
    direction={Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.27, 0.35, 0]}
    direction={Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.27, 0.7, 0.55]}
    direction={Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.267, 0.7, -0.45]}
    direction={Math.PI / 2}
/>


<!-- Right wall -->
<StallStreet
    size={[.1, .14]}
    position={[-0.29, .7, 0]}
    direction={3 * Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.29, 1.22, 0]}
    direction={3 * Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.29, 0.35, 0]}
    direction={3 * Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.29, 0.7, 0.55]}
    direction={3 * Math.PI / 2}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.29, 0.7, -0.45]}
    direction={3 * Math.PI / 2}
/>

<!-- Back wall -->
<StallStreet
    size={[.1, .14]}
    position={[0, .9, -0.53]}
    direction={Math.PI}
/>

<StallStreet
    size={[.1, .14]}
    position={[0, 1.27, -0.53]}
    direction={Math.PI}
/>

<StallStreet
    size={[.1, .14]}
    position={[0.23, .9, -0.53]}
    direction={Math.PI}
/>

<StallStreet
    size={[.1, .14]}
    position={[-0.25, .9, -0.53]}
    direction={Math.PI}
/>