<script>
  import { Collider, RigidBody } from '@threlte/rapier'
  import { T } from '@threlte/core'
  import Poop from './models/poop.svelte'

  export let position = undefined
  export let rotation = undefined

</script>


<T.Group
  position={position.toArray()}
  rotation={rotation.toArray()}
>
  <RigidBody
    type={'dynamic'}
  >
    <Collider
      shape={'ball'}
      args={[0.04]}
    />
    <Poop />
  </RigidBody>
</T.Group>