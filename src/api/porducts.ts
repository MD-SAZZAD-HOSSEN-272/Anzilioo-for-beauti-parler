
export const getProducts = async () => {

    const res = await fetch("http://localhost:5000/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const getProductById = async (id: string) => {

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const searchProducts = async (query: string) => {

    console.log(query)

    const res = await fetch(`http://localhost:5000/api/products?q=${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    return res.json();
}

export const getProductsByCategory = async (categorySlug: string) => {

    console.log(categorySlug)

    const res = await fetch(`http://localhost:5000/api/products?category=${categorySlug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

