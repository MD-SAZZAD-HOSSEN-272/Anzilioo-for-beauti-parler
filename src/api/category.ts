export const getCategories = async () => {

    const res = await fetch("http://localhost:5000/api/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}

export const getCategoryBySlug = async (slug: string) => {

    const res = await fetch(`http://localhost:5000/api/categories/${slug}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return res.json();
}