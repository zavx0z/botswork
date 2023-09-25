const validate = async (response: Response) => {
    const data = await response.json()
    return response.ok ? data : Promise.reject({code: response.status, error: JSON.stringify(data.detail)})
}
type Payload = {
    payload: string
}
export const service = ({payload}: Payload) =>
    fetch('/address', {
        method: "GET",
        headers: {'Authorization': `Bearer ${payload}`}
    }).then(validate)
