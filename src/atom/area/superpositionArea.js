import confusion from "../../shared/middleware/confusion"

const superpositionArea = everything => confusion(everything, [
    {
        particle: 'atomArea',
        action: 'init',
        after: ({particle}) => {
            console.log(particle)
        }
    }
])
export default superpositionArea