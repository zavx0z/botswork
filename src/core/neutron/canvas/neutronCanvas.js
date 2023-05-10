import {types} from "mobx-state-tree"
import {Controller} from "@react-spring/three"
import {createRoot, events, extend} from "@react-three/fiber"
import * as THREE from "three"
import {PerspectiveCamera, Scene, WebGLRenderer} from "three"

extend(THREE)
const ConfCamera = types
    .model({
        fov: types.integer,
        near: types.integer,
        far: types.integer,
        position: types.array(types.number)
    })

const ConfGL = types
    .model({
        alpha: types.boolean,
        shadow: types.boolean,
        antialias: types.boolean,
    })

const neutronCanvas = types
    .model("neutronCanvas", {
        bgColor: types.optional(types.string, '#000000'),
        confGL: ConfGL,
        confCamera: ConfCamera,
        containerId: types.identifier,
        height: types.number
    })
    .volatile(self => ({
        gl: types.frozen({}),
        scene: types.frozen({}),
        camera: types.frozen({}),
        container: types.frozen({}),
        _init: false,
        _height: types.number,
    }))
    .actions(self => ({
        setHeight(value){
            self.height = value
        },
        afterCreate() {
            self._height = self['height']
            const {confGL, confCamera: {fov, far, near, position}, containerId, bgColor, height} = self
            self.container = document.querySelector(containerId)
            self.container.style.backgroundColor = bgColor
            self.container.style.height = height + 'px'
            self.container.action = new Controller({
                height: height,
                onChange: ({value: {height}}) => {
                    self.container.style.height = height + 'px'
                },
                onStart: (event) => console.log('start', event),
                onProps: ({to:{height}}) => {
                    self.setHeight(height)
                    console.log(height)
                    // self.height = window.innerHeight
                    window.dispatchEvent(new Event('resize'))
                }
            })
            console.log(self.container)
            self.gl = new WebGLRenderer({...confGL})
            self.scene = new Scene()

            const camera = new PerspectiveCamera(fov, window.innerHeight / window.innerWidth, near, far)
            camera.position.set(...position)
            camera.position['action'] = new Controller({
                ...camera.position,
                onChange: ({value: {x, y, z}}) => {
                    camera.position.set(x, y, z)
                    camera.updateMatrixWorld()
                }
            })
            camera.rotation['action'] = new Controller({
                ...camera.rotation,
                onChange: ({value: {x, y, z}}) => {
                    camera.rotation.set(x, y, z)
                    camera.updateMatrixWorld()
                }
            })
            self.camera = camera
        },
        render(jsx) {
            if (!self._init) {
                const root = createRoot(self.container)
                self._init = true
                window.addEventListener('resize', () => {
                    root.configure({
                        events,
                        scene: self.scene,
                        camera: self.camera,
                        size: {width: window.innerWidth, height: self.height},
                        gl: (canvas) => {
                            canvas.appendChild(self.gl.domElement)
                            return self.gl
                        }
                    })
                })
                window.dispatchEvent(new Event('resize'))
                root.render(jsx)
            }
        }
    }))

export default neutronCanvas
