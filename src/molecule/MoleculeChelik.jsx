export const MoleculeChelik = ({molecule}) =>
    <group dispose={null}>
            <primitive object={molecule.bone}/>
            {molecule.skinnedMesh.map((child) =>
                <skinnedMesh
                    key={child.uuid}
                    uuid={child.uuid}
                    name={child.name}
                    geometry={child.geometry}
                    material={child.material}
                    skeleton={child.skeleton}
                />
            )}
    </group>
