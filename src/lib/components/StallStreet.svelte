<script>
    import { T } from '@threlte/core'

    export let size = [8.5, 11]
    export let direction = 0
    export let position = [0, 0, 0]

    function randomColor() {
        return `hsl(${Math.random() * 360}, 100%, 50%)`
    }
</script>

<T.Group position={position} rotation={[0, direction, 0]}>
    <T.Mesh>
        <T.BoxGeometry 
            args={[size[0], size[1], 0.001]}
        />
        <T.MeshStandardMaterial 
            color={randomColor()}
        />
    </T.Mesh>
</T.Group>