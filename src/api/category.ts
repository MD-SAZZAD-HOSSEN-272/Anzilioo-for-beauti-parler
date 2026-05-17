import axiosSecure from "@/lib/axios/axiosSecure";

const api = axiosSecure()

export const getCategories = async () => {

    const res = await api.get('/api/categories');
    return res.data;
}

export const getCategoryBySlug = async (slug: string) => {

    const res = await api.get(`api/categories/${slug}`)
    return res.data;
}