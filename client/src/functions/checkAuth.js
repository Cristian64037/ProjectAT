export const checkAuth = async () => {
    const response = await fetch("http://localhost:3306/api/isAuth", {
        method: 'Get',
        headers: {
            'content-type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }
    });

    if (response) {
        console.log("============AUTHENTICATING==============");
        return await response.json();
    }
}