import axiosSecure from "@/lib/axios/axiosSecure";

const api = axiosSecure()

export const getProducts = async () => {

    const res = await api.get("/api/products");
    return res.data;
}

export const getProductById = async (id: string) => {

    const res = await api.get(`/api/products/${id}`);
    return res.data;
}

export const searchProducts = async (query: string) => {

    const res = await api.get(`/api/products?q=${query}`);
    
    return res.data;
}

export const getProductsByCategory = async (categorySlug: string) => {

    const res = await api.get(`/api/products?category=${categorySlug}`);
    return res.data;
}

