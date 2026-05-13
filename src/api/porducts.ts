

export const getProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}