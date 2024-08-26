<script>
  import { Suspense, Text } from '@threlte/extras'
  import Ssj from './models/ssj.svelte'
  import { T } from '@threlte/core'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls } from './stores.js'
  import LoadingScreen from './LoadingScreen.svelte'
  import PosterManager from './PosterManager.svelte'
  import posters from '$lib/stallstreets.json'
  import { tweened } from 'svelte/motion'
  import { onMount } from 'svelte'

  let cam

  let rotation = tweened(0)
  onMount(() => {
    // This function will update the rotation in a loop
    function spin() {
      rotation.update(r => r + 0.01)
      requestAnimationFrame(spin)
    }
    spin()
  })

  const EPS = 1e-5

</script>

<T.AmbientLight intensity={0} />
<T.HemisphereLight
  intensity={4}
/>

<T.Group>
  <T.PerspectiveCamera
    makeDefault
    fov={100}
    position={[0, .8, 0]}
    bind:ref={cam}
  >
    <CameraControls
      on:create={({ ref }) => {
        $cameraControls = ref
        $cameraControls.azimuthRotateSpeed = - 0.3 // negative value to invert rotation direction
        $cameraControls.polarRotateSpeed   = - 0.3 // negative value to invert rotation direction
        $cameraControls.truckSpeed = 10
        $cameraControls.dollySpeed = 0
        $cameraControls.setOrbitPoint(0, .8, EPS)
        $cameraControls.lookInDirectionOf(0, 1, 5)
      }}
    />
  </T.PerspectiveCamera>
</T.Group>

<Suspense final>
  <Text text={"Loading..."} position={[0, 1, 1]} rotation={[0, Math.PI+$rotation, 0]} anchorX="center" anchorY="middle" slot="fallback" />
  <Ssj />
  <PosterManager
    posters={posters} />
</Suspense>