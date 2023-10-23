export const saveData = async (content: string) => {
  const response = await fetch("/playground", {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response
}