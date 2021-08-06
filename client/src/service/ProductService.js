export const getItems = async (uri, category) => {
    if (!category) {
    const res = await fetch(`http://localhost:5000/${uri}`);
        const data = await res.json();
        return data;
    }else{
        const res = await fetch(`http://localhost:5000/items/category?category=${category}`);
        const data = await res.json();
        return data; 
    }
}

export const getItem = async (uri,email) => {
    const res = await fetch(`http://localhost:5000/${uri}?email=${email}`);
    const data = await res.json();
    return data;
}

export const getById = async (uri, email) => {
    const res = await fetch(`http://localhost:5000/${uri}?email=${email}`);
    const data = await res.json();
    if (data.length === 0) return false;
    return true;
}

export const addToDb = async (uri, item) => {
    await fetch(`http://localhost:5000/${uri}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};

export const updateItem = async (uri, item, id) => {
    await fetch(`http://localhost:5000/${uri}?id=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });
};

export const deleteItem = async (uri,id) => {
    await fetch(`http://localhost:5000/${uri}?id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: null
    });
}

export const sendEmail = async (uri,body)=>{
    await fetch(`http://localhost:5000/${uri}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(body)
    });
}